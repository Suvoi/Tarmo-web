import { create } from 'zustand'
import { z } from 'zod'
import { RecipeOverviewSchema, RecipeStepsSchema } from '../schemas/recipe-schemas'
import type { CreateRecipeRequest, UpdateRecipeRequest } from '../api'

type RecipeFormData = CreateRecipeRequest & UpdateRecipeRequest

type RecipeFormStore = {
    currentStage: number
    formData: Partial<RecipeFormData>
    mode: 'create' | 'edit'
    recipeId: number | null

    setCurrentStage: (stage: number) => void
    updateFormData: (data: Partial<RecipeFormData>) => void
    updateStep: (index: number, field: 'name' | 'instructions', value: string) => void
    addStep: () => void
    removeStep: (index: number) => void
    moveStepUp: (index: number) => void
    moveStepDown: (index: number) => void
    resetForm: () => void
    initializeForEdit: (recipeId: number, recipe: RecipeFormData) => void
    canGoToStage: (targetStage: number) => boolean
    getRecipeData: () => RecipeFormData
}

export const useRecipeFormStore = create<RecipeFormStore>((set, get) => ({
    currentStage: 0,
    formData: {
        steps: [],
        difficulty: 0,
    },
    mode: 'create',
    recipeId: null,

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

    resetForm: () => {
        set({
            currentStage: 0,
            formData: { steps: [], difficulty: 0 },
            mode: 'create',
            recipeId: null
        })
    },

    initializeForEdit: (recipeId: number, recipe: RecipeFormData) => {
        set({
            mode: 'edit',
            recipeId,
            formData: recipe,
            currentStage: 0
        })
    },

    canGoToStage: (targetStage) => {
        const { currentStage, formData } = get()

        if (targetStage <= currentStage) return true

        try {
            if (targetStage === 1) {
                RecipeOverviewSchema.parse(formData)
            } else if (targetStage === 2) {
                RecipeOverviewSchema.parse(formData)
                RecipeStepsSchema.parse(formData.steps)
            }
            return true
        } catch {
            return false
        }
    },

    getRecipeData: () => {
        const { formData } = get()
        return z.object({
            ...RecipeOverviewSchema.shape,
            steps: RecipeStepsSchema
        }).parse(formData) as RecipeFormData
    },
}))
