import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { Input } from "@/components/ui/input";
import { useTemplateFormStore } from "../store/template-form-store";

interface StepFormProps {
  editingIndex: number
  setEditingIndex: (index: number | null) => void
  setIsSheetOpen: (open: boolean) => void
}

export default function StepForm({ editingIndex, setEditingIndex, setIsSheetOpen }: StepFormProps) {
  const { formData, updateStep, removeStep } = useTemplateFormStore()

  const currentName = formData.steps?.[editingIndex]?.name || ""
  const currentInstructions = formData.steps?.[editingIndex]?.instructions || ""

  return (
    <Field className="flex justify-between items-center h-full">
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

      <Button variant="destructive" onClick={() => {
        removeStep(editingIndex)
        setEditingIndex(null)
        setIsSheetOpen(false)
      }}>
        <Trash />
        Delete
      </Button>
    </Field>
  )
}