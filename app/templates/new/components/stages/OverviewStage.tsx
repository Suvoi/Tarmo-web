"use client"

import { TemplateDetailView } from "@/features/templates/components/template-detail-view"
import { useTemplateFormStore } from "@/features/templates/store/template-form-store"

export function OverviewStage() {
    const { getTemplateData } = useTemplateFormStore()

    const validTemplate = getTemplateData()

    return (
        <TemplateDetailView template={validTemplate} />
    )
}