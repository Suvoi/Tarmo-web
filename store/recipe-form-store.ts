import { create } from 'zustand'
import { Recipe } from '@/shared/schemas/recipe'

type RecipeFormStore = {
  currentStage: number
  formData: Partial<Recipe>
  
  setCurrentStage: (stage: number) => void
  updateFormData: (data: Partial<Recipe>) => void
  updateStep: (index: number, field: 'name' | 'instructions', value: string) => void
  addStep: () => void
  removeStep: (index: number) => void
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
    
    // TODO: implementar validación por stage
    return true
  },
}))