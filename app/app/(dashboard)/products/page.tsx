import { createClient } from '@/lib/supabase/server'
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; category?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  const [productsRes, brandsRes, categoriesRes] = await Promise.all([
    supabase.from('products')
      .select('*,brands(name),categories(name)', { count: 'exact' })
      .eq('is_active', true)
      .order('name')
      .limit(100),
    supabase.from('brands').select('id,name').eq('is_active', true),
    supabase.from('categories').select('id,name').eq('level', 1),
  ])

  return (
    <div>
      <Topbar title="محصولات و کاتالوگ" subtitle={`${productsRes.count ?? 0} محصول`} />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
              <option value="">همه برندها</option>
              {brandsRes.data?.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
              <option value="">همه دسته‌ها</option>
              {categoriesRes.data?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <Link href="/products/new">
            <Button size="sm"><Plus className="w-3.5 h-3.5" />محصول جدید</Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-right">
                  {['SKU','نام','برند','دسته','واحد','قیمت فروش','قیمت خرید','حداقل',''].map(h => (
                    <th key={h} className="px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productsRes.data?.length === 0 ? (
                  <tr><td colSpan={9} className="px-5 py-12 text-center text-gray-400">هنوز محصولی ثبت نشده</td></tr>
                ) : productsRes.data?.map((p: any) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{p.sku}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                    <td className="px-4 py-3"><Badge variant="info">{p.brands?.name ?? '—'}</Badge></td>
                    <td className="px-4 py-3 text-xs text-gray-500">{p.categories?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{p.unit}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{formatCurrency(p.sale_price)}</td>
                    <td className="px-4 py-3 text-gray-500">{formatCurrency(p.purchase_price)}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{p.min_stock}</td>
                    <td className="px-4 py-3">
                      <Link href={`/products/${p.id}`}>
                        <Button variant="ghost" size="sm">ویرایش</Button>
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
