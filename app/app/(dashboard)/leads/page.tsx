import { createClient } from '@/lib/supabase/server'
import { Topbar } from '@/components/layout/topbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, getLeadStageName } from '@/lib/utils'
import { Plus, Phone, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const STAGES = [
  { key: 'new',        label: 'جدید',         color: 'bg-gray-100 text-gray-700',    header: 'bg-gray-200' },
  { key: 'contacted',  label: 'تماس اولیه',   color: 'bg-blue-100 text-blue-700',   header: 'bg-blue-200' },
  { key: 'interested', label: 'علاقه‌مند',     color: 'bg-indigo-100 text-indigo-700', header: 'bg-indigo-200' },
  { key: 'quoted',     label: 'پیش‌فاکتور',   color: 'bg-amber-100 text-amber-700', header: 'bg-amber-200' },
  { key: 'negotiating',label: 'مذاکره',        color: 'bg-orange-100 text-orange-700', header: 'bg-orange-200' },
  { key: 'won',        label: 'برنده',         color: 'bg-emerald-100 text-emerald-700', header: 'bg-emerald-200' },
]

export default async function LeadsPage() {
  const supabase = await createClient()

  const { data: leads } = await supabase
    .from('leads')
    .select('*,users!assigned_to(full_name)')
    .order('ai_score', { ascending: false })
    .limit(200)

  const byStage = STAGES.reduce<Record<string, any[]>>((acc, s) => {
    acc[s.key] = (leads ?? []).filter(l => l.stage === s.key)
    return acc
  }, {})

  return (
    <div>
      <Topbar title="مدیریت لیدها" subtitle="قیف فروش — نمای Kanban" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4 text-sm text-gray-600">
            <span>کل لیدهای باز: <strong>{leads?.filter(l => !['won','lost'].includes(l.stage)).length ?? 0}</strong></span>
            <span>ارزش تخمینی: <strong>{formatCurrency((leads ?? []).reduce((s, l) => s + (l.estimated_value ?? 0), 0))}</strong></span>
          </div>
          <Link href="/leads/new">
            <Button size="sm">
              <Plus className="w-3.5 h-3.5" />
              لید جدید
            </Button>
          </Link>
        </div>

        {/* Kanban */}
        <div className="flex gap-3 overflow-x-auto pb-4">
          {STAGES.map((stage) => {
            const stageLeads = byStage[stage.key] ?? []
            const total = stageLeads.reduce((s, l) => s + (l.estimated_value ?? 0), 0)
            return (
              <div key={stage.key} className="flex-shrink-0 w-60">
                <div className={`rounded-t-lg px-3 py-2 ${stage.header} flex items-center justify-between`}>
                  <span className="text-xs font-semibold text-gray-700">{stage.label}</span>
                  <span className="text-xs text-gray-500 bg-white/60 rounded-full px-1.5 py-0.5">
                    {stageLeads.length}
                  </span>
                </div>
                <div className="bg-gray-100 rounded-b-lg p-2 min-h-[400px] space-y-2">
                  {total > 0 && (
                    <div className="text-center text-xs text-gray-500 py-1">
                      {formatCurrency(total)}
                    </div>
                  )}
                  {stageLeads.map((lead) => (
                    <Link key={lead.id} href={`/leads/${lead.id}`}>
                      <div className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
                        <p className="text-sm font-medium text-gray-900 mb-1">{lead.full_name}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2" dir="ltr">
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </div>
                        {lead.estimated_value && (
                          <p className="text-xs text-emerald-600 font-medium mb-2">
                            {formatCurrency(lead.estimated_value)}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-blue-500" />
                            <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${lead.ai_score}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500">{lead.ai_score}</span>
                          </div>
                          {lead.users?.full_name && (
                            <span className="text-xs text-gray-400 truncate max-w-[60px]">
                              {lead.users.full_name}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                  <Link href={`/leads/new?stage=${stage.key}`}>
                    <button className="w-full text-xs text-gray-400 hover:text-gray-600 py-2 border border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                      + افزودن لید
                    </button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
