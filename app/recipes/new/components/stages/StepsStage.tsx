"use client"
import { useRecipeFormStore } from "@/store/recipe-form-store"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Plus, Trash } from "lucide-react"

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

  const removeStep = (index: number) => {
    const updatedSteps = formData.steps?.filter((_, i) => i !== index) || []
    updateFormData({ steps: updatedSteps })
    
    if (editingIndex === index) {
      setEditingIndex(null)
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1)
    }
  }
  
  return (
    <div className="w-full max-w-4xl grid grid-cols-2 gap-4 h-4/5">

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
        <Button onClick={addStep} variant="ghost">
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
          <>
            <FieldGroup>
              <Field>
                <FieldLabel>Step Name *</FieldLabel>
                <Input 
                  placeholder="e.g. Preheat oven"
                  value={currentName}
                  onChange={(e) => updateStep(editingIndex, 'name', e.target.value)}
                />
              </Field>
              
              <Field>
                <FieldLabel>Instructions</FieldLabel>
                <Textarea 
                  placeholder="Detailed instructions..."
                  value={currentInstructions || ""}
                  onChange={(e) => updateStep(editingIndex, 'instructions', e.target.value)}
                  rows={8}
                  className="max-h-28 overflow-y-auto"
                />
              </Field>
            </FieldGroup>

            <Button variant="destructive" onClick={() => removeStep(editingIndex!)}>
              <Trash />
              Delete
            </Button>
          </>
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