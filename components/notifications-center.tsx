'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardHeader } from '@/components/shared/dashboard-header'
import { useApp } from '@/lib/app-context'
import type { Notification } from '@/lib/types'
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Info,
  Clock,
  ArrowLeft,
  Trash2,
  Check,
  Filter,
} from 'lucide-react'

type NotificationTab = 'all' | 'unread' | 'alerts'

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'alert':
      return <AlertTriangle className="h-5 w-5 text-critical" />
    case 'warning':
      return <Clock className="h-5 w-5 text-attention" />
    case 'success':
      return <CheckCircle2 className="h-5 w-5 text-operational" />
    case 'info':
    default:
      return <Info className="h-5 w-5 text-chart-4" />
  }
}

const getNotificationBg = (type: Notification['type'], isRead: boolean) => {
  if (isRead) return 'bg-card'
  switch (type) {
    case 'alert':
      return 'bg-critical/5 border-critical/20'
    case 'warning':
      return 'bg-attention/5 border-attention/20'
    case 'success':
      return 'bg-operational/5 border-operational/20'
    case 'info':
    default:
      return 'bg-chart-4/5 border-chart-4/20'
  }
}

const formatTimeAgo = (timestamp: string) => {
  const now = new Date()
  const date = new Date(timestamp)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) return `Hace ${diffMins} min`
  if (diffHours < 24) return `Hace ${diffHours}h`
  if (diffDays < 7) return `Hace ${diffDays} dias`
  return date.toLocaleDateString('es-AR')
}

export function NotificationsCenter() {
  const {
    notifications,
    setNotifications,
    currentRole,
    setCurrentView,
    setSelectedVehicleId,
  } = useApp()
  const [activeTab, setActiveTab] = useState<NotificationTab>('all')

  const handleBack = () => {
    switch (currentRole) {
      case 'client':
        setCurrentView('client-dashboard')
        break
      case 'workshop':
        setCurrentView('workshop-dashboard')
        break
      case 'driver':
        setCurrentView('driver-dashboard')
        break
      case 'admin':
        setCurrentView('admin-dashboard')
        break
      default:
        setCurrentView('landing')
    }
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleNotificationClick = (notification: Notification) => {
    handleMarkAsRead(notification.id)
    if (notification.vehicleId) {
      setSelectedVehicleId(notification.vehicleId)
      setCurrentView('vehicle-detail')
    }
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const alertCount = notifications.filter((n) => n.type === 'alert' || n.type === 'warning').length

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'unread') return !n.isRead
    if (activeTab === 'alerts') return n.type === 'alert' || n.type === 'warning'
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Centro de Notificaciones" />

      <main className="p-4 md:p-6">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4 gap-2" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Notificaciones</h2>
            <p className="text-muted-foreground">
              Tienes {unreadCount} notificacion{unreadCount !== 1 ? 'es' : ''} sin leer
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
              className="gap-2 bg-transparent"
            >
              <Check className="h-4 w-4" />
              Marcar todas como leidas
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{notifications.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-attention/10">
                <Clock className="h-6 w-6 text-attention" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{unreadCount}</p>
                <p className="text-sm text-muted-foreground">Sin leer</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-critical/10">
                <AlertTriangle className="h-6 w-6 text-critical" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{alertCount}</p>
                <p className="text-sm text-muted-foreground">Alertas</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as NotificationTab)}>
          <TabsList>
            <TabsTrigger value="all" className="gap-2">
              <Bell className="h-4 w-4" />
              Todas
              <span className="ml-1 rounded-full bg-secondary px-2 py-0.5 text-xs">
                {notifications.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="unread" className="gap-2">
              <Clock className="h-4 w-4" />
              Sin leer
              {unreadCount > 0 && (
                <span className="ml-1 rounded-full bg-attention/20 px-2 py-0.5 text-xs text-attention">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Alertas
              {alertCount > 0 && (
                <span className="ml-1 rounded-full bg-critical/20 px-2 py-0.5 text-xs text-critical">
                  {alertCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredNotifications.length > 0 ? (
              <div className="space-y-3">
                {filteredNotifications
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map((notification) => (
                    <Card
                      key={notification.id}
                      className={`cursor-pointer overflow-hidden transition-all hover:shadow-md ${getNotificationBg(
                        notification.type,
                        notification.isRead
                      )}`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <CardContent className="p-0">
                        <div className="flex items-start gap-4 p-4">
                          <div className="mt-1 shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p
                                  className={`font-medium ${
                                    notification.isRead
                                      ? 'text-muted-foreground'
                                      : 'text-foreground'
                                  }`}
                                >
                                  {notification.title}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {notification.message}
                                </p>
                              </div>
                              {!notification.isRead && (
                                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                              )}
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {formatTimeAgo(notification.timestamp)}
                              </span>
                              <div className="flex items-center gap-1">
                                {!notification.isRead && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleMarkAsRead(notification.id)
                                    }}
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2 text-muted-foreground hover:text-critical"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete(notification.id)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="mb-4 h-12 w-12 text-muted-foreground/50" />
                  <p className="font-medium text-foreground">
                    {activeTab === 'unread'
                      ? 'Todas las notificaciones han sido leidas'
                      : activeTab === 'alerts'
                        ? 'No hay alertas pendientes'
                        : 'No hay notificaciones'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activeTab === 'unread'
                      ? 'Excelente! Estas al dia'
                      : 'Las nuevas notificaciones apareceran aqui'}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
