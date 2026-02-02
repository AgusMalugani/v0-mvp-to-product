'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DashboardHeader } from '@/components/shared/dashboard-header'
import { StatusBadge } from '@/components/shared/status-badge'
import { HealthCircle } from '@/components/shared/health-indicator'
import { useApp } from '@/lib/app-context'
import {
  Truck,
  AlertTriangle,
  CheckCircle2,
  Camera,
  Send,
  MapPin,
  Fuel,
  Gauge,
  Calendar,
  Clock,
  Phone,
  MessageSquare,
  FileText,
  ThermometerSun,
} from 'lucide-react'

interface ChecklistItem {
  id: string
  label: string
  category: string
  checked: boolean
}

const initialChecklist: ChecklistItem[] = [
  { id: '1', label: 'Nivel de aceite verificado', category: 'Motor', checked: false },
  { id: '2', label: 'Nivel de refrigerante OK', category: 'Motor', checked: false },
  { id: '3', label: 'Luces funcionando correctamente', category: 'Luces', checked: false },
  { id: '4', label: 'Frenos respondiendo bien', category: 'Frenos', checked: false },
  { id: '5', label: 'Presion de neumaticos correcta', category: 'Neumaticos', checked: false },
  { id: '6', label: 'Sin ruidos anormales', category: 'General', checked: false },
  { id: '7', label: 'Cinturon de seguridad funcional', category: 'Seguridad', checked: false },
  { id: '8', label: 'Espejos ajustados', category: 'General', checked: false },
]

