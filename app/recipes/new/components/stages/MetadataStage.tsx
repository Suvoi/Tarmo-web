"use client"
import { useRecipeFormStore } from "@/store/recipe-form-store"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldLabel } from "@/components/ui/field"

export function MetadataStage() {
  const { formData, updateFormData } = useRecipeFormStore()
  
  return (
    <div className="max-w-4xl sm:1/2 xl:w-1/3 flex flex-col space-y-4">
      {/* Name */}
      <Field>
        <FieldLabel>Name *</FieldLabel>
        <Input 
          placeholder="e.g Pepperoni Pizza"
          value={formData.name || ""}
          onChange={(e) => updateFormData({ name: e.target.value })}
        />
      </Field>
      
      {/* Difficulty */}
      <Field>
        <FieldLabel>Difficulty *</FieldLabel>
        <Select 
          value={formData.difficulty?.toString() || ""}
          onValueChange={(value) => updateFormData({ difficulty: parseInt(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="e.g Medium" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="1">Easy</SelectItem>
              <SelectItem value="2">Medium</SelectItem>
              <SelectItem value="3">Hard</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Quantity */}
        <Field>
          <FieldLabel>Quantity *</FieldLabel>
          <Input 
            type="number" 
            placeholder="e.g 2"
            value={formData.quantity || ""}
            onChange={(e) => updateFormData({ quantity: parseFloat(e.target.value) || 0 })}
          />
        </Field>
        
        {/* Unit */}
        <Field>
          <FieldLabel>Unit *</FieldLabel>
          <Select
            value={formData.unit || ""}
            onValueChange={(value) => updateFormData({ unit: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="e.g Pieces" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Pieces">Pieces</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Weight</SelectLabel>
                <SelectItem value="Kilograms">Kilograms (kg)</SelectItem>
                <SelectItem value="Grams">Grams (g)</SelectItem>
                <SelectItem value="Miligrams">Miligrams (mg)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Volume</SelectLabel>
                <SelectItem value="Liters">Liters (l)</SelectItem>
                <SelectItem value="Mililiters">Mililiters (ml)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>
      
      {/* Description */}
      <Field>
        <FieldLabel>Description</FieldLabel>
        <Textarea 
          className="max-h-40" 
          placeholder="Delicious yummy pizza..."
          value={formData.description || ""}
          onChange={(e) => updateFormData({ description: e.target.value })}
        />
      </Field>
    </div>
  )
}