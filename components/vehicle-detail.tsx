'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DashboardHeader } from '@/components/shared/dashboard-header'
import { StatusBadge } from '@/components/shared/status-badge'
import { HealthCircle, HealthIndicator } from '@/components/shared/health-indicator'
import { useApp } from '@/lib/app-context'
import { mockServiceHistory } from '@/lib/mock-data'
import {
  ArrowLeft,
  Truck,
  AlertTriangle,
  Calendar,
  Gauge,
  User,
  Wrench,
  DollarSign,
  FileText,
  MessageSquare,
  CheckCircle2,
  Clock,
  Download,
  Phone,
  Sparkles,
} from 'lucide-react'

type DetailTab = 'overview' | 'history' | 'diagnostics'

export function VehicleDetail() {
  const { vehicles, selectedVehicleId, setCurrentView, currentRole } = useApp()
  const [activeTab, setActiveTab] = useState<DetailTab>('overview')
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [aiDiagnosticOpen, setAiDiagnosticOpen] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)

  const vehicle = vehicles.find((v) => v.id === selectedVehicleId)
  const serviceHistory = mockServiceHistory.filter((s) => s.vehicleId === selectedVehicleId)

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

  const handleAIDiagnosis = () => {
    setAiDiagnosticOpen(true)
    setAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setAnalyzing(false)
      setAiAnalysis(`
**Analisis de Diagnostico - ${vehicle?.plate}**

Basado en los datos del vehiculo y el historial de mantenimiento, se detectaron los siguientes puntos:

**Estado General:** ${vehicle?.health}% de salud

**Alertas Activas:**
${vehicle?.alerts.map((a) => `- ${a.type}: ${a.message}`).join('\n') || '- Sin alertas activas'}

**Recomendaciones:**
1. ${vehicle?.health && vehicle.health < 50 ? 'Urgente: Programar revision inmediata del sistema indicado en alertas.' : 'Continuar con el plan de mantenimiento preventivo.'}
2. Proximo service recomendado: ${vehicle?.nextService}
3. Verificar nivel de fluidos en la proxima parada.

**Prediccion de Fallas:**
- Probabilidad de falla en los proximos 30 dias: ${vehicle?.health && vehicle.health < 60 ? 'ALTA' : vehicle?.health && vehicle.health < 80 ? 'MEDIA' : 'BAJA'}
- Componentes a monitorear: Sistema de frenos, niveles de aceite

**Costo Estimado de Mantenimiento:**
- Mantenimiento preventivo: $85,000 - $120,000
- Reparaciones pendientes: ${vehicle?.alerts.length ? '$150,000 - $280,000' : 'N/A'}
      `)
    }, 2500)
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader title="Detalle del Vehiculo" />
        <main className="flex items-center justify-center p-6">
          <Card className="max-w-md">
            <CardContent className="flex flex-col items-center py-12">
              <Truck className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="font-medium text-foreground">Vehiculo no encontrado</p>
              <Button className="mt-4" onClick={handleBack}>
                Volver al dashboard
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  const totalCost = serviceHistory.reduce((acc, s) => acc + s.cost, 0)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Detalle del Vehiculo" />

      <main className="p-4 md:p-6">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4 gap-2" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>

        {/* Vehicle Header */}
        <Card className="mb-6 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-primary/10 to-chart-1/10 p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-card shadow-lg">
                    <Truck className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl font-bold text-foreground">{vehicle.plate}</h1>
                      <StatusBadge status={vehicle.status} size="lg" />
                    </div>
                    <p className="text-lg text-muted-foreground">
                      {vehicle.brand} {vehicle.model} ({vehicle.year})
                    </p>
                    {vehicle.driver && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        Conductor: {vehicle.driver}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <HealthCircle value={vehicle.health} size={100} />
                  <div className="space-y-2">
                    <Button className="w-full gap-2" onClick={handleAIDiagnosis}>
                      <Sparkles className="h-4 w-4" />
                      Diagnostico IA
                    </Button>
                    <Button variant="outline" className="w-full gap-2 bg-transparent">
                      <Download className="h-4 w-4" />
                      Descargar Reporte
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
              <div className="flex flex-col items-center gap-1 bg-card p-4">
                <Gauge className="h-5 w-5 text-muted-foreground" />
                <p className="text-lg font-semibold text-foreground">
                  {vehicle.mileage.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Kilometros</p>
              </div>
              <div className="flex flex-col items-center gap-1 bg-card p-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <p className="text-lg font-semibold text-foreground">
                  {new Date(vehicle.lastService).toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </p>
                <p className="text-xs text-muted-foreground">Ultimo Service</p>
              </div>
              <div className="flex flex-col items-center gap-1 bg-card p-4">
                <Wrench className="h-5 w-5 text-muted-foreground" />
                <p className="text-lg font-semibold text-foreground">{serviceHistory.length}</p>
                <p className="text-xs text-muted-foreground">Servicios</p>
              </div>
              <div className="flex flex-col items-center gap-1 bg-card p-4">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <p className="text-lg font-semibold text-foreground">
                  ${(totalCost / 1000).toFixed(0)}k
                </p>
                <p className="text-xs text-muted-foreground">Total Invertido</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts Section */}
        {vehicle.alerts.length > 0 && (
          <Card className="mb-6 border-critical/50 bg-critical/5">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base text-critical">
                <AlertTriangle className="h-5 w-5" />
                Alertas Activas ({vehicle.alerts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {vehicle.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start justify-between rounded-lg bg-card p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-1 h-2 w-2 rounded-full ${
                          alert.severity === 'critical'
                            ? 'bg-critical'
                            : alert.severity === 'high'
                              ? 'bg-attention'
                              : 'bg-chart-4'
                        }`}
                      />
                      <div>
                        <p className="font-medium text-foreground">{alert.type}</p>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(alert.timestamp).toLocaleString('es-AR')}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        alert.severity === 'critical'
                          ? 'bg-critical/20 text-critical'
                          : alert.severity === 'high'
                            ? 'bg-attention/20 text-attention'
                            : 'bg-chart-4/20 text-chart-4'
                      }`}
                    >
                      {alert.severity === 'critical'
                        ? 'Critico'
                        : alert.severity === 'high'
                          ? 'Alto'
                          : 'Medio'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setContactModalOpen(true)}>
                  <Phone className="h-4 w-4" />
                  Contactar Taller
                </Button>
                <Button className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Autorizar Reparacion
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as DetailTab)}>
          <TabsList>
            <TabsTrigger value="overview" className="gap-2">
              <FileText className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="h-4 w-4" />
              Historial
            </TabsTrigger>
            <TabsTrigger value="diagnostics" className="gap-2">
              <Wrench className="h-4 w-4" />
              Componentes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Vehicle Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Informacion del Vehiculo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Marca</p>
                      <p className="font-medium text-foreground">{vehicle.brand}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Modelo</p>
                      <p className="font-medium text-foreground">{vehicle.model}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Ano</p>
                      <p className="font-medium text-foreground">{vehicle.year}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Patente</p>
                      <p className="font-medium text-foreground">{vehicle.plate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Kilometraje</p>
                      <p className="font-medium text-foreground">
                        {vehicle.mileage.toLocaleString()} km
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Conductor</p>
                      <p className="font-medium text-foreground">{vehicle.driver || 'Sin asignar'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Maintenance Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Proximos Mantenimientos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        type: 'Service General',
                        date: vehicle.nextService,
                        priority: 'normal',
                      },
                      {
                        type: 'Cambio de Aceite',
                        date: '2026-02-15',
                        priority: 'normal',
                      },
                      {
                        type: 'Revision de Frenos',
                        date: '2026-03-01',
                        priority: vehicle.health < 70 ? 'high' : 'normal',
                      },
                    ].map((item, i) => {
                      const daysUntil = Math.ceil(
                        (new Date(item.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                      )
                      return (
                        <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                          <div className="flex items-center gap-3">
                            <Calendar
                              className={`h-5 w-5 ${
                                item.priority === 'high' ? 'text-critical' : 'text-muted-foreground'
                              }`}
                            />
                            <div>
                              <p className="text-sm font-medium text-foreground">{item.type}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(item.date).toLocaleDateString('es-AR')}
                              </p>
                            </div>
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
                                : `En ${daysUntil} dias`}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <MessageSquare className="h-4 w-4" />
                    Notas y Comentarios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Agrega notas sobre este vehiculo..."
                    rows={3}
                    className="mb-3"
                  />
                  <Button size="sm">Guardar Nota</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Historial de Servicios</CardTitle>
              </CardHeader>
              <CardContent>
                {serviceHistory.length > 0 ? (
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                    <div className="space-y-6">
                      {serviceHistory.map((service, i) => (
                        <div key={service.id} className="relative pl-10">
                          <div className="absolute left-2.5 top-1 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                          <div className="rounded-lg border border-border p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-foreground">{service.type}</p>
                                <p className="text-sm text-muted-foreground">
                                  {service.description}
                                </p>
                              </div>
                              <p className="text-sm font-medium text-foreground">
                                ${service.cost.toLocaleString()}
                              </p>
                            </div>
                            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                              <span>
                                {new Date(service.date).toLocaleDateString('es-AR', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </span>
                              <span>{service.workshop}</span>
                              <span>Mecanico: {service.mechanic}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8">
                    <Clock className="mb-2 h-10 w-10 text-muted-foreground/50" />
                    <p className="text-muted-foreground">Sin historial de servicios</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diagnostics" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { name: 'Motor', health: 85 },
                { name: 'Transmision', health: 92 },
                { name: 'Frenos', health: vehicle.health < 70 ? 45 : 78 },
                { name: 'Suspension', health: 88 },
                { name: 'Sistema Electrico', health: 95 },
                { name: 'Neumaticos', health: 72 },
              ].map((component) => (
                <Card key={component.name}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-foreground">{component.name}</h4>
                      <span
                        className={`text-sm font-medium ${
                          component.health >= 80
                            ? 'text-operational'
                            : component.health >= 50
                              ? 'text-attention'
                              : 'text-critical'
                        }`}
                      >
                        {component.health}%
                      </span>
                    </div>
                    <HealthIndicator value={component.health} />
                    {component.health < 60 && (
                      <p className="mt-2 text-xs text-critical">Requiere atencion</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Contact Modal */}
      <Dialog open={contactModalOpen} onOpenChange={setContactModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Contactar Taller</DialogTitle>
            <DialogDescription>
              Comunicate con el taller para coordinar la reparacion.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-4">
            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 bg-transparent">
              <Phone className="h-5 w-5" />
              <div className="text-left">
                <p className="font-medium">Llamar</p>
                <p className="text-xs text-muted-foreground">+54 11 5555-0123</p>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 bg-transparent">
              <MessageSquare className="h-5 w-5" />
              <div className="text-left">
                <p className="font-medium">WhatsApp</p>
                <p className="text-xs text-muted-foreground">Enviar mensaje</p>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Diagnostic Modal */}
      <Dialog open={aiDiagnosticOpen} onOpenChange={setAiDiagnosticOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Diagnostico con Inteligencia Artificial
            </DialogTitle>
            <DialogDescription>
              Analisis predictivo basado en el historial y estado actual del vehiculo.
            </DialogDescription>
          </DialogHeader>
          {analyzing ? (
            <div className="flex flex-col items-center py-12">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="font-medium text-foreground">Analizando datos del vehiculo...</p>
              <p className="text-sm text-muted-foreground">Esto puede tomar unos segundos</p>
            </div>
          ) : aiAnalysis ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap rounded-lg bg-secondary p-4 text-sm">
                {aiAnalysis}
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
