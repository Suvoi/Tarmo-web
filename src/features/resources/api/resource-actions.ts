"use server"

import { revalidatePath } from "next/cache"
import { createResource, updateResource } from "./resources-api"

export async function addResourceAction(formData: FormData) {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const priceStr = formData.get("price") as string

    const price = parseInt(priceStr) || 0

    await createResource({
        name,
        description,
        price,
    })

    revalidatePath("/resources")
}

export async function updateResourceAction(id: number, formData: FormData) {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const priceStr = formData.get("price") as string

    const price = parseInt(priceStr) || 0

    await updateResource(id, {
        name,
        description,
        price,
    })

    revalidatePath("/resources")
}
