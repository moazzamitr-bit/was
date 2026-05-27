import { createClient } from '@/lib/supabase/server'
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDateTime, getLeadStageName } from '@/lib/utils'
import { Phone, Mail, TrendingUp, Clock, Edit } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: lead } = await supabase
    .from('leads')
    .select('*,users!assigned_to(full_name)')
    .eq('id', id)
    .single()

  if (!lead) notFound()

  const { data: followUps } = await supabase
    .from('follow_ups')
    .select('*')
    .eq('related_id', id)
    .order('scheduled_at', { ascending: false })
    .limit(10)

  const { data: recs } = await supabase
    .from('ai_recommendations')
    .select('*')
    .eq('related_id', id)
    .eq('is_dismissed', false)
    .limit(3)

  const stageVariant: Record<string, any> = {
    new: 'default', contacted: 'info', interested: 'info',
    quoted: 'warning', negotiating: 'warning', won: 'success', lost: 'danger',
  }

  return (
    <div>
      <Topbar title={lead.full_name} subtitle="پروفایل لید" />
      <div className="p-6 grid grid-cols-3 gap-4">
        {/* Main Info */}
        <div className="col-span-2 space-y-4">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{lead.full_name}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{lead.source}</p>
                </div>
                <Badge variant={stageVariant[lead.stage]} className="text-sm px-3 py-1">
                  {getLeadStageName(lead.stage)}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span dir="ltr">{lead.phone}</span>
                </div>
                {lead.email && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span dir="ltr">{lead.email}</span>
                  </div>
                )}
                {lead.estimated_value && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-gray-400 text-xs">ارزش تخمینی:</span>
                    <span className="font-medium text-emerald-600">{formatCurrency(lead.estimated_value)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-700">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-gray-500">امتیاز AI:</span>
                  <div className="flex items-center gap-1">
                    <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${lead.ai_score}%` }} />
                    </div>
                    <span className="text-xs font-medium">{lead.ai_score}</span>
                  </div>
                </div>
              </div>
              {lead.notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">{lead.notes}</div>
              )}
            </CardContent>
          </Card>

          {/* Follow-ups */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2"><Clock className="w-4 h-4" />پیگیری‌ها</CardTitle>
                <Button size="sm" variant="outline">+ پیگیری جدید</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {followUps?.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">هنوز پیگیری‌ای ثبت نشده</p>
              ) : followUps?.map(f => (
                <div key={f.id} className="flex items-start gap-3 p-4 border-b border-gray-50 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${f.status === 'done' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{f.notes ?? 'پیگیری برنامه‌ریزی شده'}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDateTime(f.scheduled_at)}</p>
                  </div>
                  <Badge variant={f.status === 'done' ? 'success' : 'warning'}>
                    {f.status === 'done' ? 'انجام شد' : 'در انتظار'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Actions */}
          <Card>
            <CardHeader><CardTitle>عملیات</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" size="sm"><Phone className="w-3.5 h-3.5" />ثبت تماس</Button>
              <Button className="w-full" size="sm" variant="outline">ارسال پیش‌فاکتور</Button>
              <Button className="w-full" size="sm" variant="outline">تبدیل به مشتری</Button>
              {lead.stage !== 'lost' && (
                <Button className="w-full" size="sm" variant="destructive">علامت‌گذاری باخته</Button>
              )}
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          {recs && recs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-blue-500">✦</span> پیشنهاد AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recs.map(r => (
                  <div key={r.id} className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-800">{r.content}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="w-12 h-1 bg-blue-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Number(r.confidence) * 100}%` }} />
                      </div>
                      <span className="text-xs text-blue-600">{Math.round(Number(r.confidence) * 100)}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Meta */}
          <Card>
            <CardContent className="p-4 space-y-2 text-xs text-gray-500">
              <div className="flex justify-between"><span>کارشناس:</span><span>{lead.users?.full_name ?? '—'}</span></div>
              <div className="flex justify-between"><span>ایجاد:</span><span>{formatDateTime(lead.created_at)}</span></div>
              {lead.next_follow_up && <div className="flex justify-between"><span>پیگیری بعدی:</span><span>{formatDateTime(lead.next_follow_up)}</span></div>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
