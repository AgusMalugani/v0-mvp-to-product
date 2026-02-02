'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardHeader } from '@/components/shared/dashboard-header'
import { StatusBadge } from '@/components/shared/status-badge'
import { HealthIndicator } from '@/components/shared/health-indicator'
import { useApp } from '@/lib/app-context'
import { workshopStats, mockServiceHistory } from '@/lib/mock-data'
import type { Vehicle, VehicleStatus } from '@/lib/types'
import {
  Wrench,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Search,
  Camera,
  FileText,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Star,
  User,
  Calendar,
  Plus,
  ArrowRight,
} from 'lucide-react'

type WorkshopTab = 'pending' | 'in_progress' | 'completed'

export function WorkshopDashboard() {
  const { vehicles, setVehicles, currentUser, setCurrentView, setSelectedVehicleId } = useApp()
  const [activeTab, setActiveTab] = useState<WorkshopTab>('pending')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [diagnosticNote, setDiagnosticNote] = useState('')
  const [estimatedCost, setEstimatedCost] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')

  // Filter vehicles based on workshop relevance
  const workshopVehicles = vehicles.filter(
    (v) => v.status === 'in_workshop' || v.status === 'critical' || v.status === 'attention'
  )

  const pendingVehicles = workshopVehicles.filter(
    (v) => v.status === 'critical' || v.status === 'attention'
  )
  const inProgressVehicles = workshopVehicles.filter((v) => v.status === 'in_workshop')
  const completedToday = mockServiceHistory.filter(
    (s) => new Date(s.date).toDateString() === new Date().toDateString()
  )

  const filteredVehicles = (
    activeTab === 'pending'
      ? pendingVehicles
      : activeTab === 'in_progress'
        ? inProgressVehicles
        : []
  ).filter(
    (v) =>
      v.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.brand.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleStartRepair = (vehicle: Vehicle) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicle.id ? { ...v, status: 'in_workshop' as VehicleStatus } : v))
    )
  }

  const handleCompleteRepair = (vehicle: Vehicle) => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === vehicle.id
          ? { ...v, status: 'operational' as VehicleStatus, health: 95, alerts: [] }
          : v
      )
    )
    setDetailModalOpen(false)
    setSelectedVehicle(null)
  }

  const handleViewDetail = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    setDetailModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Taller AutoCam"
        subtitle="Gestion de reparaciones"
      />

      <main className="p-4 md:p-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Hola, {currentUser?.name?.split(' ')[0]}
          </h2>
          <p className="text-muted-foreground">
            Tienes {pendingVehicles.length} vehiculo{pendingVehicles.length !== 1 ? 's' : ''} esperando diagnostico.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-attention">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-attention/10">
                <Clock className="h-6 w-6 text-attention" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingVehicles.length}</p>
                <p className="text-sm text-muted-foreground">Pendientes</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blocked">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blocked/10">
                <Wrench className="h-6 w-6 text-blocked" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{inProgressVehicles.length}</p>
                <p className="text-sm text-muted-foreground">En proceso</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-operational">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-operational/10">
                <CheckCircle2 className="h-6 w-6 text-operational" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{workshopStats.completedToday}</p>
                <p className="text-sm text-muted-foreground">Completados hoy</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  ${(workshopStats.weeklyRevenue / 1000).toFixed(0)}k
                </p>
                <p className="text-sm text-muted-foreground">Facturado esta semana</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as WorkshopTab)}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <TabsList>
                  <TabsTrigger value="pending" className="gap-2">
                    <Clock className="h-4 w-4" />
                    Pendientes
                    {pendingVehicles.length > 0 && (
                      <span className="ml-1 rounded-full bg-attention/20 px-2 py-0.5 text-xs font-medium text-attention">
                        {pendingVehicles.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="in_progress" className="gap-2">
                    <Wrench className="h-4 w-4" />
                    En Proceso
                    {inProgressVehicles.length > 0 && (
                      <span className="ml-1 rounded-full bg-blocked/20 px-2 py-0.5 text-xs font-medium text-blocked">
                        {inProgressVehicles.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Historial
                  </TabsTrigger>
                </TabsList>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar vehiculo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 sm:w-64"
                  />
                </div>
              </div>

              <TabsContent value="pending" className="mt-6 space-y-4">
                {filteredVehicles.length > 0 ? (
                  filteredVehicles.map((vehicle) => (
                    <Card key={vehicle.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="flex-1 p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-foreground">{vehicle.plate}</h3>
                                  <StatusBadge status={vehicle.status} size="sm" />
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {vehicle.brand} {vehicle.model} ({vehicle.year})
                                </p>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-xs text-muted-foreground mb-1">Estado de salud</p>
                              <HealthIndicator value={vehicle.health} showLabel />
                            </div>
                            {vehicle.alerts.length > 0 && (
                              <div className="mt-3 space-y-2">
                                <p className="text-xs font-medium text-muted-foreground">Alertas reportadas:</p>
                                {vehicle.alerts.map((alert) => (
                                  <div
                                    key={alert.id}
                                    className="flex items-start gap-2 rounded-lg bg-critical/5 p-2"
                                  >
                                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-critical" />
                                    <div>
                                      <p className="text-sm font-medium text-foreground">{alert.type}</p>
                                      <p className="text-xs text-muted-foreground">{alert.message}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-border bg-secondary/50 p-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetail(vehicle)}
                            >
                              Ver detalle
                            </Button>
                            <Button size="sm" onClick={() => handleStartRepair(vehicle)}>
                              Iniciar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <CheckCircle2 className="mb-4 h-12 w-12 text-operational/50" />
                      <p className="font-medium text-foreground">No hay vehiculos pendientes</p>
                      <p className="text-sm text-muted-foreground">
                        Todos los vehiculos han sido atendidos
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="in_progress" className="mt-6 space-y-4">
                {filteredVehicles.length > 0 ? (
                  filteredVehicles.map((vehicle) => (
                    <Card key={vehicle.id} className="overflow-hidden border-blocked/50">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="flex-1 p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-foreground">{vehicle.plate}</h3>
                                  <StatusBadge status={vehicle.status} size="sm" />
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {vehicle.brand} {vehicle.model} ({vehicle.year})
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                              <div className="rounded-lg bg-secondary p-3">
                                <p className="text-xs text-muted-foreground">Mecanico asignado</p>
                                <p className="font-medium text-foreground">Miguel Torres</p>
                              </div>
                              <div className="rounded-lg bg-secondary p-3">
                                <p className="text-xs text-muted-foreground">Tiempo estimado</p>
                                <p className="font-medium text-foreground">2 dias</p>
                              </div>
                            </div>
                            <div className="mt-4">
                              <p className="text-xs text-muted-foreground mb-2">Progreso de reparacion</p>
                              <div className="h-2 overflow-hidden rounded-full bg-muted">
                                <div className="h-full w-3/5 rounded-full bg-blocked" />
                              </div>
                              <p className="mt-1 text-xs text-muted-foreground">60% completado</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 border-t sm:border-t-0 sm:border-l border-border bg-secondary/50 p-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2 bg-transparent"
                              onClick={() => handleViewDetail(vehicle)}
                            >
                              <FileText className="h-4 w-4" />
                              Actualizar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2 bg-transparent"
                            >
                              <Camera className="h-4 w-4" />
                              Foto
                            </Button>
                            <Button
                              size="sm"
                              className="gap-2"
                              onClick={() => handleCompleteRepair(vehicle)}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Finalizar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Wrench className="mb-4 h-12 w-12 text-muted-foreground/50" />
                      <p className="font-medium text-foreground">No hay reparaciones en curso</p>
                      <p className="text-sm text-muted-foreground">
                        Los vehiculos en proceso apareceran aqui
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="completed" className="mt-6 space-y-4">
                {mockServiceHistory.slice(0, 5).map((service) => {
                  const vehicle = vehicles.find((v) => v.id === service.vehicleId)
                  return (
                    <Card key={service.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">
                                {vehicle?.plate || 'N/A'}
                              </h3>
                              <span className="rounded-full bg-operational/20 px-2 py-0.5 text-xs font-medium text-operational">
                                Completado
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {vehicle?.brand} {vehicle?.model}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(service.date).toLocaleDateString('es-AR')}
                          </p>
                        </div>
                        <div className="mt-3 rounded-lg bg-secondary p-3">
                          <p className="text-sm font-medium text-foreground">{service.type}</p>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="h-4 w-4" />
                            {service.mechanic}
                          </div>
                          <p className="font-medium text-foreground">
                            ${service.cost.toLocaleString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="h-4 w-4" />
                  Rendimiento del Taller
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tiempo promedio</span>
                  <span className="font-medium text-foreground">{workshopStats.avgRepairTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Satisfaccion</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-attention text-attention" />
                    <span className="font-medium text-foreground">{workshopStats.customerSatisfaction}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Vehiculos atendidos (mes)</span>
                  <span className="font-medium text-foreground">24</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Clock className="h-4 w-4" />
                  Actividad Reciente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'Reparacion completada', vehicle: 'AB 123 CD', time: 'Hace 2h' },
                    { action: 'Diagnostico iniciado', vehicle: 'EF 456 GH', time: 'Hace 4h' },
                    { action: 'Presupuesto aprobado', vehicle: 'IJ 789 KL', time: 'Ayer' },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">{activity.vehicle}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
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
                  <Plus className="h-4 w-4" />
                  Nuevo ingreso manual
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <MessageSquare className="h-4 w-4" />
                  Contactar cliente
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <Calendar className="h-4 w-4" />
                  Ver agenda
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Vehicle Detail Modal */}
      <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalle del Vehiculo</DialogTitle>
            <DialogDescription>
              {selectedVehicle?.plate} - {selectedVehicle?.brand} {selectedVehicle?.model}
            </DialogDescription>
          </DialogHeader>
          {selectedVehicle && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Estado actual</p>
                  <StatusBadge status={selectedVehicle.status} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Salud</p>
                  <p className="font-semibold text-foreground">{selectedVehicle.health}%</p>
                </div>
              </div>

              {selectedVehicle.alerts.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Alertas</p>
                  <div className="space-y-2">
                    {selectedVehicle.alerts.map((alert) => (
                      <div key={alert.id} className="rounded-lg bg-critical/5 p-3">
                        <p className="text-sm font-medium text-critical">{alert.type}</p>
                        <p className="text-xs text-muted-foreground">{alert.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <Label htmlFor="diagnostic">Notas de diagnostico</Label>
                  <Textarea
                    id="diagnostic"
                    placeholder="Describe el diagnostico y las reparaciones necesarias..."
                    value={diagnosticNote}
                    onChange={(e) => setDiagnosticNote(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="cost">Costo estimado</Label>
                    <Input
                      id="cost"
                      placeholder="$0"
                      value={estimatedCost}
                      onChange={(e) => setEstimatedCost(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Tiempo estimado</Label>
                    <Select value={estimatedTime} onValueChange={setEstimatedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1d">1 dia</SelectItem>
                        <SelectItem value="2d">2 dias</SelectItem>
                        <SelectItem value="3d">3 dias</SelectItem>
                        <SelectItem value="1w">1 semana</SelectItem>
                        <SelectItem value="2w">2 semanas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setDetailModalOpen(false)}
                >
                  Cancelar
                </Button>
                {selectedVehicle.status === 'in_workshop' ? (
                  <Button className="flex-1 gap-2" onClick={() => handleCompleteRepair(selectedVehicle)}>
                    <CheckCircle2 className="h-4 w-4" />
                    Finalizar reparacion
                  </Button>
                ) : (
                  <Button className="flex-1 gap-2" onClick={() => {
                    handleStartRepair(selectedVehicle)
                    setDetailModalOpen(false)
                  }}>
                    <ArrowRight className="h-4 w-4" />
                    Iniciar reparacion
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
