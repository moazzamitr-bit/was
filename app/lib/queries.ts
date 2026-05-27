import { createClient } from '@/lib/supabase/server'

export async function getCachedDashboardStats() {
  const supabase = await createClient()
  const { data } = await supabase.from('dashboard_stats').select('*').single()
  return data
}

export async function getCachedRecentOrders() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('orders')
    .select('id,order_number,final_amount,status,payment_status,created_at,customers(full_name)')
    .order('created_at', { ascending: false })
    .limit(8)
  return data ?? []
}

export async function getCachedOpenLeads() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('leads')
    .select('id,full_name,phone,stage,ai_score,estimated_value,created_at,users(full_name)')
    .not('stage', 'in', '("won","lost")')
    .order('ai_score', { ascending: false })
    .limit(8)
  return data ?? []
}

export async function getCachedLowStock() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('inventory')
    .select('qty_physical,products(name,sku,reorder_point)')
    .lt('qty_physical', 10)
    .limit(5)
  return data ?? []
}

export async function getCachedTodayFollowUps() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('follow_ups')
    .select('id,type,scheduled_at,notes')
    .eq('status', 'pending')
    .lte('scheduled_at', new Date(Date.now() + 86400000).toISOString())
    .order('scheduled_at')
    .limit(5)
  return data ?? []
}
