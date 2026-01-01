"use client"
import { useRecipeFormStore } from "@/store/recipe-form-store"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import StepForm from "@/components/recipes/form/step-form"

export function StepsStage() {
  const { formData, addStep } = useRecipeFormStore()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  
  return (
    <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4 h-4/5">

      {/* LEFT PANEL*/}
      <div className="border rounded-lg p-4 flex flex-col gap-2 overflow-hidden">
        <h3 className="font-semibold mb-2 shrink-0">Steps ({formData.steps?.length || 0})</h3>
        
        {/* STEP LIST */}
        <div className="space-y-2 flex-1 overflow-y-auto min-h-0">
          {formData.steps?.map((step, index) => (
            <div 
              key={index}
              onClick={() => setEditingIndex(index)}
              className={`p-3 rounded border cursor-pointer hover:bg-muted transition-colors ${
                editingIndex === index ? 'bg-muted border-primary' : ''
              }`}
            >
              <div className="font-medium">{index + 1}. {step.name || "(Unnamed)"}</div>
              {step.instructions && (
                <div className="text-sm text-muted-foreground truncate">
                  {step.instructions}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* ADD STEP BUTTON */}
        <Button variant="ghost" onClick={addStep}>
          <Plus />
          Add Step
        </Button>
      </div>
      
      {/* RIGHT PANEL - FORM */}
      <div className="border rounded-lg p-4 flex flex-col gap-4 overflow-y-auto justify-between">
        <h3 className="font-semibold">
          {editingIndex !== null ? `Edit Step ${editingIndex + 1}` : "New Step"}
        </h3>
        
        {/* NEW STEP FORM */}
        {editingIndex !== null ? (
          <StepForm editingIndex={editingIndex} setEditingIndex={setEditingIndex}/>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-center">
              Select a step from the list or add a new one
            </p>
          </div>
        )}
      </div>
      
    </div>
  )
}