"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Brain,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Sparkles,
  Camera,
  FileText,
  Wrench,
  Clock,
  DollarSign,
} from "lucide-react";
import type { Vehicle } from "@/lib/types";

interface AIDiagnosticsProps {
  vehicle: Vehicle;
  onBack: () => void;
}

interface DiagnosisResult {
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  possibleCauses: string[];
  recommendedActions: string[];
  estimatedCost: { min: number; max: number };
  urgency: string;
  affectedSystems: string[];
}

const mockDiagnoses: Record<string, DiagnosisResult> = {
  frenos: {
    severity: "high",
    title: "Desgaste de Sistema de Frenos",
    description:
      "El análisis indica un desgaste significativo en el sistema de frenos que requiere atención inmediata para garantizar la seguridad operativa del vehículo.",
    possibleCauses: [
      "Pastillas de freno desgastadas (>80% de uso)",
      "Discos de freno con ranuras o deformación",
      "Líquido de frenos contaminado o bajo nivel",
      "Calibradores con desgaste irregular",
    ],
    recommendedActions: [
      "Inspección visual completa del sistema",
      "Medición del espesor de pastillas y discos",
      "Verificar nivel y estado del líquido de frenos",
      "Reemplazo de pastillas si espesor < 3mm",
      "Rectificado o reemplazo de discos si es necesario",
    ],
    estimatedCost: { min: 45000, max: 120000 },
    urgency: "Atender en las próximas 48 horas",
    affectedSystems: ["Sistema de frenado", "Seguridad activa"],
  },
  motor: {
    severity: "critical",
    title: "Falla en Sistema de Inyección",
    description:
      "Se detectan síntomas compatibles con problemas en el sistema de inyección de combustible. El vehículo puede presentar pérdida de potencia y aumento de consumo.",
    possibleCauses: [
      "Inyectores obstruidos o con fuga",
      "Bomba de combustible con presión irregular",
      "Filtro de combustible saturado",
      "Sensor MAF sucio o defectuoso",
      "Fuga en el riel de inyectores",
    ],
    recommendedActions: [
      "Diagnóstico con escáner OBD-II",
      "Test de presión de combustible",
      "Limpieza ultrasónica de inyectores",
      "Reemplazo de filtro de combustible",
      "Verificación de sensores del motor",
    ],
    estimatedCost: { min: 80000, max: 250000 },
    urgency: "No circular hasta inspección",
    affectedSystems: [
      "Motor",
      "Sistema de combustible",
      "Control electrónico",
    ],
  },
  suspension: {
    severity: "medium",
    title: "Desgaste en Componentes de Suspensión",
    description:
      "Los síntomas descritos sugieren desgaste en componentes de la suspensión que afectan el confort y la estabilidad del vehículo.",
    possibleCauses: [
      "Amortiguadores vencidos",
      "Bujes de barra estabilizadora desgastados",
      "Rótulas con holgura",
      "Espirales fatigados",
    ],
    recommendedActions: [
      "Inspección en elevador",
      "Test de rebote en amortiguadores",
      "Verificar holguras en rótulas y terminales",
      "Alineación y balanceo post-reparación",
    ],
    estimatedCost: { min: 60000, max: 180000 },
    urgency: "Programar para la próxima semana",
    affectedSystems: ["Suspensión", "Dirección", "Neumáticos"],
  },
  default: {
    severity: "low",
    title: "Revisión General Recomendada",
    description:
      "Basado en la descripción proporcionada, se recomienda una revisión general para identificar el origen exacto del problema.",
    possibleCauses: [
      "Múltiples factores pueden estar involucrados",
      "Se requiere inspección física para diagnóstico preciso",
    ],
    recommendedActions: [
      "Agendar turno para revisión completa",
      "Proporcionar más detalles sobre los síntomas",
      "Adjuntar fotos o videos si es posible",
    ],
    estimatedCost: { min: 15000, max: 35000 },
    urgency: "A conveniencia del cliente",
    affectedSystems: ["Por determinar"],
  },
};

