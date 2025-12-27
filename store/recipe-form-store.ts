import { create } from 'zustand'
import { RecipeForm } from '@/shared/schemas/recipe'

type RecipeFormStore = {
  currentStage: number
  formData: Partial<RecipeForm>
  
  setCurrentStage: (stage: number) => void
  updateFormData: (data: Partial<RecipeForm>) => void
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