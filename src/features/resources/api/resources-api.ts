import type { components } from "@/lib/api/types.gen"
import { logger } from "@/lib/logger"

type Schema = components["schemas"]

export type Resource = Schema["ResourceJSONResponseDTO"]
export type CreateResourceRequest = Schema["CreateResourceRequestDTO"]
export type UpdateResourceRequest = Schema["UpdateResourceRequestDTO"]

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:9136"

const headers = { "Content-Type": "application/json" }

export async function getResources(): Promise<Resource[]> {
    logger.info("getResources: start")
    try {
        const res = await fetch(`${API_URL}/resources`, {
            cache: "no-store",
            headers,
        })
        if (!res.ok) throw new Error("Could not connect to the API")
        return await res.json()
    } catch (error) {
        logger.error("getResources: failed", error)
        throw error
    }
}

export async function createResource(resource: CreateResourceRequest) {
    logger.info("createResource: start")
    try {
        const res = await fetch(`${API_URL}/resources`, {
            method: "POST",
            headers,
            body: JSON.stringify(resource),
            cache: "no-store",
        })
        if (!res.ok) throw new Error("Could not create resource")
        logger.info("createResource: success")
    } catch (error) {
        logger.error("createResource: failed", { resource, error })
        throw error
    }
}

export async function deleteResource(id: number) {
    logger.info("deleteResource: start")
    try {
        const res = await fetch(`${API_URL}/resources/${id}`, {
            method: "DELETE",
            headers,
            cache: "no-store",
        })
        if (!res.ok) throw new Error("Could not delete resource")
        logger.info("deleteResource: success")
    } catch (error) {
        logger.error("deleteResource: failed", { id, error })
        throw error
    }
}
export async function updateResource(id: number, resource: UpdateResourceRequest) {
    logger.info("updateResource: start")
    try {
        const res = await fetch(`${API_URL}/resources/${id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify({ ...resource, id }),
            cache: "no-store",
        })
        if (!res.ok) throw new Error("Could not update resource")
        logger.info("updateResource: success")
    } catch (error) {
        logger.error("updateResource: failed", { id, resource, error })
        throw error
    }
}
