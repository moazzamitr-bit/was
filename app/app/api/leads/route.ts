import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)
  const stage = searchParams.get('stage')
  const assigned = searchParams.get('assigned_to')

  let query = supabase
    .from('leads')
    .select('*,users!assigned_to(full_name)', { count: 'exact' })
    .order('ai_score', { ascending: false })
    .limit(100)

  if (stage) query = query.eq('stage', stage)
  if (assigned) query = query.eq('assigned_to', assigned)

  const { data, count, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, count })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const body = await req.json()

  const { data: existing } = await supabase
    .from('leads')
    .select('id,stage')
    .eq('phone', body.phone)
    .not('stage', 'in', '("won","lost")')
    .single()

  if (existing) {
    return NextResponse.json(
      { error: 'لید با این شماره تلفن قبلاً ثبت شده', existing_id: existing.id },
      { status: 409 }
    )
  }

  const { data, error } = await supabase.from('leads').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ data }, { status: 201 })
}