export function AIDiagnostics({ vehicle, onBack }: AIDiagnosticsProps) {
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;

    setIsAnalyzing(true);
    setDiagnosis(null);

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const lowerSymptoms = symptoms.toLowerCase();
    let result: DiagnosisResult;

    if (
      lowerSymptoms.includes("freno") ||
      lowerSymptoms.includes("frenar") ||
      lowerSymptoms.includes("pedal")
    ) {
      result = mockDiagnoses.frenos;
    } else if (
      lowerSymptoms.includes("motor") ||
      lowerSymptoms.includes("potencia") ||
      lowerSymptoms.includes("consumo") ||
      lowerSymptoms.includes("humo")
    ) {
      result = mockDiagnoses.motor;
    } else if (
      lowerSymptoms.includes("suspension") ||
      lowerSymptoms.includes("ruido") ||
      lowerSymptoms.includes("golpe") ||
      lowerSymptoms.includes("vibra")
    ) {
      result = mockDiagnoses.suspension;
    } else {
      result = mockDiagnoses.default;
    }

    setDiagnosis(result);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-green-500/20 text-green-400 border-green-500/30";
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "critical":
        return "Critico";
      case "high":
        return "Alto";
      case "medium":
        return "Medio";
      default:
        return "Bajo";
    }
  };

  const previousDiagnoses = [
    {
      date: "15/01/2026",
      title: "Cambio de aceite y filtros",
      severity: "low",
    },
    {
      date: "02/12/2025",
      title: "Reparación sistema de frenos",
      severity: "high",
    },
    { date: "18/10/2025", title: "Alineación y balanceo", severity: "low" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Diagnostico IA
                </h1>
                <p className="text-sm text-muted-foreground">
                  {vehicle.plate} - {vehicle.brand} {vehicle.model}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Input Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Describe los sintomas del vehiculo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Ej: El camion hace un ruido metalico al frenar, especialmente cuando esta frio. Tambien noto que el pedal de freno esta mas blando de lo normal..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[120px] bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />

            <div className="flex flex-wrap gap-2">
              <p className="text-sm text-muted-foreground w-full mb-1">
                Sugerencias rapidas:
              </p>
              {[
                "Ruido al frenar",
                "Perdida de potencia",
                "Vibracion en el volante",
                "Consumo excesivo",
                "Luz de check engine",
              ].map((suggestion) => (
                <Badge
                  key={suggestion}
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary transition-colors border-border text-muted-foreground hover:text-foreground"
                  onClick={() =>
                    setSymptoms((prev) =>
                      prev ? `${prev}, ${suggestion.toLowerCase()}` : suggestion
                    )
                  }
                >
                  {suggestion}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleAnalyze}
                disabled={!symptoms.trim() || isAnalyzing}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analizando...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Analizar con IA
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="border-border text-muted-foreground hover:text-foreground bg-transparent"
              >
                <Camera className="h-4 w-4 mr-2" />
                Adjuntar foto
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading Animation */}
        {isAnalyzing && (
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                  <div className="relative p-4 rounded-full bg-primary/10">
                    <Brain className="h-8 w-8 text-primary animate-pulse" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">
                    Analizando sintomas...
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Procesando con inteligencia artificial
                  </p>
                </div>
                <div className="flex gap-1 mt-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Diagnosis Result */}
        {diagnosis && !isAnalyzing && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        diagnosis.severity === "critical" ||
                        diagnosis.severity === "high"
                          ? "bg-red-500/10"
                          : diagnosis.severity === "medium"
                            ? "bg-yellow-500/10"
                            : "bg-green-500/10"
                      }`}
                    >
                      {diagnosis.severity === "critical" ||
                      diagnosis.severity === "high" ? (
                        <AlertTriangle
                          className={`h-6 w-6 ${diagnosis.severity === "critical" ? "text-red-400" : "text-orange-400"}`}
                        />
                      ) : (
                        <CheckCircle2
                          className={`h-6 w-6 ${diagnosis.severity === "medium" ? "text-yellow-400" : "text-green-400"}`}
                        />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-foreground">
                        {diagnosis.title}
                      </CardTitle>
                      <Badge
                        className={`mt-1 ${getSeverityColor(diagnosis.severity)}`}
                      >
                        Severidad: {getSeverityLabel(diagnosis.severity)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{diagnosis.description}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Posibles Causas
                    </h4>
                    <ul className="space-y-2">
                      {diagnosis.possibleCauses.map((cause, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-primary" />
                      Acciones Recomendadas
                    </h4>
                    <ul className="space-y-2">
                      {diagnosis.recommendedActions.map((action, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0">
                            {index + 1}
                          </span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="p-4 rounded-lg bg-secondary">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-sm">Costo Estimado</span>
                    </div>
                    <p className="font-semibold text-foreground">
                      ${diagnosis.estimatedCost.min.toLocaleString()} - $
                      {diagnosis.estimatedCost.max.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Urgencia</span>
                    </div>
                    <p className="font-semibold text-foreground">
                      {diagnosis.urgency}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Wrench className="h-4 w-4" />
                      <span className="text-sm">Sistemas Afectados</span>
                    </div>
                    <p className="font-semibold text-foreground text-sm">
                      {diagnosis.affectedSystems.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Solicitar Turno
                  </Button>
                  <Button
                    variant="outline"
                    className="border-border text-muted-foreground hover:text-foreground bg-transparent"
                  >
                    Descargar Reporte
                  </Button>
                  <Button
                    variant="outline"
                    className="border-border text-muted-foreground hover:text-foreground bg-transparent"
                  >
                    Compartir con Taller
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Previous Diagnoses */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground text-base">
                Historial de Diagnosticos
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                className="text-muted-foreground hover:text-foreground"
              >
                {showHistory ? "Ocultar" : "Ver todos"}
              </Button>
            </div>
          </CardHeader>
          {showHistory && (
            <CardContent>
              <div className="space-y-3">
                {previousDiagnoses.map((diag, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          diag.severity === "high"
                            ? "bg-orange-400"
                            : "bg-green-400"
                        }`}
                      />
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {diag.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {diag.date}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80"
                    >
                      Ver detalle
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
