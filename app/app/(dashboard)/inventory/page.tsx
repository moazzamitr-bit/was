import { createClient } from '@/lib/supabase/server'
import { Topbar } from '@/components/layout/topbar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { AlertTriangle, Package, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function InventoryPage() {
  const supabase = await createClient()

  const { data: items, count } = await supabase
    .from('inventory')
    .select(`
      *,
      products(id,name,sku,unit,sale_price,reorder_point,brands(name),categories(name)),
      warehouses(name)
    `, { count: 'exact' })
    .order('qty_physical', { ascending: true })
    .limit(100)

  const lowStock = items?.filter(i =>
    i.qty_physical <= ((i.products as any)?.reorder_point ?? 5)
  ).length ?? 0

  return (
    <div>
      <Topbar title="موجودی انبار" subtitle={`${count ?? 0} کالا`} />
      <div className="p-6 space-y-4">

        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-xs font-medium">
              <AlertTriangle className="w-3.5 h-3.5" />
              {lowStock} کالای بحرانی
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/inventory/receive">
              <Button variant="outline" size="sm"><Plus className="w-3.5 h-3.5" />ورود کالا</Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-right">
                  {['SKU','نام محصول','برند','دسته','واحد','موجودی فیزیکی','رزرو شده','قابل فروش','قیمت','وضعیت'].map(h => (
                    <th key={h} className="px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items?.length === 0 ? (
                  <tr><td colSpan={10} className="px-5 py-12 text-center text-gray-400">
                    هنوز کالایی در انبار ثبت نشده
                  </td></tr>
                ) : items?.map((item: any) => {
                  const available = item.qty_physical - item.qty_reserved
                  const isCritical = item.qty_physical <= (item.products?.reorder_point ?? 5)
                  return (
                    <tr key={item.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${isCritical ? 'bg-red-50/30' : ''}`}>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{item.products?.sku}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{item.products?.name}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{item.products?.brands?.name ?? '—'}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{item.products?.categories?.name ?? '—'}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{item.products?.unit}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{item.qty_physical}</td>
                      <td className="px-4 py-3 text-amber-600">{item.qty_reserved}</td>
                      <td className="px-4 py-3 font-semibold text-emerald-700">{available.toFixed(1)}</td>
                      <td className="px-4 py-3 text-gray-900">{formatCurrency(item.products?.sale_price)}</td>
                      <td className="px-4 py-3">
                        {isCritical
                          ? <Badge variant="danger"><AlertTriangle className="w-3 h-3 ml-1 inline" />بحرانی</Badge>
                          : available > 20
                            ? <Badge variant="success">موجود</Badge>
                            : <Badge variant="warning">کم</Badge>
                        }
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
