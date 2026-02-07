import { RecipeFormWrapper } from "../../new/components/RecipeFormWrapper"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { getRecipe } from "@/features/recipes/api"
import { notFound } from "next/navigation"
import { EditRecipeClient } from "./EditRecipeClient"

export default async function EditRecipePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const recipe = await getRecipe(Number(id))

    if (!recipe) {
        notFound()
    }

    return (
        <div className="h-full flex flex-col">
            <header className="bg-background flex sticky top-0 z-30 h-16 shrink-0 items-center gap-2 px-4 w-full">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/">
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/recipes">
                                Recipes
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href={`/recipes/${id}`}>
                                {recipe.name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Edit</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <EditRecipeClient recipeId={Number(id)} recipe={recipe} />
        </div>
    )
}
