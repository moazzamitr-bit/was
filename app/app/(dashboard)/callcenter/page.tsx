import { createClient } from '@/lib/supabase/server'
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDateTime } from '@/lib/utils'
import { Phone, PhoneIncoming, PhoneOutgoing, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function CallcenterPage() {
  const supabase = await createClient()

  const { data: calls, count } = await supabase
    .from('call_logs')
    .select('*,customers(full_name),users!operator_id(full_name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50)

  const stats = {
    total: count ?? 0,
    answered: calls?.filter(c => c.status === 'answered').length ?? 0,
    inbound: calls?.filter(c => c.direction === 'inbound').length ?? 0,
  }

  const statusVariant: Record<string, any> = {
    answered: 'success', no_answer: 'warning', busy: 'danger', voicemail: 'info',
  }
  const statusLabel: Record<string, string> = {
    answered: 'پاسخ داده شد', no_answer: 'پاسخ نداد', busy: 'مشغول', voicemail: 'پیام صوتی',
  }
  const typeLabel: Record<string, string> = {
    inquiry: 'استعلام', follow_up: 'پیگیری', complaint: 'شکایت', info: 'اطلاعات', purchase: 'خرید',
  }

  return (
    <div>
      <Topbar title="کال‌سنتر" subtitle="مدیریت تماس‌های ورودی و خروجی" />
      <div className="p-6 space-y-4">

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'تماس‌های امروز', value: stats.total, icon: Phone },
            { label: 'پاسخ داده شده', value: stats.answered, icon: PhoneIncoming },
            { label: 'ورودی', value: stats.inbound, icon: PhoneIncoming },
            { label: 'خروجی', value: stats.total - stats.inbound, icon: PhoneOutgoing },
          ].map(s => {
            const Icon = s.icon
            return (
              <Card key={s.label}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">{s.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-0.5">{s.value}</p>
                  </div>
                  <Icon className="w-8 h-8 text-gray-300" />
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="flex justify-end">
          <Link href="/callcenter/new">
            <Button size="sm"><Plus className="w-3.5 h-3.5" />ثبت تماس جدید</Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-right">
                  {['مشتری','شماره','نوع','جهت','مدت','وضعیت','اپراتور','زمان',''].map(h => (
                    <th key={h} className="px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calls?.length === 0 ? (
                  <tr><td colSpan={9} className="px-5 py-12 text-center text-gray-400">هنوز تماسی ثبت نشده</td></tr>
                ) : calls?.map((c: any) => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{c.customers?.full_name ?? '—'}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600" dir="ltr">{c.phone_number}</td>
                    <td className="px-4 py-3 text-xs">{typeLabel[c.call_type] ?? c.call_type}</td>
                    <td className="px-4 py-3">
                      <Badge variant={c.direction === 'inbound' ? 'info' : 'default'}>
                        {c.direction === 'inbound' ? 'ورودی' : 'خروجی'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{c.duration_sec}s</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[c.status]}>{statusLabel[c.status]}</Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{c.users?.full_name ?? '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{formatDateTime(c.created_at)}</td>
                    <td className="px-4 py-3">
                      {!c.customer_id && (
                        <Link href={`/leads/new?phone=${c.phone_number}`}>
                          <Button variant="outline" size="sm">ثبت لید</Button>
                        </Link>
                      )}
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
