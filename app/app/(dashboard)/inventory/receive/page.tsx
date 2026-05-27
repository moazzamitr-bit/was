'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'

export default function ReceiveInventoryPage() {
  const router = useRouter()
  const [products, setProducts] = useState<any[]>([])
  const [warehouses, setWarehouses] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ product_id: '', warehouse_id: '', qty: '', type: 'receive', notes: '' })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  useEffect(() => {
    const supabase = createClient()
    supabase.from('products').select('id,name,sku').eq('is_active', true).then(r => setProducts(r.data ?? []))
    supabase.from('warehouses').select('id,name').eq('is_active', true).then(r => setWarehouses(r.data ?? []))
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, qty: Number(form.qty) }),
    })
    setLoading(false)
    if (res.ok) { setSuccess(true); setTimeout(() => router.push('/inventory'), 1500) }
  }

  return (
    <div>
      <Topbar title="ورود کالا" subtitle="ثبت دریافت کالا به انبار" />
      <div className="p-6 max-w-lg">
        {success && <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm mb-4">کالا با موفقیت در انبار ثبت شد.</div>}
        <Card>
          <CardHeader><CardTitle>ثبت ورود کالا</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">محصول *</label>
                <Select value={form.product_id} onChange={e => set('product_id', e.target.value)} required>
                  <option value="">انتخاب محصول...</option>
                  {products.map(p => <option key={p.id} value={p.id}>[{p.sku}] {p.name}</option>)}
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">انبار *</label>
                <Select value={form.warehouse_id} onChange={e => set('warehouse_id', e.target.value)} required>
                  <option value="">انتخاب انبار...</option>
                  {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">نوع عملیات</label>
                <Select value={form.type} onChange={e => set('type', e.target.value)}>
                  <option value="receive">ورود از خرید</option>
                  <option value="adjust">تنظیم موجودی</option>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">تعداد / مقدار *</label>
                <Input value={form.qty} onChange={e => set('qty', e.target.value)} type="number" min="0.001" step="0.001" placeholder="مثلاً 100" dir="ltr" required />
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={loading}>{loading ? 'در حال ثبت...' : 'ثبت ورود کالا'}</Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>انصراف</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
