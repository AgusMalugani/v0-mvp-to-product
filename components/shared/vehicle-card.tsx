'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from './status-badge'
import { HealthIndicator } from './health-indicator'
import type { Vehicle } from '@/lib/types'
import { useApp } from '@/lib/app-context'
import { Truck, AlertTriangle, Calendar, Gauge } from 'lucide-react'

interface VehicleCardProps {
  vehicle: Vehicle
  showActions?: boolean
}

export function VehicleCard({ vehicle, showActions = true }: VehicleCardProps) {
  const { setCurrentView, setSelectedVehicleId } = useApp()

  const handleViewDetails = () => {
    setSelectedVehicleId(vehicle.id)
    setCurrentView('vehicle-detail')
  }

  const alertCount = vehicle.alerts.filter((a) => !a.isRead).length

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/5 hover:border-primary/50">
      <CardContent className="p-0">
        <div className="flex items-start gap-4 p-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary">
            <Truck className="h-7 w-7 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground">{vehicle.plate}</h3>
                <p className="text-sm text-muted-foreground">
                  {vehicle.brand} {vehicle.model}
                </p>
              </div>
              <StatusBadge status={vehicle.status} />
            </div>
            <div className="mt-3">
              <HealthIndicator value={vehicle.health} showLabel />
            </div>
          </div>
        </div>
        <div className="border-t border-border bg-secondary/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Gauge className="h-3.5 w-3.5" />
                {vehicle.mileage.toLocaleString()} km
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(vehicle.nextService).toLocaleDateString('es-AR', {
                  day: '2-digit',
                  month: 'short',
                })}
              </div>
              {alertCount > 0 && (
                <div className="flex items-center gap-1 text-critical">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {alertCount}
                </div>
              )}
            </div>
            {showActions && (
              <Button variant="ghost" size="sm" onClick={handleViewDetails}>
                Ver detalle
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
