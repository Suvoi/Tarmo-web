import { create } from 'zustand'
import { Recipe, recipeSchema } from '@/shared/schemas/recipe'

type RecipeFormStore = {
  currentStage: number
  formData: Partial<Recipe>
  
  setCurrentStage: (stage: number) => void
  updateFormData: (data: Partial<Recipe>) => void
  updateStep: (index: number, field: 'name' | 'instructions', value: string) => void
  addStep: () => void
  removeStep: (index: number) => void
  moveStepUp: (index: number) => void
  moveStepDown: (index: number) => void
  resetForm: () => void
  canGoToStage: (targetStage: number) => boolean
}

export const useRecipeFormStore = create<RecipeFormStore>((set, get) => ({
  currentStage: 0,
  formData: {
    steps: [],
  },
  
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
      const updatedSteps = [...(state.formData.steps || [])]
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
    set((state) => ({
      formData: {
        ...state.formData,
        steps: state.formData.steps?.filter((_, i) => i !== index) || []
      }
  })),

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
      formData: { steps: [] } 
    })
  },
  
  canGoToStage: (targetStage) => {
    const { currentStage, formData } = get()
    
    if (targetStage < currentStage) return true
    if (targetStage === currentStage) return true
    
    try {
      if (targetStage === 1) {
        recipeSchema.pick({
          name: true,
          description: true,
          img_url: true,
          difficulty: true,
          quantity: true,
          unit: true,
        }).parse(formData)
      } else if (targetStage === 2) {
        recipeSchema.pick({ steps: true }).parse(formData)
      }
      return true
    } catch {
      return false
    }
  },
}))