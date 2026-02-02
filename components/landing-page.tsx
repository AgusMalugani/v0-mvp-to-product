'use client'

import React from "react"

import { useState } from 'react'
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
import { useApp } from '@/lib/app-context'
import {
  Truck,
  Activity,
  Shield,
  Zap,
  Clock,
  BarChart3,
  Wrench,
  Bell,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
} from 'lucide-react'

const features = [
  {
    icon: Activity,
    title: 'Monitoreo en Tiempo Real',
    description: 'Seguimiento del estado de salud de cada vehiculo de tu flota las 24 horas.',
  },
  {
    icon: Zap,
    title: 'Diagnostico con IA',
    description: 'Analisis predictivo de fallas potenciales antes de que ocurran.',
  },
  {
    icon: Bell,
    title: 'Alertas Inteligentes',
    description: 'Notificaciones instantaneas cuando un vehiculo requiere atencion.',
  },
  {
    icon: Wrench,
    title: 'Gestion de Taller',
    description: 'Coordinacion directa entre tu flota y el taller mecanico.',
  },
  {
    icon: BarChart3,
    title: 'Reportes Detallados',
    description: 'Historiales completos de mantenimiento y costos por vehiculo.',
  },
  {
    icon: Shield,
    title: 'Mantenimiento Preventivo',
    description: 'Reduce hasta un 40% los costos de reparaciones imprevistas.',
  },
]

const benefits = {
  fleet: [
    'Reduce tiempos muertos hasta un 60%',
    'Ahorra en reparaciones de emergencia',
    'Extiende la vida util de tus vehiculos',
    'Historial digital completo de cada unidad',
    'Alertas antes de que fallen los componentes',
  ],
  workshop: [
    'Recibe vehiculos con diagnostico previo',
    'Mejor planificacion de trabajos',
    'Comunicacion directa con clientes',
    'Historial completo de cada vehiculo',
    'Aumenta la confianza y fidelizacion',
  ],
}

const stats = [
  { value: '40%', label: 'Reduccion en costos de mantenimiento' },
  { value: '60%', label: 'Menos tiempos muertos' },
  { value: '2.5x', label: 'Mayor vida util de componentes' },
  { value: '24/7', label: 'Monitoreo continuo' },
]

