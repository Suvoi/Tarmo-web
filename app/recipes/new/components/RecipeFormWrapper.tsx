"use client"

import { useRecipeFormStore } from "@/store/recipe-form-store"
import { MetadataStage } from "./stages/MetadataStage"  // ← cambio: era MetadataStep
//import { StepsStage } from "./stages/StepsStage"  // ← cambio
//import { OverviewStage } from "./stages/OverviewStage"  // ← cambio
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"

const STAGES = [  // ← cambio: era STEPS
  { id: 0, name: "General info", component: MetadataStage },
  //{ id: 1, name: "Steps", component: StepsStage },
  //{ id: 2, name: "Overview", component: OverviewStage },
]

export function RecipeFormWrapper() {
  const { currentStage, setCurrentStage, canGoToStage } = useRecipeFormStore()  // ← cambios
  
  const CurrentStageComponent = STAGES[currentStage].component  // ← cambios
  const progress = ((currentStage + 1) / STAGES.length) * 100  // ← cambios
  
  const handleNext = () => {
    if (currentStage < STAGES.length - 1 && canGoToStage(currentStage + 1)) {  // ← cambios
      setCurrentStage(currentStage + 1)  // ← cambio
    }
  }
  
  const handleBack = () => {
    if (currentStage > 0) {  // ← cambio
      setCurrentStage(currentStage - 1)  // ← cambio
    }
  }
  
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Barra de progreso */}
      <div className="px-4 space-y-2 pb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{currentStage + 1} / {STAGES.length}</span>  {/* ← cambio */}
          <span className="text-muted-foreground">{STAGES[currentStage].name}</span>  {/* ← cambio */}
        </div>
        <Progress value={progress} />
      </div>
      
      {/* Contenido del stage actual */}
      <div className="flex-1 overflow-y-auto px-4 flex items-center justify-center">
        <CurrentStageComponent />
      </div>
      
      {/* Botones de navegación */}
      <div className="flex items-center justify-between px-4 py-4 border-t">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStage === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={currentStage === STAGES.length - 1}
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}