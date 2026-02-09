import type { components } from "@/lib/api/types.gen"
import { logger } from "@/lib/logger"
import { generateMockTemplates } from "./templates-mock"

type Schema = components["schemas"]
export type Template = Schema["TemplateJSONResponseDTO"]
export type TemplateListItem = Schema["TemplateListJSONResponseDTO"]
export type CreateTemplateRequest = Schema["CreateTemplateRequestDTO"]
export type UpdateTemplateRequest = Schema["UpdateTemplateRequestDTO"]

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:9136"
const mode = process.env.NEXT_PUBLIC_API_MODE ?? "real"

const headers = { "Content-Type": "application/json" }

export async function getTemplates(): Promise<TemplateListItem[]> {
    logger.info("getTemplates: start", { mode })
    if (mode === "mock") return generateMockTemplates()

    try {
        const res = await fetch(`${API_URL}/templates`, {
            cache: "no-store",
            headers,
        })
        if (!res.ok) throw new Error("Could not connect to the API")
        return await res.json()
    } catch (error) {
        logger.error("getTemplates: failed", error)
        throw error
    }
}

export async function getTemplate(id: number): Promise<Template | null> {
    logger.info("getTemplate: start", { id, mode })
    if (mode === "mock") {
        return generateMockTemplates().find(r => r.id === Number(id)) || null
    }

    try {
        const res = await fetch(`${API_URL}/templates/${id}`, {
            cache: "no-store",
            headers,
        })
        if (res.status === 404) return null
        if (!res.ok) throw new Error("Could not connect to the API")
        return await res.json()
    } catch (error) {
        logger.error("getTemplate: failed", { id, error })
        return null
    }
}

export async function createTemplate(template: CreateTemplateRequest) {
    logger.info("createTemplate: start", { mode })
    if (mode === "mock") return

    try {
        const res = await fetch(`${API_URL}/templates`, {
            method: "POST",
            headers,
            body: JSON.stringify(template),
            cache: "no-store",
        })
        if (!res.ok) throw new Error("Could not create template")
        logger.info("createTemplate: success")
    } catch (error) {
        logger.error("createTemplate: failed", { template, error })
        throw error
    }
}

export async function updateTemplate(id: number, template: UpdateTemplateRequest) {
    logger.info("updateTemplate: start", { id, mode })
    if (mode === "mock") return

    try {
        const res = await fetch(`${API_URL}/templates/${id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(template),
            cache: "no-store",
        })
        if (res.status === 404) throw new Error("Template not found")
        if (!res.ok) throw new Error("Could not update template")
        logger.info("updateTemplate: success", { id })
    } catch (error) {
        logger.error("updateTemplate: failed", { id, template, error })
        throw error
    }
}

export async function deleteTemplate(id: number) {
    logger.info("deleteTemplate: start", { id })
    try {
        const res = await fetch(`${API_URL}/templates/${id}`, {
            method: "DELETE",
            headers,
            cache: "no-store",
        })
        if (res.status === 404) throw new Error("Template not found")
        if (!res.ok) throw new Error("Failed to delete template")
        logger.info("deleteTemplate: success", { id })
    } catch (error) {
        logger.error("deleteTemplate: failed", { id, error })
        throw error
    }
}
