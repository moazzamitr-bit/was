'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export default function NewLeadPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    full_name: '', phone: '', email: '', source: 'manual',
    stage: 'new', estimated_value: '', notes: '',
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.full_name || !form.phone) { setError('نام و تلفن الزامی است'); return }
    setLoading(true); setError('')
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, estimated_value: form.estimated_value ? Number(form.estimated_value) : null }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error); setLoading(false); return }
    router.push('/leads')
  }

  return (
    <div>
      <Topbar title="لید جدید" subtitle="ثبت سرنخ فروش جدید" />
      <div className="p-6 max-w-xl">
        <Card>
          <CardHeader><CardTitle>اطلاعات لید</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">نام کامل *</label>
                  <Input value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="نام و نام‌خانوادگی" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">شماره تلفن *</label>
                  <Input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="09..." dir="ltr" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">ایمیل</label>
                  <Input value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@..." dir="ltr" type="email" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">منبع ورودی</label>
                  <Select value={form.source} onChange={e => set('source', e.target.value)}>
                    <option value="manual">ورود دستی</option>
                    <option value="callcenter">کال‌سنتر</option>
                    <option value="website">وبسایت</option>
                    <option value="instagram">اینستاگرام</option>
                    <option value="whatsapp">واتساپ</option>
                    <option value="referral">معرفی</option>
                    <option value="exhibition">نمایشگاه</option>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">مرحله اولیه</label>
                  <Select value={form.stage} onChange={e => set('stage', e.target.value)}>
                    <option value="new">جدید</option>
                    <option value="contacted">تماس اولیه</option>
                    <option value="interested">علاقه‌مند</option>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">ارزش تخمینی (تومان)</label>
                  <Input value={form.estimated_value} onChange={e => set('estimated_value', e.target.value)} placeholder="مثلاً 50000000" dir="ltr" type="number" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">یادداشت</label>
                <Textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="نکات مهم درباره این لید..." rows={3} />
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={loading}>{loading ? 'در حال ثبت...' : 'ثبت لید'}</Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>انصراف</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
