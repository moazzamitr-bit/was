import { createClient } from '@/lib/supabase/server'
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Shield, Link2, Database } from 'lucide-react'
import Link from 'next/link'

export default async function SettingsPage() {
  const supabase = await createClient()
  const [rolesRes, syncLogsRes] = await Promise.all([
    supabase.from('roles').select('*').order('name'),
    supabase.from('api_sync_logs').select('*').order('created_at', { ascending: false }).limit(10),
  ])

  const syncStatusVariant: Record<string, any> = {
    success: 'success', failed: 'danger', pending: 'warning', retrying: 'warning',
  }

  return (
    <div>
      <Topbar title="تنظیمات سیستم" subtitle="کاربران، نقش‌ها و Integration" />
      <div className="p-6 space-y-4">

        <div className="grid grid-cols-2 gap-4">
          {/* Roles */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2"><Shield className="w-4 h-4" />نقش‌های سیستم</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-right">
                    {['نقش','عنوان فارسی'].map(h => (
                      <th key={h} className="px-4 py-2 text-xs font-medium text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rolesRes.data?.map((r: any) => (
                    <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-2 font-mono text-xs text-gray-600">{r.name}</td>
                      <td className="px-4 py-2 text-gray-900">{r.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Manteq Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Link2 className="w-4 h-4" />Integration سیستم منطق</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-sm text-amber-700">در انتظار پیکربندی</span>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">آدرس API منطق</label>
                <input
                  className="w-full h-9 px-3 border border-gray-300 rounded-lg text-sm"
                  placeholder="https://api.manteq.ir/..."
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">API Key</label>
                <input
                  className="w-full h-9 px-3 border border-gray-300 rounded-lg text-sm"
                  placeholder="•••••••••••••••"
                  type="password"
                  dir="ltr"
                />
              </div>
              <Button size="sm" className="w-full">ذخیره و تست اتصال</Button>
            </CardContent>
          </Card>
        </div>

        {/* Sync Logs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Database className="w-4 h-4" />لاگ Sync با منطق</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {syncLogsRes.data?.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-8">هنوز sync‌ای انجام نشده</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-right">
                    {['نوع رویداد','جهت','وضعیت','پیام خطا','زمان'].map(h => (
                      <th key={h} className="px-4 py-2 text-xs font-medium text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {syncLogsRes.data?.map((log: any) => (
                    <tr key={log.id} className="border-b border-gray-50">
                      <td className="px-4 py-2 font-mono text-xs">{log.event_type}</td>
                      <td className="px-4 py-2 text-xs">{log.direction === 'to_manteq' ? '→ منطق' : '← منطق'}</td>
                      <td className="px-4 py-2"><Badge variant={syncStatusVariant[log.status]}>{log.status}</Badge></td>
                      <td className="px-4 py-2 text-xs text-red-500 truncate max-w-[200px]">{log.error_message ?? '—'}</td>
                      <td className="px-4 py-2 text-xs text-gray-500">{new Date(log.created_at).toLocaleString('fa-IR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
