import { createClient } from '@/lib/supabase/server'
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate, getCustomerTypeName, getOrderStatusName } from '@/lib/utils'
import { Phone, Mail, Building2, ShoppingCart, TrendingUp } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [customerRes, ordersRes, notesRes] = await Promise.all([
    supabase.from('customers').select('*,users!account_manager(full_name)').eq('id', id).single(),
    supabase.from('orders').select('*').eq('customer_id', id).order('created_at', { ascending: false }).limit(10),
    supabase.from('notes').select('*').eq('related_id', id).order('created_at', { ascending: false }).limit(5),
  ])

  if (!customerRes.data) notFound()
  const c = customerRes.data as any
  const orders = ordersRes.data ?? []

  const gradeVariant: Record<string, any> = { A: 'success', B: 'info', C: 'warning', D: 'danger' }
  const totalBuy = orders.reduce((s: number, o: any) => s + o.final_amount, 0)

  return (
    <div>
      <Topbar title={c.full_name} subtitle="پروفایل مشتری" />
      <div className="p-6 grid grid-cols-3 gap-4">
        {/* Main */}
        <div className="col-span-2 space-y-4">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{c.full_name}</h2>
                  {c.company_name && <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5"><Building2 className="w-3.5 h-3.5" />{c.company_name}</p>}
                </div>
                <div className="flex gap-2">
                  <Badge variant={gradeVariant[c.grade]}>درجه {c.grade}</Badge>
                  <Badge variant="outline">{getCustomerTypeName(c.type)}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {c.phones?.[0] && <div className="flex items-center gap-2 text-gray-700"><Phone className="w-4 h-4 text-gray-400" /><span dir="ltr">{c.phones[0].number}</span></div>}
                {c.email && <div className="flex items-center gap-2 text-gray-700"><Mail className="w-4 h-4 text-gray-400" /><span dir="ltr">{c.email}</span></div>}
                {c.city && <div className="flex items-center gap-2 text-gray-500"><span className="text-xs">شهر:</span><span>{c.city}</span></div>}
                <div className="flex items-center gap-2 text-gray-500"><span className="text-xs">منبع:</span><span>{c.source ?? '—'}</span></div>
              </div>
            </CardContent>
          </Card>

          {/* Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2"><ShoppingCart className="w-4 h-4" />سفارش‌ها</CardTitle>
                <span className="text-xs text-gray-500">جمع خرید: <strong className="text-gray-900">{formatCurrency(totalBuy)}</strong></span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {orders.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">هنوز سفارشی ثبت نشده</p>
              ) : orders.map((o: any) => (
                <div key={o.id} className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-mono text-blue-600">{o.order_number}</p>
                    <p className="text-xs text-gray-500">{formatDate(o.created_at)}</p>
                  </div>
                  <div className="text-center">
                    <Badge variant={o.status === 'delivered' ? 'success' : o.status === 'cancelled' ? 'danger' : 'warning'}>
                      {getOrderStatusName(o.status)}
                    </Badge>
                  </div>
                  <span className="font-medium text-gray-900">{formatCurrency(o.final_amount)}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notes */}
          {notesRes.data && notesRes.data.length > 0 && (
            <Card>
              <CardHeader><CardTitle>یادداشت‌ها</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {notesRes.data.map((n: any) => (
                  <div key={n.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-800">{n.content}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(n.created_at)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>وضعیت مالی</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">بدهی جاری:</span>
                <span className={`font-bold ${c.manteq_balance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {formatCurrency(c.manteq_balance)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">سقف اعتبار:</span>
                <span className="font-medium text-gray-900">{formatCurrency(c.credit_limit)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${c.manteq_balance > c.credit_limit ? 'bg-red-500' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.min(100, c.credit_limit > 0 ? (c.manteq_balance / c.credit_limit) * 100 : 0)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>امتیاز AI:</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-blue-400" />
                  <span className="font-medium text-blue-600">{c.ai_score}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>عملیات</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" size="sm">سفارش جدید</Button>
              <Button className="w-full" size="sm" variant="outline">ثبت یادداشت</Button>
              <Button className="w-full" size="sm" variant="outline">پیگیری جدید</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-2 text-xs text-gray-500">
              <div className="flex justify-between"><span>کارشناس:</span><span>{c.users?.full_name ?? '—'}</span></div>
              <div className="flex justify-between"><span>عضویت:</span><span>{formatDate(c.created_at)}</span></div>
              <div className="flex justify-between"><span>کد مشتری:</span><span className="font-mono">{c.code ?? '—'}</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
