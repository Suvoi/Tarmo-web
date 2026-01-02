"use client"
import { useRecipeFormStore } from "@/store/recipe-form-store"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import StepForm from "@/components/recipes/form/step-form"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"

export function StepsStage() {
  const { formData, addStep } = useRecipeFormStore()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const isMobile = useIsMobile()
  
  return (
    <div className="w-full h-full sm:max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4">

      {/* LEFT PANEL*/}
      <div className="p-4 flex flex-col gap-2 overflow-hidden">
        <h3 className="font-semibold mb-2 shrink-0">Steps ({formData.steps?.length || 0})</h3>
        
        {/* STEP LIST */}
        <div className="space-y-2 flex-1 overflow-y-auto min-h-0">
          {formData.steps?.map((step, index) => (
            <Item
              key={index}
              onClick={() => {
                setEditingIndex(index)
                if (isMobile) setIsSheetOpen(true)}
              }
              variant={(editingIndex === index) ? 'muted' : 'outline'}
              className="cursor-pointer"
              size="default"
            >
              <ItemContent>
                <ItemTitle className="text-lg">{index + 1}. {step.name || "(Unnamed)"}</ItemTitle>
                {step.instructions && (
                  <ItemDescription className="overflow-x-hidden">
                    {step.instructions}
                  </ItemDescription>
                )}
              </ItemContent>
            </Item>
          ))}
        </div>
        
        {/* ADD STEP BUTTON */}
        <Button variant="ghost" onClick={addStep}>
          <Plus />
          Add Step
        </Button>
      </div>
      
      {/* RIGHT PANEL - FORM */}
      {/* LARGE SCREENS */}
      <div className="p-4 hidden sm:flex flex-col gap-4 overflow-y-auto justify-between">
        <h3 className="font-semibold">
          {editingIndex !== null ? `Edit Step ${editingIndex + 1}` : "New Step"}
        </h3>
        
        {/* NEW STEP FORM */}
        {editingIndex !== null ? (
          <StepForm
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
            setIsSheetOpen={setIsSheetOpen}
            />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-center">
              Select a step from the list or add a new one
            </p>
          </div>
        )}
      </div>

      {/* SHEET (mobile) */}
      <div className="sm:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="right" className="p-4">
            <SheetHeader>
              <SheetTitle>
                {editingIndex !== null ? `Edit Step ${editingIndex + 1}` : "New Step"}
              </SheetTitle>
            </SheetHeader>
            {editingIndex !== null && (
              <StepForm 
                editingIndex={editingIndex}
                setEditingIndex={setEditingIndex}
                setIsSheetOpen={setIsSheetOpen}
              />
            )}
          </SheetContent>
        </Sheet>
      </div>
      
    </div>
  )
}