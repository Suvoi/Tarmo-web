import { Badge } from "@/components/ui/badge"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { useRecipeFormStore } from "@/store/recipe-form-store"
import { Flame, Coffee, Zap, ChartNoAxesColumn } from "lucide-react"

export function OverviewStage() {
    const formData = useRecipeFormStore((state) => state.formData)
    
    return (
        <div className="h-full lg:w-7/8 lg:h-4/5 grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="space-y-3 p-2">
                <h2 className="text-4xl mb-6">{formData.name}</h2>
                <div className="flex space-x-2">
                    <Badge className="text-base">{formData.quantity} {formData.unit}</Badge>
                    <Badge className="text-base flex items-center gap-1">
                        {formData.difficulty === "Easy" ? <Zap size={16}/> 
                          : formData.difficulty === "Medium" ? <Coffee size={16}/> 
                          : formData.difficulty === "Hard" ? <Flame size={16}/> 
                          : <ChartNoAxesColumn size={16}/>}
                        {formData.difficulty}
                    </Badge>
                </div>
                <p className="text-base leading-relaxed">
                    {formData.description}
                </p>
            </div>
            <div className="space-y-2 max-h-full lg:overflow-y-auto p-2">
                {formData.steps?.map((step, index) => (
                    <Item
                      key={index}
                      variant='outline'
                      size="default"
                      className="h-auto"
                    >
                      <ItemContent>
                        <ItemTitle className="text-xl">
                          {index + 1}. {step.name || "(Unnamed)"}
                        </ItemTitle>
                        {step.instructions && (
                          <ItemDescription className="text-base line-clamp-none">
                            {step.instructions}
                          </ItemDescription>
                        )}
                      </ItemContent>
                    </Item>
                  ))}
            </div>
        </div>
    )
}