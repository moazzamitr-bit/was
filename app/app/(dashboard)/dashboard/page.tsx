import { createClient } from '@/lib/supabase/server'
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate, getLeadStageName, getOrderStatusName } from '@/lib/utils'
import {
  TrendingUp, Users, Target, ShoppingCart,
  Package, AlertTriangle, Clock, CheckCircle
} from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()

  const [statsRes, recentOrdersRes, openLeadsRes, lowStockRes, followUpsRes] = await Promise.all([
    supabase.from('dashboard_stats').select('*').single(),
    supabase.from('orders')
      .select('id,order_number,final_amount,status,payment_status,created_at,customers(full_name)')
      .order('created_at', { ascending: false })
      .limit(8),
    supabase.from('leads')
      .select('id,full_name,phone,stage,ai_score,estimated_value,created_at,users(full_name)')
      .not('stage', 'in', '("won","lost")')
      .order('ai_score', { ascending: false })
      .limit(8),
    supabase.from('inventory')
      .select('qty_physical,qty_reserved,reorder_point:products(reorder_point),products(name,sku)')
      .lt('qty_physical', 10)
      .limit(5),
    supabase.from('follow_ups')
      .select('id,related_type,type,scheduled_at,notes,users(full_name)')
      .eq('status', 'pending')
      .lte('scheduled_at', new Date(Date.now() + 86400000).toISOString())
      .order('scheduled_at')
      .limit(5),
  ])

  const stats = statsRes.data
  const recentOrders = recentOrdersRes.data ?? []
  const openLeads = openLeadsRes.data ?? []
  const followUps = followUpsRes.data ?? []

  const kpis = [
    {
      label: 'فروش ۳۰ روز',
      value: formatCurrency(stats?.revenue_30d ?? 0),
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'سفارش‌های ماه',
      value: stats?.orders_30d ?? 0,
      icon: ShoppingCart,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'لیدهای باز',
      value: stats?.open_leads ?? 0,
      icon: Target,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'مشتریان فعال',
      value: stats?.total_customers ?? 0,
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ]

  const orderStatusColor: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
    draft: 'default',
    confirmed: 'info',
    in_procurement: 'warning',
    ready: 'info',
    shipped: 'warning',
    delivered: 'success',
    cancelled: 'danger',
  }

  const stageColor: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
    new: 'default',
    contacted: 'info',
    interested: 'info',
    quoted: 'warning',
    negotiating: 'warning',
    won: 'success',
    lost: 'danger',
  }

  return (
    <div>
      <Topbar title="داشبورد مدیریتی" subtitle="نمای کلی عملکرد مجموعه وس" />
      <div className="p-6 space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon
            return (
              <Card key={kpi.label}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
                      <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${kpi.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Recent Orders */}
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>سفارش‌های اخیر</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-right">
                      <th className="px-5 py-3 text-xs font-medium text-gray-500">شماره</th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-500">مشتری</th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-500">مبلغ</th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-500">وضعیت</th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-500">تاریخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-8 text-center text-gray-400 text-sm">
                          هنوز سفارشی ثبت نشده
                        </td>
                      </tr>
                    ) : recentOrders.map((o: any) => (
                      <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 font-mono text-xs text-gray-600">{o.order_number}</td>
                        <td className="px-4 py-3 text-gray-900">{o.customers?.full_name}</td>
                        <td className="px-4 py-3 text-gray-900">{formatCurrency(o.final_amount)}</td>
                        <td className="px-4 py-3">
                          <Badge variant={orderStatusColor[o.status] ?? 'default'}>
                            {getOrderStatusName(o.status)}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">{formatDate(o.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar widgets */}
          <div className="space-y-4">
            {/* Follow-ups */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  پیگیری‌های امروز
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                {followUps.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">پیگیری‌ای در صف نیست</p>
                ) : followUps.map((f: any) => (
                  <div key={f.id} className="flex items-start gap-2 mb-3">
                    <CheckCircle className="w-3.5 h-3.5 mt-0.5 text-gray-300 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-700">{f.notes ?? 'پیگیری برنامه‌ریزی شده'}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(f.scheduled_at).toLocaleString('fa-IR')}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Low stock alert */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  هشدار موجودی
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                {lowStockRes.data?.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">همه کالاها موجود هستند</p>
                ) : lowStockRes.data?.map((item: any) => (
                  <div key={item.products?.sku} className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-700 truncate">{item.products?.name}</span>
                    <Badge variant="danger">{item.qty_physical}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Open Leads */}
        <Card>
          <CardHeader>
            <CardTitle>لیدهای باز — اولویت‌بندی شده توسط AI</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-right">
                  <th className="px-5 py-3 text-xs font-medium text-gray-500">نام</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500">تلفن</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500">مرحله</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500">امتیاز AI</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500">ارزش تخمینی</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500">کارشناس</th>
                </tr>
              </thead>
              <tbody>
                {openLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-gray-400 text-sm">
                      هنوز لیدی وجود ندارد
                    </td>
                  </tr>
                ) : openLeads.map((lead: any) => (
                  <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">{lead.full_name}</td>
                    <td className="px-4 py-3 text-gray-600 font-mono text-xs" dir="ltr">{lead.phone}</td>
                    <td className="px-4 py-3">
                      <Badge variant={stageColor[lead.stage] ?? 'default'}>
                        {getLeadStageName(lead.stage)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{ width: `${lead.ai_score}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{lead.ai_score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-900">
                      {lead.estimated_value ? formatCurrency(lead.estimated_value) : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{lead.users?.full_name ?? '—'}</td>
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
