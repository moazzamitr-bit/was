import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان'
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('fa-IR')
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString('fa-IR')
}

export function getLeadStageName(stage: string): string {
  const map: Record<string, string> = {
    new: 'جدید',
    contacted: 'تماس اولیه',
    interested: 'علاقه‌مند',
    quoted: 'پیش‌فاکتور',
    negotiating: 'مذاکره',
    won: 'برنده',
    lost: 'باخته',
  }
  return map[stage] ?? stage
}

export function getOrderStatusName(status: string): string {
  const map: Record<string, string> = {
    draft: 'پیش‌نویس',
    confirmed: 'تایید شده',
    in_procurement: 'در حال تامین',
    ready: 'آماده ارسال',
    shipped: 'ارسال شده',
    delivered: 'تحویل داده شده',
    cancelled: 'لغو شده',
  }
  return map[status] ?? status
}

export function getPaymentStatusName(status: string): string {
  const map: Record<string, string> = {
    unpaid: 'پرداخت نشده',
    partial: 'پرداخت جزئی',
    paid: 'تسویه شده',
  }
  return map[status] ?? status
}

export function getCustomerTypeName(type: string): string {
  const map: Record<string, string> = {
    owner: 'مالک',
    builder: 'سازنده',
    architect: 'معمار',
    contractor: 'پیمانکار',
    company: 'شرکت',
    b2b: 'B2B',
    retail: 'خرده‌فروش',
  }
  return map[type] ?? type
}

export function getGradeColor(grade: string): string {
  const map: Record<string, string> = {
    A: 'success',
    B: 'info',
    C: 'warning',
    D: 'danger',
  }
  return map[grade] ?? 'default'
}
