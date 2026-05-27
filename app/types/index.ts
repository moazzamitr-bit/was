export type UserDepartment =
  | 'sales' | 'b2b' | 'callcenter' | 'warehouse'
  | 'procurement' | 'finance' | 'marketing' | 'management' | 'admin'

export type CustomerType =
  | 'owner' | 'builder' | 'architect' | 'contractor'
  | 'company' | 'b2b' | 'retail'

export type CustomerGrade = 'A' | 'B' | 'C' | 'D'

export type LeadStage =
  | 'new' | 'contacted' | 'interested' | 'quoted'
  | 'negotiating' | 'won' | 'lost'

export type OrderStatus =
  | 'draft' | 'confirmed' | 'in_procurement' | 'ready'
  | 'shipped' | 'delivered' | 'cancelled'

export type PaymentStatus = 'unpaid' | 'partial' | 'paid'

export interface Role {
  id: string
  name: string
  label: string
  permissions: Record<string, string>
  created_at: string
}

export interface User {
  id: string
  full_name: string
  email: string
  phone?: string
  role_id?: string
  department?: UserDepartment
  avatar_url?: string
  is_active: boolean
  last_login?: string
  created_at: string
  roles?: Role
}

export interface Customer {
  id: string
  code?: string
  type: CustomerType
  full_name: string
  company_name?: string
  national_id?: string
  phones: { type: string; number: string }[]
  email?: string
  address?: string
  city?: string
  grade: CustomerGrade
  source?: string
  account_manager?: string
  credit_limit: number
  manteq_balance: number
  ai_score: number
  notes?: string
  is_active: boolean
  created_at: string
  updated_at: string
  users?: { full_name: string }
}

export interface Lead {
  id: string
  customer_id?: string
  full_name: string
  phone: string
  email?: string
  source: string
  source_campaign_id?: string
  assigned_to?: string
  stage: LeadStage
  lost_reason?: string
  ai_score: number
  estimated_value?: number
  next_follow_up?: string
  notes?: string
  created_by?: string
  created_at: string
  updated_at: string
  users?: { full_name: string }
}

export interface Product {
  id: string
  sku: string
  name: string
  brand_id?: string
  category_id?: string
  unit: string
  sale_price: number
  purchase_price: number
  min_stock: number
  reorder_point: number
  specifications: Record<string, string>
  images: string[]
  is_active: boolean
  created_at: string
  brands?: { name: string }
  categories?: { name: string }
}

export interface InventoryItem {
  id: string
  product_id: string
  warehouse_id: string
  qty_physical: number
  qty_reserved: number
  qty_in_transit: number
  updated_at: string
  products?: Product
  warehouses?: { name: string }
}

export interface Order {
  id: string
  order_number: string
  customer_id: string
  quotation_id?: string
  type: 'retail' | 'b2b'
  status: OrderStatus
  payment_status: PaymentStatus
  items: OrderItem[]
  subtotal: number
  discount_amt: number
  tax_amt: number
  final_amount: number
  assigned_to?: string
  notes?: string
  created_at: string
  updated_at: string
  customers?: { full_name: string; company_name?: string }
  users?: { full_name: string }
}

export interface OrderItem {
  product_id?: string
  product_name: string
  sku?: string
  qty: number
  unit_price: number
  discount_pct: number
  final_price: number
}

export interface FollowUp {
  id: string
  related_type: string
  related_id: string
  assigned_to?: string
  type: string
  scheduled_at: string
  completed_at?: string
  status: string
  notes?: string
  outcome?: string
  created_at: string
  users?: { full_name: string }
}

export interface DashboardStats {
  leads_30d: number
  won_30d: number
  orders_30d: number
  revenue_30d: number
  total_customers: number
  open_leads: number
}
