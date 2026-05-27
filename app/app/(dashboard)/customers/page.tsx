import { createClient } from '@/lib/supabase/server'
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate, getCustomerTypeName } from '@/lib/utils'
import { Plus, Phone, Building2 } from 'lucide-react'
import Link from 'next/link'

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; grade?: string; q?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('customers')
    .select('*,users!account_manager(full_name)', { count: 'exact' })
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(50)

  if (params.type) query = query.eq('type', params.type)
  if (params.grade) query = query.eq('grade', params.grade)

  const { data: customers, count } = await query

  const gradeVariant: Record<string, 'success' | 'info' | 'warning' | 'danger'> = {
    A: 'success', B: 'info', C: 'warning', D: 'danger',
  }

  return (
    <div>
      <Topbar title="مشتریان" subtitle={`${count ?? 0} مشتری فعال`} />
      <div className="p-6 space-y-4">

        {/* Filters + Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {(['', 'owner', 'builder', 'architect', 'contractor', 'b2b', 'retail'] as const).map((t) => (
              <Link
                key={t}
                href={t ? `/customers?type=${t}` : '/customers'}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  (params.type ?? '') === t
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t === '' ? 'همه' : getCustomerTypeName(t)}
              </Link>
            ))}
          </div>
          <Link href="/customers/new">
            <Button size="sm">
              <Plus className="w-3.5 h-3.5" />
              مشتری جدید
            </Button>
          </Link>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-right">
                  <th className="px-5 py-3 text-xs font-medium text-gray-500">نام / شرکت</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500">نوع</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500">درجه</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500">تلفن</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500">شهر</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500">بدهی</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500">حساب‌دار</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {customers?.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-gray-400">
                      هنوز مشتری‌ای ثبت نشده
                    </td>
                  </tr>
                ) : customers?.map((c: any) => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{c.full_name}</p>
                        {c.company_name && (
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3" /> {c.company_name}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{getCustomerTypeName(c.type)}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={gradeVariant[c.grade]}>{c.grade}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      {c.phones?.[0] && (
                        <span className="flex items-center gap-1 text-xs text-gray-600 font-mono" dir="ltr">
                          <Phone className="w-3 h-3" /> {c.phones[0].number}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{c.city ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className={c.manteq_balance > 0 ? 'text-red-600 font-medium' : 'text-gray-600'}>
                        {formatCurrency(c.manteq_balance)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{c.users?.full_name ?? '—'}</td>
                    <td className="px-4 py-3">
                      <Link href={`/customers/${c.id}`}>
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
