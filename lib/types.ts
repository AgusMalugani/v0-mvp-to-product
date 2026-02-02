export type UserRole = 'client' | 'workshop' | 'driver' | 'admin'

export type VehicleStatus = 'operational' | 'attention' | 'critical' | 'in_workshop' | 'blocked'

export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  company?: string
  avatar?: string
}

export interface Vehicle {
  id: string
  plate: string
  brand: string
  model: string
  year: number
  status: VehicleStatus
  health: number
  lastService: string
  nextService: string
  mileage: number
  driver?: string
  alerts: Alert[]
  image?: string
}

export interface Alert {
  id: string
  vehicleId: string
  type: string
  message: string
  severity: AlertSeverity
  timestamp: string
  isRead: boolean
}

export interface ServiceHistory {
  id: string
  vehicleId: string
  date: string
  type: string
  description: string
  cost: number
  workshop: string
  mechanic: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'alert' | 'info' | 'success' | 'warning'
  timestamp: string
  isRead: boolean
  vehicleId?: string
}

export interface DemoRequest {
  name: string
  email: string
  company: string
  phone: string
  fleetSize: string
  message?: string
}
