'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export default function NewCustomerPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    type: 'retail', full_name: '', company_name: '', phone: '',
    email: '', city: '', grade: 'C', source: 'manual',
    credit_limit: '', notes: '',
  })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.full_name || !form.phone) { setError('نام و تلفن الزامی است'); return }
    setLoading(true); setError('')
    const res = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        phones: [{ type: 'mobile', number: form.phone }],
        credit_limit: form.credit_limit ? Number(form.credit_limit) : 0,
      }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error); setLoading(false); return }
    router.push('/customers')
  }

  return (
    <div>
      <Topbar title="مشتری جدید" subtitle="ثبت مشتری در سیستم" />
      <div className="p-6 max-w-2xl">
        <Card>
          <CardHeader><CardTitle>اطلاعات مشتری</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">نوع مشتری</label>
                  <Select value={form.type} onChange={e => set('type', e.target.value)}>
                    <option value="retail">خرده‌فروش</option>
                    <option value="owner">مالک</option>
                    <option value="builder">سازنده</option>
                    <option value="architect">معمار</option>
                    <option value="contractor">پیمانکار</option>
                    <option value="company">شرکت</option>
                    <option value="b2b">B2B</option>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">درجه مشتری</label>
                  <Select value={form.grade} onChange={e => set('grade', e.target.value)}>
                    <option value="A">A — ممتاز</option>
                    <option value="B">B — خوب</option>
                    <option value="C">C — معمولی</option>
                    <option value="D">D — ضعیف</option>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">نام کامل *</label>
                  <Input value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="نام و نام‌خانوادگی" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">نام شرکت</label>
                  <Input value={form.company_name} onChange={e => set('company_name', e.target.value)} placeholder="در صورت وجود" />
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
                  <label className="text-xs font-medium text-gray-700 block mb-1">شهر</label>
                  <Input value={form.city} onChange={e => set('city', e.target.value)} placeholder="تهران" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">منبع آشنایی</label>
                  <Select value={form.source} onChange={e => set('source', e.target.value)}>
                    <option value="manual">ورود دستی</option>
                    <option value="callcenter">کال‌سنتر</option>
                    <option value="referral">معرفی</option>
                    <option value="website">وبسایت</option>
                    <option value="instagram">اینستاگرام</option>
                    <option value="exhibition">نمایشگاه</option>
                  </Select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-medium text-gray-700 block mb-1">سقف اعتبار (تومان)</label>
                  <Input value={form.credit_limit} onChange={e => set('credit_limit', e.target.value)} placeholder="مثلاً 100000000" dir="ltr" type="number" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">یادداشت</label>
                <Textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="اطلاعات تکمیلی..." rows={3} />
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={loading}>{loading ? 'در حال ثبت...' : 'ثبت مشتری'}</Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>انصراف</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
