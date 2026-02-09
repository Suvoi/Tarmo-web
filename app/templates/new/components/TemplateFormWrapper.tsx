"use client"

import { useTemplateFormStore } from "@/features/templates/store/template-form-store"
import StepForm from "@/features/templates/components/step-form"
import { StepsStage } from "./stages/StepsStage"
import { OverviewStage } from "./stages/OverviewStage"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createTemplate, updateTemplate } from "@/features/templates/api"
import { MetadataStage } from "./stages/MetadataStage"
import { toast } from "sonner"
import { mutate } from "swr"

const STAGES = [
  { id: 0, name: "General", component: MetadataStage },
  { id: 1, name: "Steps", component: StepsStage },
  { id: 2, name: "Overview", component: OverviewStage },
]

interface TemplateFormWrapperProps {
  mode?: 'create' | 'edit'
  templateId?: number
}

export function TemplateFormWrapper({ mode = 'create', templateId }: TemplateFormWrapperProps = {}) {
  const { currentStage, setCurrentStage, canGoToStage, resetForm, getTemplateData } = useTemplateFormStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const CurrentStageComponent = STAGES[currentStage].component
  const progress = ((currentStage + 1) / STAGES.length) * 100
  const isLastStage = currentStage === STAGES.length - 1

  const router = useRouter()

  const handleNext = () => {
    if (currentStage < STAGES.length - 1 && canGoToStage(currentStage + 1)) {
      setCurrentStage(currentStage + 1)
    }
  }

  const handleBack = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const templateData = getTemplateData()

      if (mode === 'edit' && templateId) {
        await updateTemplate(templateId, templateData)
        router.push(`/templates/${templateId}`)
        mutate(`/templates/${templateId}`)
        mutate("/templates")
        resetForm()
        toast.success("Template updated successfully!")
      } else {
        await createTemplate(templateData)
        router.push("/templates")
        mutate("/templates")
        resetForm()
        toast.success("Template added to your collection!")
      }
    } catch (error) {
      console.error(`Error ${mode === 'edit' ? 'updating' : 'creating'} template:`, error)
      toast.error("Oops! Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">

      <div className="px-4 space-y-2 pb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{currentStage + 1} / {STAGES.length}</span>  {/* ← cambio */}
          <span className="text-muted-foreground">{STAGES[currentStage].name}</span>  {/* ← cambio */}
        </div>
        <Progress value={progress} />
      </div>

      <div className="flex-1 overflow-y-auto px-4 flex items-center justify-center">
        <CurrentStageComponent />
      </div>

      <div className="flex items-center justify-between px-4 py-4">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStage === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {isLastStage ? (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? (mode === 'edit' ? "Updating..." : "Creating...")
              : (mode === 'edit' ? "Update Template" : "Create Template")
            }
            <Check className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!canGoToStage(currentStage + 1)}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}

      </div>
    </div>
  )
}