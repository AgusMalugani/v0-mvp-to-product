'use client'

import { Button } from '@/components/ui/button'
import { useApp } from '@/lib/app-context'
import {
  Truck,
  Bell,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

interface DashboardHeaderProps {
  title: string
  subtitle?: string
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const { logout, notifications, setCurrentView, currentUser } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Truck className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">{title}</h1>
              {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setCurrentView('notifications')}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-critical text-xs font-medium text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </Button>
          <div className="hidden items-center gap-3 border-l border-border pl-3 md:flex">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{currentUser?.name}</p>
              <p className="text-xs text-muted-foreground">{currentUser?.company || currentUser?.role}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background p-4 md:hidden">
          <div className="mb-4">
            <p className="font-medium text-foreground">{currentUser?.name}</p>
            <p className="text-sm text-muted-foreground">{currentUser?.company || currentUser?.role}</p>
          </div>
          <Button variant="outline" className="w-full bg-transparent" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesion
          </Button>
        </div>
      )}
    </header>
  )
}
