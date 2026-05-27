'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Users, Target, ShoppingCart, Package,
  Warehouse, Truck, DollarSign, Megaphone, BarChart3,
  Phone, Building2, FolderOpen, Settings, LogOut, ChevronDown
} from 'lucide-react'
import { useState } from 'react'

const nav = [
  { label: 'داشبورد', href: '/dashboard', icon: LayoutDashboard },
  {
    label: 'فروش',
    icon: ShoppingCart,
    children: [
      { label: 'لیدها', href: '/leads', icon: Target },
      { label: 'پیش‌فاکتورها', href: '/quotations', icon: FolderOpen },
      { label: 'سفارش‌ها', href: '/orders', icon: ShoppingCart },
    ],
  },
  {
    label: 'مشتریان',
    icon: Users,
    children: [
      { label: 'همه مشتریان', href: '/customers', icon: Users },
      { label: 'پروژه‌ها', href: '/projects', icon: Building2 },
      { label: 'B2B', href: '/b2b', icon: Building2 },
    ],
  },
  { label: 'کال‌سنتر', href: '/callcenter', icon: Phone },
  {
    label: 'انبار',
    icon: Warehouse,
    children: [
      { label: 'موجودی', href: '/inventory', icon: Package },
      { label: 'ورود کالا', href: '/inventory/receive', icon: Truck },
    ],
  },
  { label: 'تامین', href: '/procurement', icon: Truck },
  { label: 'محصولات', href: '/products', icon: Package },
  { label: 'مالی', href: '/finance', icon: DollarSign },
  { label: 'مارکتینگ', href: '/marketing', icon: Megaphone },
  { label: 'گزارش‌ها', href: '/reports', icon: BarChart3 },
  { label: 'تنظیمات', href: '/settings', icon: Settings },
]

function NavItem({ item, depth = 0 }: { item: typeof nav[0]; depth?: number }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(
    'children' in item ? item.children?.some(c => pathname.startsWith(c.href)) : false
  )
  const Icon = item.icon

  if ('children' in item && item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-right',
            'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          )}
        >
          <Icon className="w-4 h-4 shrink-0" />
          <span className="flex-1">{item.label}</span>
          <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', open && 'rotate-180')} />
        </button>
        {open && (
          <div className="mr-4 border-r border-gray-200 pr-2 mt-0.5 space-y-0.5">
            {item.children.map(child => (
              <NavItem key={child.href} item={child} depth={1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  const href = (item as { href: string }).href
  const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        isActive
          ? 'bg-blue-50 text-blue-700 font-semibold'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span>{item.label}</span>
    </Link>
  )
}

export function Sidebar() {
  return (
    <aside className="fixed right-0 top-0 h-screen w-60 bg-white border-l border-gray-200 flex flex-col z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold text-sm">و</span>
        </div>
        <div>
          <div className="text-sm font-bold text-gray-900">مجموعه وس</div>
          <div className="text-xs text-gray-500">WAS-OS</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {nav.map((item, i) => (
          <NavItem key={i} item={item} />
        ))}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
          <LogOut className="w-4 h-4" />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  )
}
