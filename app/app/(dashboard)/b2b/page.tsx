import { createClient } from '@/lib/supabase/server'
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Plus, Building2 } from 'lucide-react'
import Link from 'next/link'

export default async function B2BPage() {
  const supabase = await createClient()
  const [customersRes, contractsRes] = await Promise.all([
    supabase.from('customers').select('*').eq('type', 'b2b').eq('is_active', true).order('ai_score', { ascending: false }),
    supabase.from('b2b_contracts').select('*,customers(full_name,company_name)').order('created_at', { ascending: false }),
  ])

  return (
    <div>
      <Topbar title="فروش B2B" subtitle="مشتریان سازمانی و قراردادها" />
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2"><Building2 className="w-4 h-4" />مشتریان سازمانی</CardTitle>
                <Link href="/customers/new"><Button variant="outline" size="sm"><Plus className="w-3.5 h-3.5" /></Button></Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {customersRes.data?.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-8">مشتری B2B ثبت نشده</p>
              ) : customersRes.data?.map((c: any) => (
                <Link key={c.id} href={`/customers/${c.id}`}>
                  <div className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{c.full_name}</p>
                      {c.company_name && <p className="text-xs text-gray-500">{c.company_name}</p>}
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-red-500 font-medium">{formatCurrency(c.manteq_balance)}</p>
                      <p className="text-xs text-gray-400">بدهی</p>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>قراردادها</CardTitle></CardHeader>
            <CardContent className="p-0">
              {contractsRes.data?.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-8">قراردادی ثبت نشده</p>
              ) : contractsRes.data?.map((c: any) => (
                <div key={c.id} className="p-4 border-b border-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{c.customers?.full_name}</p>
                    <Badge variant={c.status === 'active' ? 'success' : 'default'}>
                      {c.status === 'active' ? 'فعال' : 'غیرفعال'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{c.title}</span>
                    <span>{c.end_date ? formatDate(c.end_date) : '—'}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">سقف اعتبار: {formatCurrency(c.credit_limit)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
