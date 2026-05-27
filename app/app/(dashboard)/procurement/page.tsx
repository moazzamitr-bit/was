import { createClient } from '@/lib/supabase/server'
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Plus, Truck } from 'lucide-react'
import Link from 'next/link'

export default async function ProcurementPage() {
  const supabase = await createClient()

  const [requestsRes, posRes, suppliersRes] = await Promise.all([
    supabase.from('purchase_requests')
      .select('*,products(name,sku),users!created_by(full_name)')
      .order('created_at', { ascending: false }).limit(20),
    supabase.from('purchase_orders')
      .select('*,suppliers(name),users!created_by(full_name)')
      .order('created_at', { ascending: false }).limit(20),
    supabase.from('suppliers').select('id,name,score,lead_time_days').eq('is_active', true).limit(10),
  ])

  const poStatusLabel: Record<string, string> = {
    draft: 'پیش‌نویس', sent: 'ارسال شده', confirmed: 'تایید شده',
    in_transit: 'در راه', received: 'دریافت شده', cancelled: 'لغو',
  }
  const poStatusVariant: Record<string, any> = {
    draft: 'default', sent: 'info', confirmed: 'success',
    in_transit: 'warning', received: 'success', cancelled: 'danger',
  }

  return (
    <div>
      <Topbar title="مدیریت تامین" subtitle="درخواست‌ها و سفارش‌های خرید" />
      <div className="p-6 space-y-4">

        <div className="grid grid-cols-2 gap-4">

          {/* Purchase Requests */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>درخواست‌های تامین</CardTitle>
                <Link href="/procurement/requests/new">
                  <Button size="sm"><Plus className="w-3.5 h-3.5" />درخواست</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-right">
                    {['محصول','تعداد','اولویت','وضعیت'].map(h => (
                      <th key={h} className="px-4 py-2 text-xs font-medium text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {requestsRes.data?.length === 0 ? (
                    <tr><td colSpan={4} className="px-4 py-8 text-center text-xs text-gray-400">درخواستی وجود ندارد</td></tr>
                  ) : requestsRes.data?.map((r: any) => (
                    <tr key={r.id} className="border-b border-gray-50">
                      <td className="px-4 py-2 text-gray-900">{r.products?.name ?? r.product_name}</td>
                      <td className="px-4 py-2 text-gray-600">{r.qty_requested}</td>
                      <td className="px-4 py-2">
                        <Badge variant={r.priority === 'urgent' ? 'danger' : r.priority === 'high' ? 'warning' : 'default'}>
                          {r.priority === 'urgent' ? 'فوری' : r.priority === 'high' ? 'بالا' : 'عادی'}
                        </Badge>
                      </td>
                      <td className="px-4 py-2">
                        <Badge variant={r.status === 'approved' ? 'success' : r.status === 'rejected' ? 'danger' : 'warning'}>
                          {r.status === 'pending' ? 'در انتظار' : r.status === 'approved' ? 'تایید' : 'رد'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Suppliers */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>تامین‌کنندگان</CardTitle>
                <Link href="/procurement/suppliers/new">
                  <Button variant="outline" size="sm"><Plus className="w-3.5 h-3.5" /></Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-right">
                    {['نام','امتیاز','زمان تامین'].map(h => (
                      <th key={h} className="px-4 py-2 text-xs font-medium text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {suppliersRes.data?.map((s: any) => (
                    <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium text-gray-900">{s.name}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${s.score}%` }} />
                          </div>
                          <span className="text-xs text-gray-500">{s.score}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-500">{s.lead_time_days} روز</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Purchase Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                سفارش‌های خرید
              </CardTitle>
              <Link href="/procurement/orders/new">
                <Button size="sm"><Plus className="w-3.5 h-3.5" />PO جدید</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-right">
                  {['شماره PO','تامین‌کننده','مبلغ','تاریخ تحویل','وضعیت',''].map(h => (
                    <th key={h} className="px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posRes.data?.length === 0 ? (
                  <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-400">هنوز سفارش خریدی ثبت نشده</td></tr>
                ) : posRes.data?.map((po: any) => (
                  <tr key={po.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-blue-600">{po.po_number}</td>
                    <td className="px-4 py-3 text-gray-900">{po.suppliers?.name}</td>
                    <td className="px-4 py-3">{formatCurrency(po.total_amount)}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{po.expected_date ? formatDate(po.expected_date) : '—'}</td>
                    <td className="px-4 py-3">
                      <Badge variant={poStatusVariant[po.status] ?? 'default'}>
                        {poStatusLabel[po.status] ?? po.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">مشاهده</Button>
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
