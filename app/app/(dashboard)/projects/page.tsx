import { createClient } from '@/lib/supabase/server'
export const revalidate = 30
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate, formatCurrency } from '@/lib/utils'
import { Plus, Building2 } from 'lucide-react'
import Link from 'next/link'

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: projects, count } = await supabase
    .from('projects')
    .select('*,customers!owner_id(full_name),users!assigned_to(full_name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50)

  const typeLabel: Record<string, string> = {
    residential: 'مسکونی', commercial: 'تجاری', industrial: 'صنعتی', office: 'اداری',
  }
  const statusVariant: Record<string, any> = {
    planning: 'default', active: 'success', paused: 'warning', completed: 'info',
  }
  const statusLabel: Record<string, string> = {
    planning: 'برنامه‌ریزی', active: 'فعال', paused: 'متوقف', completed: 'تکمیل شده',
  }

  return (
    <div>
      <Topbar title="پروژه‌های ساختمانی" subtitle={`${count ?? 0} پروژه ثبت شده`} />
      <div className="p-6 space-y-4">
        <div className="flex justify-end">
          <Link href="/projects/new">
            <Button size="sm"><Plus className="w-3.5 h-3.5" />پروژه جدید</Button>
          </Link>
        </div>
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-right">
                  {['نام پروژه','نوع','مالک','مرحله','بودجه','وضعیت','کارشناس','تاریخ شروع',''].map(h => (
                    <th key={h} className="px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects?.length === 0 ? (
                  <tr><td colSpan={9} className="px-5 py-12 text-center text-gray-400">هنوز پروژه‌ای ثبت نشده</td></tr>
                ) : projects?.map((p: any) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{p.name}</span>
                      </div>
                      {p.city && <p className="text-xs text-gray-500 mr-6">{p.city}</p>}
                    </td>
                    <td className="px-4 py-3"><Badge variant="outline">{typeLabel[p.type]}</Badge></td>
                    <td className="px-4 py-3 text-gray-900">{p.customers?.full_name ?? '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{p.current_phase ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-900">{p.estimated_budget ? formatCurrency(p.estimated_budget) : '—'}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant[p.status]}>{statusLabel[p.status]}</Badge></td>
                    <td className="px-4 py-3 text-xs text-gray-500">{p.users?.full_name ?? '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{p.start_date ? formatDate(p.start_date) : '—'}</td>
                    <td className="px-4 py-3">
                      <Link href={`/projects/${p.id}`}>
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
