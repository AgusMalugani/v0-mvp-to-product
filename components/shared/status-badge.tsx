import { cn } from '@/lib/utils'
import type { VehicleStatus } from '@/lib/types'

interface StatusBadgeProps {
  status: VehicleStatus
  size?: 'sm' | 'md' | 'lg'
}

const statusConfig: Record<VehicleStatus, { label: string; className: string }> = {
  operational: {
    label: 'Operativo',
    className: 'bg-operational/20 text-operational border-operational/30',
  },
  attention: {
    label: 'Atencion',
    className: 'bg-attention/20 text-attention border-attention/30',
  },
  critical: {
    label: 'Critico',
    className: 'bg-critical/20 text-critical border-critical/30',
  },
  in_workshop: {
    label: 'En Taller',
    className: 'bg-blocked/20 text-blocked border-blocked/30',
  },
  blocked: {
    label: 'Bloqueado',
    className: 'bg-muted text-muted-foreground border-muted',
  },
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        config.className,
        sizeClasses[size]
      )}
    >
      {config.label}
    </span>
  )
}
