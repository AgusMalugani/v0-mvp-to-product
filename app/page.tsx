"use client";

import { AppProvider, useApp } from "@/lib/app-context";
import { LandingPage } from "@/components/landing-page";
import { ClientDashboard } from "@/components/dashboards/client-dashboard";
import { WorkshopDashboard } from "@/components/dashboards/workshop-dashboard";
import { DriverDashboard } from "@/components/dashboards/driver-dashboard";
import { AdminDashboard } from "@/components/dashboards/admin-dashboard";
import { VehicleDetail } from "@/components/vehicle-detail";
import { AIDiagnostics } from "@/components/ai-diagnostics";
import { NotificationsCenter } from "@/components/notifications-center";

function AppContent() {
  const {
    currentView,
    setCurrentView,
    currentRole,
    isLoggedIn,
    logout,
    vehicles,
    selectedVehicleId,
    setSelectedVehicleId,
  } = useApp();

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || null;

  const handleLogout = () => {
    logout();
  };

  const handleViewVehicle = (vehicle: { id: string }) => {
    setSelectedVehicleId(vehicle.id);
    setCurrentView("vehicle-detail");
  };

  const handleOpenDiagnostics = (vehicle: { id: string }) => {
    setSelectedVehicleId(vehicle.id);
    setCurrentView("ai-diagnostics");
  };

  const handleOpenNotifications = () => {
    setCurrentView("notifications");
  };

  const handleBackToDashboard = () => {
    setSelectedVehicleId(null);
    if (currentRole) {
      setCurrentView(`${currentRole}-dashboard` as typeof currentView);
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
    vehicles,
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
