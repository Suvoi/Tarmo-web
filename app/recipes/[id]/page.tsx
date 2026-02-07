import { getRecipe } from "@/features/recipes/api"
import { RecipeDetailView } from "@/features/recipes/components/recipe-detail-view"
import { notFound } from "next/navigation"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, PencilLine } from "lucide-react"
import DeleteRecipeButton from "@/features/recipes/components/delete-recipe-button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params

  const recipe = await getRecipe(id)

  if (!recipe) {
    notFound()
  }

  return (
    <div className="h-full w-full flex flex-col justify-between">
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
            <BreadcrumbItem>
              <BreadcrumbPage>{recipe.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="w-full px-4 flex-1">
        <RecipeDetailView recipe={recipe} />
      </div>

      <footer className="p-4 flex justify-between">
        <Button asChild variant="ghost">
          <Link href="/recipes/"><ArrowLeft />Back</Link>
        </Button>



        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild variant="ghost">
              <Link href={`/recipes/${id}/edit`}><PencilLine /></Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>

        <DeleteRecipeButton id={id} showButton={true} />

      </footer>
    </div>
  )
}
