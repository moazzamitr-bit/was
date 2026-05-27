import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const payment = searchParams.get('payment_status')

  let query = supabase
    .from('orders')
    .select('*,customers(full_name,company_name),users!assigned_to(full_name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50)

  if (status) query = query.eq('status', status)
  if (payment) query = query.eq('payment_status', payment)

  const { data, count, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, count })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const body = await req.json()

  if (body.customer_id) {
    const { data: customer } = await supabase
      .from('customers')
      .select('manteq_balance,credit_limit')
      .eq('id', body.customer_id)
      .single()

    if (customer && customer.manteq_balance > customer.credit_limit) {
      return NextResponse.json(
        { error: 'بدهی مشتری از سقف اعتبار تجاوز کرده. تایید مدیر مالی لازم است.' },
        { status: 400 }
      )
    }
  }

  const { data, error } = await supabase.from('orders').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  if (data) {
    await supabase.from('api_sync_logs').insert({
      direction: 'to_manteq',
      event_type: 'order_created',
      related_id: data.id,
      payload: { order_id: data.id, order_number: data.order_number },
      status: 'pending',
    })
  }

  return NextResponse.json({ data }, { status: 201 })
}
