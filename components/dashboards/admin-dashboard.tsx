'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardHeader } from '@/components/shared/dashboard-header'
import { StatusBadge } from '@/components/shared/status-badge'
import { HealthIndicator } from '@/components/shared/health-indicator'
import { useApp } from '@/lib/app-context'
import { fleetStats, workshopStats, mockUsers } from '@/lib/mock-data'
import {
  Truck,
  Building2,
  Users,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wrench,
  Search,
  Plus,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'

type AdminTab = 'overview' | 'companies' | 'users' | 'reports'

interface Company {
  id: string
  name: string
  vehicles: number
  activeAlerts: number
  health: number
  monthlySpend: number
}

const mockCompanies: Company[] = [
  { id: '1', name: 'Transportes Mendez S.A.', vehicles: 6, activeAlerts: 3, health: 71, monthlySpend: 485000 },
  { id: '2', name: 'Logistica del Sur', vehicles: 12, activeAlerts: 1, health: 85, monthlySpend: 890000 },
  { id: '3', name: 'Distribuidora Norte', vehicles: 8, activeAlerts: 5, health: 58, monthlySpend: 620000 },
  { id: '4', name: 'Fletes Rapidos', vehicles: 4, activeAlerts: 0, health: 92, monthlySpend: 280000 },
]

export function AdminDashboard() {
  const { vehicles, currentUser } = useApp()
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')
  const [searchQuery, setSearchQuery] = useState('')

  const totalVehicles = mockCompanies.reduce((acc, c) => acc + c.vehicles, 0)
  const totalAlerts = mockCompanies.reduce((acc, c) => acc + c.activeAlerts, 0)
  const totalRevenue = mockCompanies.reduce((acc, c) => acc + c.monthlySpend, 0)
  const avgHealth = Math.round(mockCompanies.reduce((acc, c) => acc + c.health, 0) / mockCompanies.length)

  const filteredCompanies = mockCompanies.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Panel de Administracion" subtitle="Sistema AutoCam" />

      <main className="p-4 md:p-6">
        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Vista General del Sistema</h2>
          <p className="text-muted-foreground">
            Monitorea todas las empresas y vehiculos de la plataforma.
          </p>
        </div>

        {/* Top Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockCompanies.length}</p>
                <p className="text-sm text-muted-foreground">Empresas activas</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-1/10">
                <Truck className="h-6 w-6 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalVehicles}</p>
                <p className="text-sm text-muted-foreground">Vehiculos totales</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-critical/10">
                <AlertTriangle className="h-6 w-6 text-critical" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalAlerts}</p>
                <p className="text-sm text-muted-foreground">Alertas activas</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-operational/10">
                <DollarSign className="h-6 w-6 text-operational" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  ${(totalRevenue / 1000000).toFixed(1)}M
                </p>
                <p className="text-sm text-muted-foreground">Facturacion mensual</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AdminTab)}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <TabsList>
              <TabsTrigger value="overview" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Resumen
              </TabsTrigger>
              <TabsTrigger value="companies" className="gap-2">
                <Building2 className="h-4 w-4" />
                Empresas
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2">
                <Users className="h-4 w-4" />
                Usuarios
              </TabsTrigger>
              <TabsTrigger value="reports" className="gap-2">
                <PieChart className="h-4 w-4" />
                Reportes
              </TabsTrigger>
            </TabsList>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:w-64"
              />
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main Stats */}
              <div className="lg:col-span-2 space-y-6">
                {/* Performance Cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between text-base">
                        <span>Salud Promedio</span>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-foreground">{avgHealth}%</span>
                        <span className="flex items-center text-sm text-operational">
                          <ArrowUpRight className="h-4 w-4" />
                          +3%
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">vs mes anterior</p>
                      <div className="mt-4">
                        <HealthIndicator value={avgHealth} size="lg" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between text-base">
                        <span>Tiempo de Reparacion</span>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-foreground">2.3</span>
                        <span className="text-lg text-muted-foreground">dias</span>
                        <span className="flex items-center text-sm text-operational">
                          <ArrowDownRight className="h-4 w-4" />
                          -15%
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">promedio de resolucion</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Fleet Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Distribucion de Estados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-4">
                      {[
                        { label: 'Operativos', value: 21, color: 'bg-operational', percent: 70 },
                        { label: 'Atencion', value: 5, color: 'bg-attention', percent: 17 },
                        { label: 'Criticos', value: 2, color: 'bg-critical', percent: 6 },
                        { label: 'En Taller', value: 2, color: 'bg-blocked', percent: 7 },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center">
                          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                            <span className="text-xl font-bold text-foreground">{stat.value}</span>
                          </div>
                          <p className="text-sm font-medium text-foreground">{stat.label}</p>
                          <p className="text-xs text-muted-foreground">{stat.percent}%</p>
                          <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                            <div className={`h-full ${stat.color}`} style={{ width: `${stat.percent}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Monthly Comparison */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Comparativa Mensual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Enero', 'Diciembre', 'Noviembre'].map((month, i) => {
                        const revenue = [2275000, 2180000, 1950000][i]
                        const maxRevenue = 2275000
                        return (
                          <div key={month} className="flex items-center gap-4">
                            <span className="w-20 text-sm text-muted-foreground">{month}</span>
                            <div className="flex-1">
                              <div className="h-8 overflow-hidden rounded-lg bg-secondary">
                                <div
                                  className="h-full bg-primary/80 transition-all"
                                  style={{ width: `${(revenue / maxRevenue) * 100}%` }}
                                />
                              </div>
                            </div>
                            <span className="w-24 text-right text-sm font-medium text-foreground">
                              ${(revenue / 1000000).toFixed(2)}M
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Top Alerts */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <AlertTriangle className="h-4 w-4 text-critical" />
                      Alertas Recientes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { company: 'Distribuidora Norte', vehicle: 'IJ 789 KL', type: 'Motor', time: '2h' },
                        { company: 'Transportes Mendez', vehicle: 'EF 456 GH', type: 'Frenos', time: '4h' },
                        { company: 'Distribuidora Norte', vehicle: 'XY 123 ZW', type: 'Aceite', time: '6h' },
                      ].map((alert, i) => (
                        <div key={i} className="flex items-start gap-3 rounded-lg bg-secondary p-3">
                          <div className="mt-1 h-2 w-2 rounded-full bg-critical" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{alert.company}</p>
                            <p className="text-xs text-muted-foreground">
                              {alert.vehicle} - {alert.type}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">Hace {alert.time}</span>
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
                      Nueva empresa
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                      <Users className="h-4 w-4" />
                      Agregar usuario
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                      <Settings className="h-4 w-4" />
                      Configuracion
                    </Button>
                  </CardContent>
                </Card>

                {/* System Health */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Estado del Sistema</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: 'API', status: 'online' },
                        { name: 'Base de datos', status: 'online' },
                        { name: 'Notificaciones', status: 'online' },
                        { name: 'AI Service', status: 'online' },
                      ].map((service) => (
                        <div key={service.name} className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{service.name}</span>
                          <span className="flex items-center gap-1.5 text-xs font-medium text-operational">
                            <span className="h-2 w-2 rounded-full bg-operational" />
                            Online
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="companies" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                Empresas Registradas ({filteredCompanies.length})
              </h3>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nueva Empresa
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {filteredCompanies.map((company) => (
                <Card key={company.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">{company.name}</h4>
                          <p className="text-sm text-muted-foreground">{company.vehicles} vehiculos</p>
                        </div>
                        {company.activeAlerts > 0 ? (
                          <span className="flex items-center gap-1 rounded-full bg-critical/20 px-2 py-1 text-xs font-medium text-critical">
                            <AlertTriangle className="h-3 w-3" />
                            {company.activeAlerts}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 rounded-full bg-operational/20 px-2 py-1 text-xs font-medium text-operational">
                            <CheckCircle2 className="h-3 w-3" />
                            OK
                          </span>
                        )}
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Salud promedio</span>
                          <span className="font-medium text-foreground">{company.health}%</span>
                        </div>
                        <HealthIndicator value={company.health} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-border bg-secondary/50 px-4 py-3">
                      <span className="text-sm text-muted-foreground">
                        ${company.monthlySpend.toLocaleString()}/mes
                      </span>
                      <Button variant="ghost" size="sm">
                        Ver detalle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                Usuarios del Sistema ({filteredUsers.length})
              </h3>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nuevo Usuario
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                          <span className="text-sm font-medium text-foreground">
                            {user.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            user.role === 'admin'
                              ? 'bg-primary/20 text-primary'
                              : user.role === 'client'
                                ? 'bg-chart-1/20 text-chart-1'
                                : user.role === 'workshop'
                                  ? 'bg-attention/20 text-attention'
                                  : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {user.role === 'admin'
                            ? 'Admin'
                            : user.role === 'client'
                              ? 'Cliente'
                              : user.role === 'workshop'
                                ? 'Taller'
                                : 'Conductor'}
                        </span>
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tipos de Fallas (Ultimo Mes)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: 'Frenos', count: 12, percent: 35 },
                      { type: 'Motor', count: 8, percent: 23 },
                      { type: 'Transmision', count: 6, percent: 18 },
                      { type: 'Sistema Electrico', count: 5, percent: 15 },
                      { type: 'Otros', count: 3, percent: 9 },
                    ].map((item) => (
                      <div key={item.type} className="flex items-center gap-4">
                        <span className="w-32 text-sm text-muted-foreground">{item.type}</span>
                        <div className="flex-1">
                          <div className="h-6 overflow-hidden rounded-lg bg-secondary">
                            <div
                              className="h-full bg-primary/80"
                              style={{ width: `${item.percent}%` }}
                            />
                          </div>
                        </div>
                        <span className="w-16 text-right text-sm font-medium text-foreground">
                          {item.count} ({item.percent}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Costos por Empresa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCompanies
                      .sort((a, b) => b.monthlySpend - a.monthlySpend)
                      .map((company) => {
                        const maxSpend = Math.max(...mockCompanies.map((c) => c.monthlySpend))
                        return (
                          <div key={company.id} className="flex items-center gap-4">
                            <span className="w-40 truncate text-sm text-muted-foreground">
                              {company.name}
                            </span>
                            <div className="flex-1">
                              <div className="h-6 overflow-hidden rounded-lg bg-secondary">
                                <div
                                  className="h-full bg-chart-1/80"
                                  style={{ width: `${(company.monthlySpend / maxSpend) * 100}%` }}
                                />
                              </div>
                            </div>
                            <span className="w-24 text-right text-sm font-medium text-foreground">
                              ${(company.monthlySpend / 1000).toFixed(0)}k
                            </span>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Exportar Reportes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                    <BarChart3 className="h-6 w-6" />
                    <span>Reporte General</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                    <DollarSign className="h-6 w-6" />
                    <span>Reporte Financiero</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                    <Wrench className="h-6 w-6" />
                    <span>Reporte de Fallas</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
