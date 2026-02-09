"use client"

import { TemplateFormWrapper } from "@/app/templates/new/components/TemplateFormWrapper"
import { useTemplateFormStore } from "@/features/templates/store/template-form-store"
import { useEffect } from "react"
import type { Template } from "@/features/templates/api"

interface EditTemplateClientProps {
    templateId: number
    template: Template
}

export function EditTemplateClient({ templateId, template }: EditTemplateClientProps) {
    const { initializeForEdit } = useTemplateFormStore()

    useEffect(() => {
        if (template) {
            initializeForEdit(templateId, template)
        }
    }, [templateId, template, initializeForEdit])

    return <TemplateFormWrapper mode="edit" templateId={templateId} />
}
