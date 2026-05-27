import { createClient } from '@/lib/supabase/server'
export const revalidate = 30
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import { DollarSign, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

export default async function FinancePage() {
  const supabase = await createClient()

  const [unpaidOrdersRes, recentPaymentsRes, topDebtorsRes] = await Promise.all([
    supabase.from('orders')
      .select('id,order_number,final_amount,created_at,customers(full_name)')
      .eq('payment_status', 'unpaid')
      .neq('status', 'cancelled')
      .order('final_amount', { ascending: false })
      .limit(20),
    supabase.from('payments')
      .select('*,customers(full_name),orders(order_number)')
      .order('created_at', { ascending: false })
      .limit(15),
    supabase.from('customers')
      .select('id,full_name,company_name,manteq_balance')
      .gt('manteq_balance', 0)
      .order('manteq_balance', { ascending: false })
      .limit(10),
  ])

  const totalUnpaid = unpaidOrdersRes.data?.reduce((s, o) => s + o.final_amount, 0) ?? 0

  return (
    <div>
      <Topbar title="مالی" subtitle="وضعیت پرداخت‌ها و مانده حساب‌ها" />
      <div className="p-6 space-y-4">

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">پرداخت نشده</p>
                <p className="text-xl font-bold text-red-600 mt-0.5">{formatCurrency(totalUnpaid)}</p>
                <p className="text-xs text-gray-400 mt-0.5">{unpaidOrdersRes.data?.length ?? 0} سفارش</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-200" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">بدهی مشتریان</p>
                <p className="text-xl font-bold text-amber-600 mt-0.5">
                  {formatCurrency(topDebtorsRes.data?.reduce((s, c) => s + (c.manteq_balance ?? 0), 0) ?? 0)}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">از سیستم منطق</p>
              </div>
              <DollarSign className="w-8 h-8 text-amber-200" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">تعداد پرداخت‌های اخیر</p>
                <p className="text-xl font-bold text-emerald-600 mt-0.5">{recentPaymentsRes.data?.length ?? 0}</p>
                <p className="text-xs text-gray-400 mt-0.5">آخرین ۱۵ پرداخت</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-200" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Unpaid Orders */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="w-4 h-4 text-red-500" />سفارش‌های پرداخت نشده</CardTitle></CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-right">
                    {['سفارش','مشتری','مبلغ','تاریخ'].map(h => (
                      <th key={h} className="px-4 py-2 text-xs font-medium text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {unpaidOrdersRes.data?.map((o: any) => (
                    <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-2 font-mono text-xs text-blue-600">{o.order_number}</td>
                      <td className="px-4 py-2 text-gray-900">{o.customers?.full_name}</td>
                      <td className="px-4 py-2 font-medium text-red-600">{formatCurrency(o.final_amount)}</td>
                      <td className="px-4 py-2 text-xs text-gray-500">{formatDate(o.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Top Debtors */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" />مشتریان با بدهی بالا</CardTitle></CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-right">
                    {['مشتری','مانده بدهی'].map(h => (
                      <th key={h} className="px-4 py-2 text-xs font-medium text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topDebtorsRes.data?.length === 0 ? (
                    <tr><td colSpan={2} className="px-4 py-6 text-center text-xs text-gray-400">بدهی‌ای ثبت نشده (sync با منطق نشده)</td></tr>
                  ) : topDebtorsRes.data?.map((c: any) => (
                    <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <p className="text-gray-900 font-medium">{c.full_name}</p>
                        {c.company_name && <p className="text-xs text-gray-500">{c.company_name}</p>}
                      </td>
                      <td className="px-4 py-2 font-bold text-red-600">{formatCurrency(c.manteq_balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Integration Status */}
        <Card>
          <CardHeader><CardTitle>وضعیت Integration با سیستم منطق</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <p className="text-sm text-amber-700">
                آماده اتصال — endpoint‌های API سیستم منطق را در تنظیمات وارد کنید تا sync بدهی و فاکتور فعال شود.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
