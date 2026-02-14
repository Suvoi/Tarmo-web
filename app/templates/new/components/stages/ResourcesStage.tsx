"use client"

import { useTemplateFormStore } from "@/features/templates/store/template-form-store"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { ResourceSelector } from "@/features/resources/components/resource-selector"
import { getResources } from "@/features/resources/api/resources-api"
import useSWR from "swr"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { format } from "path"
import { formatPrice } from "@/lib/format/price"
import { formatQuantity } from "@/lib/format/quantity"

export function ResourcesStage() {
    const { formData, addResource, removeResource, updateResource } = useTemplateFormStore()
    const { data: resources = [] } = useSWR("/resources", getResources)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)

    const selectedResources = formData.resources || []
    const currentResourceRef = editingIndex !== null ? selectedResources[editingIndex] : null
    const currentResource = resources.find(r => r.id === currentResourceRef?.resource_id)

    return (
        <div className="w-full h-full sm:max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* LEFT PANEL - RESOURCE LIST */}
            <div className="py-4 flex flex-col gap-2 overflow-hidden">
                <h3 className="font-semibold text-2xl mb-2 shrink-0">Resources ({selectedResources.length})</h3>

                <div className="mb-4 shrink-0">
                    <ResourceSelector
                        onSelect={(id) => {
                            addResource(id)
                            setEditingIndex(selectedResources.length)
                        }}
                        excludeIds={selectedResources.map(r => r.resource_id!)}
                    />
                </div>

                <div className="space-y-2 flex-1 overflow-y-auto min-h-0">
                    {selectedResources.map((ref, index) => {
                        const resource = resources.find(r => r.id === ref.resource_id)
                        return (
                            <Item
                                key={index}
                                onClick={() => setEditingIndex(index)}
                                variant={editingIndex === index ? 'muted' : 'outline'}
                                className="cursor-pointer"
                            >
                                <ItemContent>
                                    <ItemTitle className="text-xl">{resource?.name || "Loading..."}</ItemTitle>
                                    <ItemDescription className="text-lg">
                                        {formatQuantity(ref.quantity!, ref.unit!)}
                                    </ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                    <Button
                                        size="icon-sm"
                                        variant="ghost"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeResource(index)
                                            if (editingIndex === index) setEditingIndex(null)
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </ItemActions>
                            </Item>
                        )
                    })}
                </div>
            </div>

            {/* RIGHT PANEL - DETAILS */}
            <div className="p-4 flex flex-col gap-4 overflow-y-auto">
                <h3 className="font-semibold">
                    {editingIndex !== null ? "Edit Details" : "Resource Details"}
                </h3>

                {editingIndex !== null && currentResourceRef && currentResource ? (
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <Label className="text-muted-foreground">Resource</Label>
                            <div className="text-lg font-medium">{currentResource.name}</div>
                            <p className="text-sm text-muted-foreground">{currentResource.description}</p>
                            <Badge>{formatPrice(currentResource.price!)} / {formatQuantity(currentResource.base_quantity!, currentResource.base_unit!)}</Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    step="0.01"
                                    value={currentResourceRef.quantity}
                                    onChange={(e) => updateResource(editingIndex, { quantity: parseFloat(e.target.value) })}
                                    min={0}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="unit">Unit</Label>
                                <Select name="unit"
                                    value={currentResourceRef.unit}
                                    onValueChange={(value) =>
                                        updateResource(editingIndex, { unit: value })
                                    }>
                                    <SelectTrigger className="w-32">
                                        <SelectValue placeholder="Unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Units</SelectLabel>
                                            <SelectItem value="kg">Kilograms</SelectItem>
                                            <SelectItem value="g">Grams</SelectItem>
                                            <SelectItem value="mg">Milligrams</SelectItem>
                                            <SelectItem value="l">Liters</SelectItem>
                                            <SelectItem value="ml">Milliliters</SelectItem>
                                            <SelectItem value="pcs">Pieces</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground text-center">
                        Select a resource from the list or add a new one to edit its quantity and unit.
                    </div>
                )}
            </div>
        </div>
    )
}
