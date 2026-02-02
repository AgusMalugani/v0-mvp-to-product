'use client'

import React from "react"

import { createContext, useContext, useState, type ReactNode } from 'react'
import type { UserRole, Vehicle, Notification } from './types'
import { mockVehicles, mockNotifications, mockUsers } from './mock-data'

type View =
  | 'landing'
  | 'client-dashboard'
  | 'workshop-dashboard'
  | 'driver-dashboard'
  | 'admin-dashboard'
  | 'vehicle-detail'
  | 'notifications'
  | 'ai-diagnostics'

interface AppContextType {
  currentView: View
  setCurrentView: (view: View) => void
  currentRole: UserRole | null
  setCurrentRole: (role: UserRole | null) => void
  vehicles: Vehicle[]
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>
  notifications: Notification[]
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
  selectedVehicleId: string | null
  setSelectedVehicleId: (id: string | null) => void
  isLoggedIn: boolean
  login: (role: UserRole) => void
  logout: () => void
  currentUser: typeof mockUsers[0] | null
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<View>('landing')
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null)
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<typeof mockUsers[0] | null>(null)

  const login = (role: UserRole) => {
    const user = mockUsers.find((u) => u.role === role)
    setCurrentUser(user || null)
    setCurrentRole(role)
    setIsLoggedIn(true)
    switch (role) {
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
    }
  }

  const logout = () => {
    setCurrentUser(null)
    setCurrentRole(null)
    setIsLoggedIn(false)
    setCurrentView('landing')
  }

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentRole,
        setCurrentRole,
        vehicles,
        setVehicles,
        notifications,
        setNotifications,
        selectedVehicleId,
        setSelectedVehicleId,
        isLoggedIn,
        login,
        logout,
        currentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
