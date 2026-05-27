import { createClient } from '@/lib/supabase/server'
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function QuotationsPage() {
  const supabase = await createClient()
  const { data: quotes, count } = await supabase
    .from('quotations')
    .select('*,customers(full_name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50)

  const statusVariant: Record<string, any> = { draft: 'default', sent: 'info', accepted: 'success', rejected: 'danger', expired: 'warning' }
  const statusLabel: Record<string, string> = { draft: 'پیش‌نویس', sent: 'ارسال شده', accepted: 'تایید شده', rejected: 'رد شده', expired: 'منقضی' }

  return (
    <div>
      <Topbar title="پیش‌فاکتورها" subtitle={`${count ?? 0} پیش‌فاکتور`} />
      <div className="p-6 space-y-4">
        <div className="flex justify-end">
          <Link href="/quotations/new">
            <Button size="sm"><Plus className="w-3.5 h-3.5" />پیش‌فاکتور جدید</Button>
          </Link>
        </div>
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-right">
                  {['شماره','مشتری','مبلغ','وضعیت','انقضا','تاریخ',''].map(h => (
                    <th key={h} className="px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {quotes?.length === 0 ? (
                  <tr><td colSpan={7} className="px-5 py-12 text-center text-gray-400">هنوز پیش‌فاکتوری ثبت نشده</td></tr>
                ) : quotes?.map((q: any) => (
                  <tr key={q.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-blue-600">{q.quote_number}</td>
                    <td className="px-4 py-3 text-gray-900">{q.customers?.full_name ?? '—'}</td>
                    <td className="px-4 py-3">{formatCurrency(q.final_amount ?? 0)}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant[q.status]}>{statusLabel[q.status]}</Badge></td>
                    <td className="px-4 py-3 text-xs text-gray-500">{q.valid_until ? formatDate(q.valid_until) : '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{formatDate(q.created_at)}</td>
                    <td className="px-4 py-3"><Button variant="ghost" size="sm">مشاهده</Button></td>
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
