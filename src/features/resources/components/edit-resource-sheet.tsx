"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet"
import { Resource } from "../api/resources-api"
import { updateResourceAction } from "../api/resource-actions"
import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditResourceSheetProps {
    resource: Resource
    trigger?: React.ReactNode
}

export function EditResourceSheet({ resource, trigger }: EditResourceSheetProps) {
    const [open, setOpen] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        await updateResourceAction(resource.id!, formData)
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Resource</SheetTitle>
                    <SheetDescription>
                        Make changes to your resource here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={resource.name}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            name="description"
                            defaultValue={resource.description}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="price">Price (in cents)</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            defaultValue={resource.price}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="quantity">Base Quantity</Label>
                        <Input
                            id="quantity"
                            name="quantity"
                            type="number"
                            step="0.01"
                            defaultValue={resource.base_quantity || 1}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="unit">Base Unit</Label>
                        <Select name="unit" defaultValue={resource.base_unit}>
                            <SelectTrigger className="w-full">
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
                    <SheetFooter className="mt-4">
                        <Button type="submit">Save changes</Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}
