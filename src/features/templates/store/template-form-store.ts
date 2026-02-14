import { create } from 'zustand'
import { z } from 'zod'
import {
    TemplateFormData,
    TemplateFormBaseSchema,
    TemplateStepsSchema,
    TemplateResourcesSchema,
    CreateTemplateSchema,
    CreateTemplateRequest,
    UpdateTemplateRequest
} from '../schemas/template-schemas'
import type { Template } from '../api/templates-api'

type TemplateFormDataType = TemplateFormData


type TemplateFormStore = {
    currentStage: number
    formData: Partial<TemplateFormDataType>
    mode: 'create' | 'edit'
    templateId: number | null

    setCurrentStage: (stage: number) => void
    updateFormData: (data: Partial<TemplateFormDataType>) => void
    updateStep: (index: number, field: 'name' | 'instructions', value: string) => void
    addStep: () => void
    removeStep: (index: number) => void
    moveStepUp: (index: number) => void
    moveStepDown: (index: number) => void

    // Resource actions
    addResource: (resourceId: number) => void
    removeResource: (index: number) => void
    updateResource: (index: number, data: Partial<NonNullable<TemplateFormDataType['resources']>[number]>) => void

    resetForm: () => void
    initializeForEdit: (templateId: number, template: Template) => void
    canGoToStage: (targetStage: number) => boolean
    getTemplateData: () => CreateTemplateRequest
}

export const useTemplateFormStore = create<TemplateFormStore>((set, get) => ({
    currentStage: 0,
    formData: {
        steps: [],
        difficulty: 0,
    },
    mode: 'create',
    templateId: null,

    setCurrentStage: (stage) => {
        set({ currentStage: stage })
    },

    updateFormData: (data) => {
        set((state) => ({
            formData: { ...state.formData, ...data }
        }))
    },

    updateStep: (index: number, field: 'name' | 'instructions', value: string) =>
        set((state) => {
            const steps = state.formData.steps || []
            if (index < 0 || index >= steps.length) return state

            const updatedSteps = [...steps]
            updatedSteps[index] = { ...updatedSteps[index], [field]: value }
            return { formData: { ...state.formData, steps: updatedSteps } }
        }),

    addStep: () =>
        set((state) => ({
            formData: {
                ...state.formData,
                steps: [...(state.formData.steps || []), { name: "", instructions: "" }]
            }
        })),

    removeStep: (index: number) =>
        set((state) => {
            const steps = state.formData.steps || []
            if (index < 0 || index >= steps.length) return state

            return {
                formData: {
                    ...state.formData,
                    steps: steps.filter((_: any, i: number) => i !== index)
                }
            }
        }),

    moveStepUp: (index: number) =>
        set((state) => {
            if (index === 0) return state

            const steps = [...(state.formData.steps || [])]
                ;[steps[index - 1], steps[index]] = [steps[index], steps[index - 1]]

            return { formData: { ...state.formData, steps } }
        }),

    moveStepDown: (index: number) =>
        set((state) => {
            const steps = [...(state.formData.steps || [])]
            if (index === steps.length - 1) return state

                ;[steps[index], steps[index + 1]] = [steps[index + 1], steps[index]]

            return { formData: { ...state.formData, steps } }
        }),

    addResource: (resourceId: number) =>
        set((state) => ({
            formData: {
                ...state.formData,
                resources: [
                    ...(state.formData.resources || []),
                    { resource_id: resourceId, quantity: 1, unit: 'pcs' }
                ]
            }
        })),

    removeResource: (index: number) =>
        set((state) => ({
            formData: {
                ...state.formData,
                resources: (state.formData.resources || []).filter((_, i) => i !== index)
            }
        })),

    updateResource: (index: number, data: Partial<NonNullable<TemplateFormData['resources']>[number]>) =>
        set((state) => {
            const resources = [...(state.formData.resources || [])]
            if (index < 0 || index >= resources.length) return state
            resources[index] = { ...resources[index], ...data }
            return { formData: { ...state.formData, resources } }
        }),

    resetForm: () => {
        set({
            currentStage: 0,
            formData: { steps: [], resources: [], difficulty: 0 },
            mode: 'create',
            templateId: null
        })
    },

    initializeForEdit: (templateId: number, template: Template) => {
        // Transform API response to form data
        const formData: Partial<TemplateFormDataType> = {
            name: template.name ?? '',
            description: template.description ?? null,
            difficulty: template.difficulty ?? 0,
            quantity: template.quantity ?? 1,
            unit: template.unit ?? '',
            steps: template.steps?.map(step => ({
                name: step.name ?? '',
                instructions: step.instructions ?? null,
            })) ?? [],
            resources: template.resources?.map(res => ({
                resource_id: res.resource_id ?? 0,
                quantity: res.quantity ?? 0,
                unit: res.unit ?? '',
            })) ?? [],
        }

        set({
            mode: 'edit',
            templateId,
            formData,
            currentStage: 0
        })
    },

    canGoToStage: (targetStage) => {
        const { currentStage, formData } = get()

        if (targetStage <= currentStage) return true

        try {
            if (targetStage === 1) {
                TemplateFormBaseSchema.parse(formData)
            } else if (targetStage === 2) {
                TemplateFormBaseSchema.parse(formData)
                TemplateStepsSchema.parse(formData.steps)
            } else if (targetStage === 3) {
                TemplateFormBaseSchema.parse(formData)
                TemplateStepsSchema.parse(formData.steps)
                TemplateResourcesSchema.parse(formData.resources)
            }
            return true
        } catch {
            return false
        }
    },

    getTemplateData: () => {
        const { formData } = get()
        const parsed = CreateTemplateSchema.parse(formData) as TemplateFormDataType

        // Transform null to undefined for API compatibility
        return {
            ...parsed,
            description: parsed.description ?? undefined,
            steps: parsed.steps.map(step => ({
                ...step,
                instructions: step.instructions ?? undefined,
            })),
        }
    },
}))