export function LandingPage() {
  const { login } = useApp()
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    fleetSize: '',
    message: '',
  })

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setDemoModalOpen(false)
      setFormSubmitted(false)
      setDemoForm({ name: '', email: '', company: '', phone: '', fleetSize: '', message: '' })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Truck className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AutoCam</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Funcionalidades
            </a>
            <a href="#benefits" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Beneficios
            </a>
            <a href="#contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Contacto
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => setLoginModalOpen(true)}>
              Iniciar Sesion
            </Button>
            <Button onClick={() => setDemoModalOpen(true)}>
              Solicitar Demo
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-operational opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-operational" />
                </span>
                <span className="text-sm text-muted-foreground">Plataforma activa 24/7</span>
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                Detecta fallas{' '}
                <span className="text-primary">antes</span>{' '}
                de que detengan tu flota
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                Sistema inteligente de gestion y monitoreo de flotas con diagnostico predictivo mediante IA. 
                Reduce costos, evita paradas inesperadas y maximiza la disponibilidad de tus vehiculos.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" onClick={() => setDemoModalOpen(true)} className="gap-2">
                  Solicitar Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => setLoginModalOpen(true)}>
                  Ver Plataforma
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-operational" />
                  Sin instalacion
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-operational" />
                  Soporte dedicado
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-operational" />
                  Prueba gratis
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/30 to-chart-1/30 blur-3xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Estado de Flota</span>
                  <span className="text-xs text-muted-foreground">Actualizado hace 2 min</span>
                </div>
                <div className="space-y-3">
                  {[
                    { plate: 'AB 123 CD', status: 'Operativo', health: 92, color: 'bg-operational' },
                    { plate: 'EF 456 GH', status: 'Atencion', health: 68, color: 'bg-attention' },
                    { plate: 'IJ 789 KL', status: 'Critico', health: 35, color: 'bg-critical' },
                  ].map((v) => (
                    <div key={v.plate} className="flex items-center justify-between rounded-lg bg-secondary p-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full ${v.color}`} />
                        <span className="text-sm font-medium text-foreground">{v.plate}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{v.status}</span>
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                          <div className={`h-full ${v.color}`} style={{ width: `${v.health}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-operational/10 p-3 text-center">
                    <p className="text-2xl font-bold text-operational">4</p>
                    <p className="text-xs text-muted-foreground">Operativos</p>
                  </div>
                  <div className="rounded-lg bg-attention/10 p-3 text-center">
                    <p className="text-2xl font-bold text-attention">1</p>
                    <p className="text-xs text-muted-foreground">Atencion</p>
                  </div>
                  <div className="rounded-lg bg-critical/10 p-3 text-center">
                    <p className="text-2xl font-bold text-critical">1</p>
                    <p className="text-xs text-muted-foreground">Critico</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-secondary/50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Todo lo que necesitas para gestionar tu flota
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Herramientas potentes para mantener tus vehiculos en optimas condiciones
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="bg-secondary/50 py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Beneficios para todos
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              AutoCam conecta a duenos de flotas con talleres de confianza
            </p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Fleet Owners */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
                  <Truck className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Para Duenos de Flotas</h3>
                  <p className="text-sm text-muted-foreground">Control total de tus vehiculos</p>
                </div>
              </div>
              <ul className="space-y-4">
                {benefits.fleet.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-operational" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Workshops */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-chart-1">
                  <Wrench className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Para Talleres</h3>
                  <p className="text-sm text-muted-foreground">Mejora tu servicio</p>
                </div>
              </div>
              <ul className="space-y-4">
                {benefits.workshop.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-operational" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 md:p-16">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
                Comienza a optimizar tu flota hoy
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Agenda una demostracion personalizada y descubre como AutoCam puede transformar la gestion de tu flota.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => setDemoModalOpen(true)}
                  className="gap-2"
                >
                  Solicitar Demo Gratis
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-t border-border bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Contactanos</h2>
              <p className="mt-4 text-muted-foreground">
                Nuestro equipo esta disponible para responder tus consultas y ayudarte a encontrar la mejor solucion para tu flota.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefono</p>
                    <p className="font-medium text-foreground">+54 11 5555-0123</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">info@autocam.com.ar</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ubicacion</p>
                    <p className="font-medium text-foreground">Buenos Aires, Argentina</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Horario de atencion</p>
                    <p className="font-medium text-foreground">Lun - Vie: 8:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Enviar mensaje</h3>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Nombre</Label>
                    <Input id="contact-name" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="tu@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">Mensaje</Label>
                  <Textarea id="contact-message" placeholder="Tu mensaje..." rows={4} />
                </div>
                <Button type="submit" className="w-full">
                  Enviar Mensaje
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Truck className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">AutoCam</span>
            </div>
            <p className="text-sm text-muted-foreground">
              2026 AutoCam. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Demo Request Modal */}
      <Dialog open={demoModalOpen} onOpenChange={setDemoModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Solicitar Demo</DialogTitle>
            <DialogDescription>
              Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.
            </DialogDescription>
          </DialogHeader>
          {formSubmitted ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-operational/20">
                <CheckCircle2 className="h-8 w-8 text-operational" />
              </div>
              <p className="text-center font-medium text-foreground">Solicitud enviada con exito</p>
              <p className="text-center text-sm text-muted-foreground">
                Te contactaremos pronto para coordinar la demo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleDemoSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre *</Label>
                  <Input
                    id="name"
                    value={demoForm.name}
                    onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefono *</Label>
                  <Input
                    id="phone"
                    value={demoForm.phone}
                    onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={demoForm.email}
                  onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Empresa *</Label>
                <Input
                  id="company"
                  value={demoForm.company}
                  onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fleet-size">Cantidad de vehiculos</Label>
                <Select
                  value={demoForm.fleetSize}
                  onValueChange={(value) => setDemoForm({ ...demoForm, fleetSize: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1 - 5 vehiculos</SelectItem>
                    <SelectItem value="6-15">6 - 15 vehiculos</SelectItem>
                    <SelectItem value="16-30">16 - 30 vehiculos</SelectItem>
                    <SelectItem value="31-50">31 - 50 vehiculos</SelectItem>
                    <SelectItem value="50+">Mas de 50 vehiculos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-message">Mensaje (opcional)</Label>
                <Textarea
                  id="demo-message"
                  value={demoForm.message}
                  onChange={(e) => setDemoForm({ ...demoForm, message: e.target.value })}
                  placeholder="Cuentanos sobre tu flota..."
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full">
                Enviar Solicitud
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Login Modal */}
      <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Acceder a la Plataforma</DialogTitle>
            <DialogDescription>
              Selecciona tu tipo de cuenta para ver la demo.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-4 bg-transparent"
              onClick={() => {
                login('client')
                setLoginModalOpen(false)
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium">Dueno de Flota</p>
                <p className="text-xs text-muted-foreground">Gestiona tus vehiculos</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-4 bg-transparent"
              onClick={() => {
                login('workshop')
                setLoginModalOpen(false)
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-1/10">
                <Wrench className="h-5 w-5 text-chart-1" />
              </div>
              <div className="text-left">
                <p className="font-medium">Taller Mecanico</p>
                <p className="text-xs text-muted-foreground">Administra reparaciones</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-4 bg-transparent"
              onClick={() => {
                login('driver')
                setLoginModalOpen(false)
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
                <Activity className="h-5 w-5 text-chart-4" />
              </div>
              <div className="text-left">
                <p className="font-medium">Conductor</p>
                <p className="text-xs text-muted-foreground">Reporta estado del vehiculo</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-4 bg-transparent"
              onClick={() => {
                login('admin')
                setLoginModalOpen(false)
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-left">
                <p className="font-medium">Administrador</p>
                <p className="text-xs text-muted-foreground">Vista general del sistema</p>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
