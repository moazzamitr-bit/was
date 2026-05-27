import { createClient } from '@/lib/supabase/server'
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { BarChart3, TrendingUp, Users, ShoppingCart } from 'lucide-react'

export default async function ReportsPage() {
  const supabase = await createClient()

  const [ordersRes, leadsRes, customersRes] = await Promise.all([
    supabase.from('orders').select('final_amount,status,created_at,payment_status').neq('status', 'cancelled'),
    supabase.from('leads').select('stage,source,created_at'),
    supabase.from('customers').select('type,grade,created_at').eq('is_active', true),
  ])

  const orders = ordersRes.data ?? []
  const leads = leadsRes.data ?? []
  const customers = customersRes.data ?? []

  const totalRevenue = orders.filter(o => o.payment_status === 'paid').reduce((s, o) => s + o.final_amount, 0)
  const pendingRevenue = orders.filter(o => o.payment_status !== 'paid').reduce((s, o) => s + o.final_amount, 0)
  const wonLeads = leads.filter(l => l.stage === 'won').length
  const conversionRate = leads.length > 0 ? Math.round((wonLeads / leads.length) * 100) : 0

  const bySource = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.source] = (acc[l.source] ?? 0) + 1; return acc
  }, {})

  const sourceNames: Record<string, string> = {
    callcenter: 'کال‌سنتر', website: 'وبسایت', instagram: 'اینستاگرام',
    referral: 'معرفی', exhibition: 'نمایشگاه', whatsapp: 'واتساپ', manual: 'دستی',
  }

  return (
    <div>
      <Topbar title="گزارش‌ها" subtitle="تحلیل عملکرد کسب‌وکار" />
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'درآمد تسویه شده', value: formatCurrency(totalRevenue), icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'درآمد معوق', value: formatCurrency(pendingRevenue), icon: BarChart3, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'نرخ تبدیل لید', value: `${conversionRate}٪`, icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'کل مشتریان', value: customers.length, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(s => {
            const Icon = s.icon
            return (
              <Card key={s.label}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">{s.label}</p>
                    <p className="text-xl font-bold text-gray-900 mt-0.5">{s.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle>لیدها بر اساس منبع</CardTitle></CardHeader>
            <CardContent>
              {Object.entries(bySource).sort((a, b) => b[1] - a[1]).map(([source, count]) => (
                <div key={source} className="flex items-center gap-3 mb-3">
                  <span className="text-sm text-gray-700 w-24">{sourceNames[source] ?? source}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(count / leads.length) * 100}%` }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8 text-left">{count}</span>
                </div>
              ))}
              {leads.length === 0 && <p className="text-center text-sm text-gray-400 py-4">داده‌ای وجود ندارد</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>وضعیت لیدها</CardTitle></CardHeader>
            <CardContent>
              {['new','contacted','interested','quoted','negotiating','won','lost'].map(stage => {
                const count = leads.filter(l => l.stage === stage).length
                const pct = leads.length > 0 ? (count / leads.length) * 100 : 0
                const colors: Record<string, string> = { new: 'bg-gray-400', contacted: 'bg-blue-400', interested: 'bg-indigo-400', quoted: 'bg-amber-400', negotiating: 'bg-orange-400', won: 'bg-emerald-500', lost: 'bg-red-400' }
                const labels: Record<string, string> = { new: 'جدید', contacted: 'تماس', interested: 'علاقه‌مند', quoted: 'پیش‌فاکتور', negotiating: 'مذاکره', won: 'برنده', lost: 'باخته' }
                return (
                  <div key={stage} className="flex items-center gap-3 mb-3">
                    <span className="text-sm text-gray-700 w-24">{labels[stage]}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${colors[stage]} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8 text-left">{count}</span>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
