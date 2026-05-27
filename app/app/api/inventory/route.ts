import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)
  const lowStock = searchParams.get('low_stock') === 'true'

  let query = supabase
    .from('inventory')
    .select('*,products(id,name,sku,unit,sale_price,reorder_point,brands(name),categories(name)),warehouses(name)')
    .order('qty_physical', { ascending: true })

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const result = lowStock
    ? data?.filter(i => i.qty_physical <= ((i.products as any)?.reorder_point ?? 5))
    : data

  return NextResponse.json({ data: result })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const body = await req.json()
  const { product_id, warehouse_id, qty, type } = body

  if (!['receive', 'issue', 'adjust'].includes(type)) {
    return NextResponse.json({ error: 'نوع حرکت انبار نامعتبر است' }, { status: 400 })
  }

  const { data: current } = await supabase
    .from('inventory')
    .select('qty_physical,qty_reserved')
    .eq('product_id', product_id)
    .eq('warehouse_id', warehouse_id)
    .single()

  if (type === 'issue') {
    const available = (current?.qty_physical ?? 0) - (current?.qty_reserved ?? 0)
    if (available < qty) {
      return NextResponse.json({ error: `موجودی قابل فروش کافی نیست. موجود: ${available}` }, { status: 400 })
    }
  }

  const delta = type === 'issue' ? -qty : qty
  const { data, error } = await supabase
    .from('inventory')
    .upsert({
      product_id,
      warehouse_id,
      qty_physical: (current?.qty_physical ?? 0) + delta,
      qty_reserved: current?.qty_reserved ?? 0,
      updated_at: new Date().toISOString(),
    })
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ data })
}
