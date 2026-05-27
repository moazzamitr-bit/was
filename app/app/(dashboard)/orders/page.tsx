import { createClient } from '@/lib/supabase/server'
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate, getOrderStatusName, getPaymentStatusName } from '@/lib/utils'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('orders')
    .select('*,customers(full_name,company_name),users!assigned_to(full_name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50)

  if (params.status) query = query.eq('status', params.status)

  const { data: orders, count } = await query

  const statusVariant: Record<string, any> = {
    draft: 'default', confirmed: 'info', in_procurement: 'warning',
    ready: 'info', shipped: 'warning', delivered: 'success', cancelled: 'danger',
  }
  const paymentVariant: Record<string, any> = {
    unpaid: 'danger', partial: 'warning', paid: 'success',
  }

  const statuses = ['','draft','confirmed','in_procurement','ready','shipped','delivered','cancelled']
  const statusLabels: Record<string, string> = {
    '': 'همه', draft: 'پیش‌نویس', confirmed: 'تایید شده',
    in_procurement: 'در تامین', ready: 'آماده', shipped: 'ارسال شده',
    delivered: 'تحویل', cancelled: 'لغو'
  }

  return (
    <div>
      <Topbar title="سفارش‌ها" subtitle={`${count ?? 0} سفارش`} />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {statuses.map(s => (
              <Link
                key={s}
                href={s ? `/orders?status=${s}` : '/orders'}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  (params.status ?? '') === s
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {statusLabels[s]}
              </Link>
            ))}
          </div>
          <Link href="/orders/new">
            <Button size="sm"><Plus className="w-3.5 h-3.5" />سفارش جدید</Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-right">
                  {['شماره سفارش','مشتری','مبلغ','وضعیت','پرداخت','کارشناس','تاریخ',''].map(h => (
                    <th key={h} className="px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders?.length === 0 ? (
                  <tr><td colSpan={8} className="px-5 py-12 text-center text-gray-400">هنوز سفارشی ثبت نشده</td></tr>
                ) : orders?.map((o: any) => (
                  <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-blue-600">{o.order_number}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{o.customers?.full_name}</p>
                      {o.customers?.company_name && (
                        <p className="text-xs text-gray-500">{o.customers.company_name}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{formatCurrency(o.final_amount)}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant[o.status]}>{getOrderStatusName(o.status)}</Badge></td>
                    <td className="px-4 py-3"><Badge variant={paymentVariant[o.payment_status]}>{getPaymentStatusName(o.payment_status)}</Badge></td>
                    <td className="px-4 py-3 text-xs text-gray-500">{o.users?.full_name ?? '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{formatDate(o.created_at)}</td>
                    <td className="px-4 py-3">
                      <Link href={`/orders/${o.id}`}>
                        <Button variant="ghost" size="sm">مشاهده</Button>
                      </Link>
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