export function DriverDashboard() {
  const { vehicles, currentUser, setVehicles } = useApp()
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [reportDescription, setReportDescription] = useState('')
  const [reportSubmitted, setReportSubmitted] = useState(false)

  // Get the driver's assigned vehicle (first operational one for demo)
  const assignedVehicle = vehicles.find((v) => v.driver === 'Roberto Sanchez') || vehicles[0]

  const completedItems = checklist.filter((item) => item.checked).length
  const checklistProgress = Math.round((completedItems / checklist.length) * 100)

  const handleCheckItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    )
  }

  const handleSubmitReport = () => {
    // In a real app, this would send to backend
    setReportSubmitted(true)
    setTimeout(() => {
      setReportModalOpen(false)
      setReportSubmitted(false)
      setReportDescription('')
    }, 2000)
  }

  const handleCompleteChecklist = () => {
    // Mark all items as checked and update vehicle health
    setChecklist((prev) => prev.map((item) => ({ ...item, checked: true })))
    if (assignedVehicle) {
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === assignedVehicle.id ? { ...v, health: Math.min(100, v.health + 2) } : v
        )
      )
    }
  }

  const groupedChecklist = checklist.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, ChecklistItem[]>
  )

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Panel del Conductor" subtitle={currentUser?.name} />

      <main className="p-4 md:p-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Hola, {currentUser?.name?.split(' ')[0]}
          </h2>
          <p className="text-muted-foreground">Tu vehiculo asignado esta listo para el viaje.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Vehicle Status Card */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-primary/10 to-chart-1/10 p-6">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-lg">
                        <Truck className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-foreground">
                            {assignedVehicle?.plate}
                          </h3>
                          <StatusBadge status={assignedVehicle?.status || 'operational'} />
                        </div>
                        <p className="text-muted-foreground">
                          {assignedVehicle?.brand} {assignedVehicle?.model}
                        </p>
                      </div>
                    </div>
                    <HealthCircle value={assignedVehicle?.health || 0} size={80} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
                  <div className="flex flex-col items-center gap-1 bg-card p-4">
                    <Gauge className="h-5 w-5 text-muted-foreground" />
                    <p className="text-lg font-semibold text-foreground">
                      {assignedVehicle?.mileage.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Kilometros</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 bg-card p-4">
                    <Fuel className="h-5 w-5 text-muted-foreground" />
                    <p className="text-lg font-semibold text-foreground">75%</p>
                    <p className="text-xs text-muted-foreground">Combustible</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 bg-card p-4">
                    <ThermometerSun className="h-5 w-5 text-muted-foreground" />
                    <p className="text-lg font-semibold text-foreground">Normal</p>
                    <p className="text-xs text-muted-foreground">Temperatura</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 bg-card p-4">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <p className="text-lg font-semibold text-foreground">45 dias</p>
                    <p className="text-xs text-muted-foreground">Prox. Service</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <Card className="border-critical/30 bg-critical/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-critical/20">
                    <AlertTriangle className="h-5 w-5 text-critical" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Reportar Problema</p>
                    <p className="text-xs text-muted-foreground">
                      Notifica al taller inmediatamente
                    </p>
                  </div>
                </div>
                <Button
                  className="mt-3 w-full gap-2"
                  variant="destructive"
                  onClick={() => setReportModalOpen(true)}
                >
                  <AlertTriangle className="h-4 w-4" />
                  Reportar Ahora
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-2 p-4">
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <Phone className="h-4 w-4" />
                  Llamar al taller
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <MessageSquare className="h-4 w-4" />
                  Chat con soporte
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <MapPin className="h-4 w-4" />
                  Ver taller cercano
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Daily Checklist */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Checklist Pre-Viaje
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {completedItems}/{checklist.length}
                  </p>
                  <p className="text-xs text-muted-foreground">completados</p>
                </div>
                <div className="h-10 w-10">
                  <svg className="rotate-[-90deg]" viewBox="0 0 36 36">
                    <circle
                      className="text-muted"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="transparent"
                      r="16"
                      cx="18"
                      cy="18"
                    />
                    <circle
                      className={checklistProgress === 100 ? 'text-operational' : 'text-primary'}
                      strokeWidth="3"
                      strokeDasharray={`${checklistProgress}, 100`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="16"
                      cx="18"
                      cy="18"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(groupedChecklist).map(([category, items]) => (
                <div key={category}>
                  <h4 className="mb-3 text-sm font-semibold text-muted-foreground">{category}</h4>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <label
                        key={item.id}
                        className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:bg-secondary"
                      >
                        <Checkbox
                          checked={item.checked}
                          onCheckedChange={() => handleCheckItem(item.id)}
                        />
                        <span
                          className={`text-sm ${
                            item.checked ? 'text-muted-foreground line-through' : 'text-foreground'
                          }`}
                        >
                          {item.label}
                        </span>
                        {item.checked && (
                          <CheckCircle2 className="ml-auto h-4 w-4 text-operational" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setChecklist(initialChecklist)}
                disabled={completedItems === 0}
              >
                Reiniciar checklist
              </Button>
              <Button
                onClick={handleCompleteChecklist}
                disabled={checklistProgress === 100}
                className="gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                {checklistProgress === 100 ? 'Checklist completo' : 'Marcar todo como OK'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4" />
              Mis Reportes Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  date: '28 Ene 2026',
                  type: 'Checklist completado',
                  status: 'success',
                },
                {
                  date: '25 Ene 2026',
                  type: 'Reporte de ruido en frenos',
                  status: 'resolved',
                },
                {
                  date: '20 Ene 2026',
                  type: 'Checklist completado',
                  status: 'success',
                },
              ].map((report, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="flex items-center gap-3">
                    {report.status === 'success' ? (
                      <CheckCircle2 className="h-5 w-5 text-operational" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-attention" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{report.type}</p>
                      <p className="text-xs text-muted-foreground">{report.date}</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      report.status === 'success'
                        ? 'bg-operational/20 text-operational'
                        : 'bg-attention/20 text-attention'
                    }`}
                  >
                    {report.status === 'success' ? 'Completado' : 'Resuelto'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Report Problem Modal */}
      <Dialog open={reportModalOpen} onOpenChange={setReportModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-critical" />
              Reportar Problema
            </DialogTitle>
            <DialogDescription>
              Describe el problema que detectaste. El taller sera notificado inmediatamente.
            </DialogDescription>
          </DialogHeader>
          {reportSubmitted ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-operational/20">
                <CheckCircle2 className="h-8 w-8 text-operational" />
              </div>
              <p className="text-center font-medium text-foreground">Reporte enviado con exito</p>
              <p className="text-center text-sm text-muted-foreground">
                El taller ha sido notificado y te contactara pronto.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="problem-type">Tipo de problema</Label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {['Motor', 'Frenos', 'Neumaticos', 'Luces', 'Ruidos', 'Otro'].map((type) => (
                    <Button key={type} variant="outline" size="sm" className="justify-start bg-transparent">
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="description">Descripcion</Label>
                <Textarea
                  id="description"
                  placeholder="Describe el problema con el mayor detalle posible..."
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Camera className="h-4 w-4" />
                Adjuntar foto (opcional)
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setReportModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button className="flex-1 gap-2" onClick={handleSubmitReport}>
                  <Send className="h-4 w-4" />
                  Enviar reporte
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
