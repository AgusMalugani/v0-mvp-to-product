import { cn } from '@/lib/utils'

interface HealthIndicatorProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

function getHealthColor(value: number): string {
  if (value >= 80) return 'bg-operational'
  if (value >= 50) return 'bg-attention'
  return 'bg-critical'
}

function getHealthTextColor(value: number): string {
  if (value >= 80) return 'text-operational'
  if (value >= 50) return 'text-attention'
  return 'text-critical'
}

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
}

export function HealthIndicator({ value, size = 'md', showLabel = false }: HealthIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn('flex-1 overflow-hidden rounded-full bg-muted', sizeClasses[size])}>
        <div
          className={cn('h-full rounded-full transition-all', getHealthColor(value))}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className={cn('text-sm font-medium tabular-nums', getHealthTextColor(value))}>
          {value}%
        </span>
      )}
    </div>
  )
}

export function HealthCircle({ value, size = 64 }: { value: number; size?: number }) {
  const strokeWidth = size / 8
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="rotate-[-90deg]" width={size} height={size}>
        <circle
          className="text-muted"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={getHealthTextColor(value)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn('text-lg font-bold', getHealthTextColor(value))}>{value}%</span>
      </div>
    </div>
  )
}
