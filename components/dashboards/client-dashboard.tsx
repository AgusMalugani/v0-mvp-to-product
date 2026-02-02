'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DashboardHeader } from '@/components/shared/dashboard-header'
import { VehicleCard } from '@/components/shared/vehicle-card'
import { HealthCircle } from '@/components/shared/health-indicator'
import { useApp } from '@/lib/app-context'
import { fleetStats } from '@/lib/mock-data'
import type { VehicleStatus } from '@/lib/types'
import {
  Truck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Wrench,
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  Calendar,
  Activity,
} from 'lucide-react'

const statusFilters: { value: VehicleStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'operational', label: 'Operativos' },
  { value: 'attention', label: 'Atencion' },
  { value: 'critical', label: 'Criticos' },
  { value: 'in_workshop', label: 'En Taller' },
]

export function ClientDashboard() {
  const { vehicles, currentUser, setCurrentView, setSelectedVehicleId } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<VehicleStatus | 'all'>('all')

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    operational: vehicles.filter((v) => v.status === 'operational').length,
    attention: vehicles.filter((v) => v.status === 'attention').length,
    critical: vehicles.filter((v) => v.status === 'critical').length,
    in_workshop: vehicles.filter((v) => v.status === 'in_workshop').length,
  }

  const totalAlerts = vehicles.reduce((acc, v) => acc + v.alerts.filter((a) => !a.isRead).length, 0)

  const handleQuickAction = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId)
    setCurrentView('vehicle-detail')
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title={currentUser?.company || 'Panel de Flota'}
        subtitle="Gestion de vehiculos"
      />

      <main className="p-4 md:p-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Bienvenido, {currentUser?.name?.split(' ')[0]}
          </h2>
          <p className="text-muted-foreground">
            Aqui tienes el resumen de tu flota para hoy.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-operational">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-operational/10">
                <CheckCircle2 className="h-6 w-6 text-operational" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{statusCounts.operational}</p>
                <p className="text-sm text-muted-foreground">Operativos</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-attention">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-attention/10">
                <Clock className="h-6 w-6 text-attention" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{statusCounts.attention}</p>
                <p className="text-sm text-muted-foreground">Requieren atencion</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-critical">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-critical/10">
                <AlertTriangle className="h-6 w-6 text-critical" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{statusCounts.critical}</p>
                <p className="text-sm text-muted-foreground">Estado critico</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blocked">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blocked/10">
                <Wrench className="h-6 w-6 text-blocked" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{statusCounts.in_workshop}</p>
                <p className="text-sm text-muted-foreground">En taller</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content - Vehicles */}
          <div className="lg:col-span-2 space-y-6">
            {/* Alerts Banner */}
            {totalAlerts > 0 && (
              <Card className="border-critical/50 bg-critical/5">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-critical/20">
                      <AlertTriangle className="h-5 w-5 text-critical" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {totalAlerts} alerta{totalAlerts > 1 ? 's' : ''} activa{totalAlerts > 1 ? 's' : ''}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Revisa los vehiculos que requieren atencion inmediata
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStatusFilter('critical')}
                  >
                    Ver alertas
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Search and Filter */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por patente, marca o modelo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                {statusFilters.map((filter) => (
                  <Button
                    key={filter.value}
                    variant={statusFilter === filter.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter(filter.value)}
                    className="shrink-0"
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Vehicles List */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">
                  Vehiculos ({filteredVehicles.length})
                </h3>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Mas filtros
                </Button>
              </div>
              {filteredVehicles.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {filteredVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Truck className="mb-4 h-12 w-12 text-muted-foreground/50" />
                    <p className="font-medium text-foreground">No se encontraron vehiculos</p>
                    <p className="text-sm text-muted-foreground">
                      Intenta ajustar los filtros de busqueda
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fleet Health Overview */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Activity className="h-4 w-4" />
                  Salud de la Flota
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center pt-4">
                <HealthCircle value={fleetStats.averageHealth} size={120} />
                <p className="mt-4 text-sm text-muted-foreground">Salud promedio</p>
                <div className="mt-4 w-full space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Vehiculos totales</span>
                    <span className="font-medium text-foreground">{vehicles.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Alertas pendientes</span>
                    <span className="font-medium text-critical">{totalAlerts}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Costs */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <DollarSign className="h-4 w-4" />
                  Costos del Mes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      ${fleetStats.monthlyMaintenance.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Mantenimiento</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-operational" />
                    <span className="text-operational">12% menos que el mes anterior</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Services */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="h-4 w-4" />
                  Proximos Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vehicles
                    .sort((a, b) => new Date(a.nextService).getTime() - new Date(b.nextService).getTime())
                    .slice(0, 3)
                    .map((v) => {
                      const daysUntil = Math.ceil(
                        (new Date(v.nextService).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                      )
                      return (
                        <button
                          key={v.id}
                          onClick={() => handleQuickAction(v.id)}
                          className="flex w-full items-center justify-between rounded-lg p-2 text-left transition-colors hover:bg-secondary"
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">{v.plate}</p>
                            <p className="text-xs text-muted-foreground">
                              {v.brand} {v.model}
                            </p>
                          </div>
                          <span
                            className={`text-xs font-medium ${
                              daysUntil < 0
                                ? 'text-critical'
                                : daysUntil < 15
                                  ? 'text-attention'
                                  : 'text-muted-foreground'
                            }`}
                          >
                            {daysUntil < 0
                              ? 'Vencido'
                              : daysUntil === 0
                                ? 'Hoy'
                                : `${daysUntil} dias`}
                          </span>
                        </button>
                      )
                    })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Acciones Rapidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <Truck className="h-4 w-4" />
                  Agregar vehiculo
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-transparent"
                  onClick={() => setCurrentView('notifications')}
                >
                  <AlertTriangle className="h-4 w-4" />
                  Ver todas las alertas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
