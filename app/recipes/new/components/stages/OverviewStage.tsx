import { Badge } from "@/components/ui/badge"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { useRecipeFormStore } from "@/store/recipe-form-store"
import { Flame, Coffee, Zap, ChartNoAxesColumn } from "lucide-react"

export function OverviewStage() {
    const formData = useRecipeFormStore((state) => state.formData)
    
    return (
        <div className="w-7/8 h-4/5 grid grid-cols-2 gap-2">
            <div className="space-y-3">
                <h2 className="text-4xl">{formData.name}</h2>
                <div className="flex space-x-2">
                    <Badge className="text-base">{formData.quantity} {formData.unit}</Badge>
                    <Badge className="text-base flex items-center gap-1">
                        {formData.difficulty === "Easy" ? <Zap size={64}/> 
                          : formData.difficulty === "Medium" ? <Coffee size={64}/> 
                          : formData.difficulty === "Hard" ? <Flame size={64}/> 
                          : <ChartNoAxesColumn />}
                        {formData.difficulty}
                    </Badge>
                </div>
                <p>
                    {formData.description}
                </p>
            </div>
            <div className="space-y-2 max-h-full overflow-auto">
                {formData.steps?.map((step, index) => (
                    <Item
                      key={index}
                      variant='outline'
                      size="default"
                    >
                      <ItemContent>
                        <ItemTitle className="text-lg">{index + 1}. {step.name || "(Unnamed)"}</ItemTitle>
                        {step.instructions && (
                          <ItemDescription className="overflow-x-hidden">
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