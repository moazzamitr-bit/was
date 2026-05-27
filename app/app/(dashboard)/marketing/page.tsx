import { createClient } from '@/lib/supabase/server'
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { Plus, Megaphone, Target, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default async function MarketingPage() {
  const supabase = await createClient()

  const { data: campaigns, count } = await supabase
    .from('campaigns')
    .select('*,users!created_by(full_name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(20)

  const typeLabel: Record<string, string> = {
    sms: 'پیامک', whatsapp: 'واتساپ', email: 'ایمیل',
    digital: 'دیجیتال', exhibition: 'نمایشگاه', other: 'سایر',
  }
  const statusVariant: Record<string, any> = {
    draft: 'default', active: 'success', paused: 'warning', completed: 'info',
  }
  const statusLabel: Record<string, string> = {
    draft: 'پیش‌نویس', active: 'فعال', paused: 'متوقف', completed: 'پایان یافته',
  }

  const totalLeads = campaigns?.reduce((s, c) => s + (c.stats?.leads ?? 0), 0) ?? 0
  const totalOrders = campaigns?.reduce((s, c) => s + (c.stats?.orders ?? 0), 0) ?? 0

  return (
    <div>
      <Topbar title="مارکتینگ" subtitle="کمپین‌ها و تحلیل کانال‌ها" />
      <div className="p-6 space-y-4">

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'کمپین‌های فعال', value: campaigns?.filter(c => c.status === 'active').length ?? 0, icon: Megaphone, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'لیدهای ایجاد شده', value: totalLeads, icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'سفارش‌های منتسب', value: totalOrders, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(s => {
            const Icon = s.icon
            return (
              <Card key={s.label}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">{s.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-0.5">{s.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="flex justify-end">
          <Link href="/marketing/campaigns/new">
            <Button size="sm"><Plus className="w-3.5 h-3.5" />کمپین جدید</Button>
          </Link>
        </div>

        <Card>
          <CardHeader><CardTitle>کمپین‌ها</CardTitle></CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-right">
                  {['نام','نوع','وضعیت','بودجه','لید','سفارش','شروع','پایان',''].map(h => (
                    <th key={h} className="px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {campaigns?.length === 0 ? (
                  <tr><td colSpan={9} className="px-5 py-12 text-center text-gray-400">هنوز کمپینی ثبت نشده</td></tr>
                ) : campaigns?.map((c: any) => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                    <td className="px-4 py-3"><Badge variant="outline">{typeLabel[c.type]}</Badge></td>
                    <td className="px-4 py-3"><Badge variant={statusVariant[c.status]}>{statusLabel[c.status]}</Badge></td>
                    <td className="px-4 py-3 text-xs text-gray-600">{c.budget ? `${c.budget.toLocaleString('fa-IR')} ت` : '—'}</td>
                    <td className="px-4 py-3 text-center"><Badge variant="info">{c.stats?.leads ?? 0}</Badge></td>
                    <td className="px-4 py-3 text-center"><Badge variant="success">{c.stats?.orders ?? 0}</Badge></td>
                    <td className="px-4 py-3 text-xs text-gray-500">{c.start_date ? formatDate(c.start_date) : '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{c.end_date ? formatDate(c.end_date) : '—'}</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">ویرایش</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
