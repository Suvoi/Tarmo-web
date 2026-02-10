import { create } from 'zustand'
import { z } from 'zod'
import { TemplateOverviewSchema, TemplateStepsSchema, TemplateResourcesSchema } from '../schemas/template-schemas'
import type { CreateTemplateRequest, UpdateTemplateRequest } from '../api'

type TemplateFormData = CreateTemplateRequest & UpdateTemplateRequest

type TemplateFormStore = {
    currentStage: number
    formData: Partial<TemplateFormData>
    mode: 'create' | 'edit'
    templateId: number | null

    setCurrentStage: (stage: number) => void
    updateFormData: (data: Partial<TemplateFormData>) => void
    updateStep: (index: number, field: 'name' | 'instructions', value: string) => void
    addStep: () => void
    removeStep: (index: number) => void
    moveStepUp: (index: number) => void
    moveStepDown: (index: number) => void

    // Resource actions
    addResource: (resourceId: number) => void
    removeResource: (index: number) => void
    updateResource: (index: number, data: Partial<NonNullable<TemplateFormData['resources']>[number]>) => void

    resetForm: () => void
    initializeForEdit: (templateId: number, template: TemplateFormData) => void
    canGoToStage: (targetStage: number) => boolean
    getTemplateData: () => TemplateFormData
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
                    { resource_id: resourceId, quantity: 1, unit: "pcs" }
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

    initializeForEdit: (templateId: number, template: TemplateFormData) => {
        set({
            mode: 'edit',
            templateId,
            formData: template,
            currentStage: 0
        })
    },

    canGoToStage: (targetStage) => {
        const { currentStage, formData } = get()

        if (targetStage <= currentStage) return true

        try {
            if (targetStage === 1) {
                TemplateOverviewSchema.parse(formData)
            } else if (targetStage === 2) {
                TemplateOverviewSchema.parse(formData)
                TemplateStepsSchema.parse(formData.steps)
            } else if (targetStage === 3) {
                TemplateOverviewSchema.parse(formData)
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
        return z.object({
            ...TemplateOverviewSchema.shape,
            steps: TemplateStepsSchema,
            resources: TemplateResourcesSchema
        }).parse(formData) as TemplateFormData
    },
}))
