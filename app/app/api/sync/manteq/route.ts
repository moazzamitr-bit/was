import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const MANTEQ_URL = process.env.MANTEQ_API_URL
const MANTEQ_KEY = process.env.MANTEQ_API_KEY

async function callManteq(endpoint: string, method: string, body?: object) {
  if (!MANTEQ_URL || !MANTEQ_KEY) {
    throw new Error('سیستم منطق هنوز پیکربندی نشده')
  }

  let attempt = 0
  const delays = [1000, 5000, 15000]

  while (attempt <= 3) {
    try {
      const res = await fetch(`${MANTEQ_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': MANTEQ_KEY,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(10000),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.json()
    } catch (err) {
      if (attempt < 3) {
        await new Promise(r => setTimeout(r, delays[attempt]))
        attempt++
      } else {
        throw err
      }
    }
  }
}

// POST /api/sync/manteq — process pending sync logs
export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const { data: pending } = await supabase
    .from('api_sync_logs')
    .select('*')
    .eq('status', 'pending')
    .order('created_at')
    .limit(20)

  const results = []

  for (const log of (pending ?? [])) {
    try {
      let endpoint = ''
      if (log.event_type === 'order_created') endpoint = '/orders'
      else if (log.event_type === 'payment_recorded') endpoint = '/payments'
      else continue

      const response = await callManteq(endpoint, 'POST', log.payload)

      await supabase.from('api_sync_logs')
        .update({ status: 'success', response, synced_at: new Date().toISOString() })
        .eq('id', log.id)

      results.push({ id: log.id, status: 'success' })
    } catch (err: any) {
      const retryCount = (log.retry_count ?? 0) + 1
      const failed = retryCount >= 5

      await supabase.from('api_sync_logs').update({
        status: failed ? 'failed' : 'retrying',
        retry_count: retryCount,
        error_message: err.message,
        next_retry_at: failed ? null : new Date(Date.now() + retryCount * 5 * 60 * 1000).toISOString(),
      }).eq('id', log.id)

      results.push({ id: log.id, status: failed ? 'failed' : 'retrying', error: err.message })
    }
  }

  return NextResponse.json({ processed: results.length, results })
}

// GET /api/sync/manteq/balance?customer_id=xxx — pull balance from Manteq
export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)
  const customerId = searchParams.get('customer_id')

  if (!customerId) {
    return NextResponse.json({ error: 'customer_id الزامی است' }, { status: 400 })
  }

  try {
    const balance = await callManteq(`/customers/${customerId}/balance`, 'GET')
    await supabase.from('customers').update({
      manteq_balance: balance.amount ?? 0,
      manteq_balance_updated: new Date().toISOString(),
    }).eq('id', customerId)

    return NextResponse.json({ balance })
  } catch (err: any) {
    return NextResponse.json({ error: err.message, note: 'سیستم منطق در دسترس نیست' }, { status: 503 })
  }
}
