"use client";

import { useState } from "react";
import { AppProvider, useApp } from "@/lib/app-context";
import { LandingPage } from "@/components/landing-page";
import { ClientDashboard } from "@/components/dashboards/client-dashboard";
import { WorkshopDashboard } from "@/components/dashboards/workshop-dashboard";
import { DriverDashboard } from "@/components/dashboards/driver-dashboard";
import { AdminDashboard } from "@/components/dashboards/admin-dashboard";
import { VehicleDetail } from "@/components/vehicle-detail";
import { AIDiagnostics } from "@/components/ai-diagnostics";
import { NotificationsCenter } from "@/components/notifications-center";
import type { Vehicle } from "@/lib/types";

function AppContent() {
  const { 
    currentView, 
    setCurrentView, 
    currentRole, 
    isLoggedIn, 
    logout, 
    vehicles,
    selectedVehicleId,
    setSelectedVehicleId 
  } = useApp();
  
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleLogout = () => {
    logout();
    setSelectedVehicle(null);
  };

  const handleViewVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedVehicleId(vehicle.id);
    setCurrentView("vehicle-detail");
  };

  const handleOpenDiagnostics = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedVehicleId(vehicle.id);
    setCurrentView("ai-diagnostics");
  };

  const handleOpenNotifications = () => {
    setCurrentView("notifications");
  };

  const handleBackToDashboard = () => {
    if (currentRole) {
      switch (currentRole) {
        case "client":
          setCurrentView("client-dashboard");
          break;
        case "workshop":
          setCurrentView("workshop-dashboard");
          break;
        case "driver":
          setCurrentView("driver-dashboard");
          break;
        case "admin":
          setCurrentView("admin-dashboard");
          break;
      }
      setSelectedVehicle(null);
      setSelectedVehicleId(null);
    }
  };

  // Landing Page
  if (currentView === "landing" || !isLoggedIn) {
    return <LandingPage />;
  }

  // Notifications Center
  if (currentView === "notifications") {
    return <NotificationsCenter onBack={handleBackToDashboard} />;
  }

  // Vehicle Detail
  if (currentView === "vehicle-detail" && selectedVehicle) {
    return (
      <VehicleDetail
        vehicle={selectedVehicle}
        onBack={handleBackToDashboard}
        onOpenDiagnostics={() => handleOpenDiagnostics(selectedVehicle)}
      />
    );
  }

  // AI Diagnostics
  if (currentView === "ai-diagnostics" && selectedVehicle) {
    return (
      <AIDiagnostics vehicle={selectedVehicle} onBack={handleBackToDashboard} />
    );
  }

  // Role-based dashboards
  const dashboardProps = {
    onLogout: handleLogout,
    onViewVehicle: handleViewVehicle,
    onOpenDiagnostics: handleOpenDiagnostics,
    onOpenNotifications: handleOpenNotifications,
    vehicles: vehicles,
  };

  switch (currentRole) {
    case "client":
      return <ClientDashboard {...dashboardProps} />;
    case "workshop":
      return <WorkshopDashboard {...dashboardProps} />;
    case "driver":
      return (
        <DriverDashboard
          {...dashboardProps}
          assignedVehicle={vehicles[0]}
        />
      );
    case "admin":
      return <AdminDashboard {...dashboardProps} />;
    default:
      return <LandingPage />;
  }
}

export default function Page() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
