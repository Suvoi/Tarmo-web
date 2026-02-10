"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addResourceAction } from "../api/resource-actions"
import { useRef } from "react"

export function ResourceForm() {
    const formRef = useRef<HTMLFormElement>(null)

    const clientAction = async (formData: FormData) => {
        await addResourceAction(formData)
        formRef.current?.reset()
    }

    return (
        <form
            ref={formRef}
            action={clientAction}
            className="w-full pl-2 pr-3 pb-3 sticky top-16 z-30 flex space-x-2 bg-background"
        >
            <Input name="name" placeholder="Name" required />
            <Input name="description" placeholder="Description" />
            <Input name="price" type="number" placeholder="Price (in cents)" required />
            <Button type="submit">Add</Button>
        </form>
    )
}
