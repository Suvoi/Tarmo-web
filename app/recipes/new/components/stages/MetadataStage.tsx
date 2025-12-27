"use client"
import { useRecipeFormStore } from "@/store/recipe-form-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export function MetadataStage() {
  const { formData, updateFormData } = useRecipeFormStore()
  
  return (
    <div className="max-w-4xl w-full h-full space-y-4 grid grid-cols-1">

      <div className="flex flex-col md:flex-row space-y-4">
        <div className="aspect-square bg-muted rounded-lg"></div>

        <FieldGroup>
          <Field>
            <FieldLabel>Name *</FieldLabel>
            <Input></Input>
          </Field>
          <Field>
            <FieldLabel>Description *</FieldLabel>
            <Textarea></Textarea>
          </Field>
        </FieldGroup>
      </div>

      <div className="flex items-center space-x-2">
        <Field>
          <FieldLabel>Quantity *</FieldLabel>
          <Input type="number" ></Input>
        </Field>
        <Field>
          <FieldLabel>Unit *</FieldLabel>
          <Input type="" ></Input>
        </Field>
      </div>

    </div>
  )
}