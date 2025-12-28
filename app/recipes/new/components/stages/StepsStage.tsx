"use client"
import { useRecipeFormStore } from "@/store/recipe-form-store"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"

export function StepsStage() {
  const { formData, updateFormData } = useRecipeFormStore()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  
  const currentName = editingIndex !== null ? formData.steps?.[editingIndex]?.name : ""
  const currentInstructions = editingIndex !== null ? formData.steps?.[editingIndex]?.instructions : ""
  
  const updateStep = (index: number, field: 'name' | 'instructions', value: string) => {
    const updatedSteps = [...(formData.steps || [])]
    updatedSteps[index] = {
      ...updatedSteps[index],
      [field]: value
    }
    updateFormData({ steps: updatedSteps })
  }
  
  const addStep = () => {
    const newStep = { name: "", instructions: "" }
    updateFormData({ steps: [...(formData.steps || []), newStep] })
    setEditingIndex((formData.steps || []).length)
  }
  
  return (
    <div className="w-full h-full max-w-4xl mx-auto grid grid-cols-2 gap-4">
      {/* Panel izquierdo - Lista */}
      <div className="border rounded-lg p-4 flex flex-col gap-2">
        <h3 className="font-semibold mb-2">Steps ({formData.steps?.length || 0})</h3>
        
        {/* ⭐ LISTA DE STEPS */}
        <div className="space-y-2 flex-1 overflow-y-auto min-h-0">
          {formData.steps?.map((step, index) => (
            <div 
              key={index}
              onClick={() => setEditingIndex(index)}
              className={`p-3 rounded border cursor-pointer hover:bg-muted ${
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
        
        {/* ⭐ BOTÓN ADD */}
        <Button onClick={addStep} variant="outline" className="w-full">
          + Add Step
        </Button>
      </div>
      
      {/* Panel derecho - Form */}
      <div className="border rounded-lg p-4 flex flex-col gap-4">
        <h3 className="font-semibold">
          {editingIndex !== null ? `Edit Step ${editingIndex + 1}` : "New Step"}
        </h3>
        
        <Field>
          <FieldLabel>Step Name *</FieldLabel>
          <Input 
            placeholder="e.g. Preheat oven"
            value={currentName}
            onChange={(e) => {
              if (editingIndex !== null) {
                updateStep(editingIndex, 'name', e.target.value)
              }
            }}
          />
        </Field>
        
        <Field>
          <FieldLabel>Instructions</FieldLabel>
          <Textarea 
            placeholder="Detailed instructions..."
            value={currentInstructions || ""}
            onChange={(e) => {
              if (editingIndex !== null) {
                updateStep(editingIndex, 'instructions', e.target.value)
              }
            }}
          />
        </Field>
      </div>
    </div>
  )
}