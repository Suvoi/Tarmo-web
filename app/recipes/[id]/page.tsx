import { getRecipe } from "@/lib/api/recipes"
import { RecipeDetailView } from "@/components/recipes/RecipeDetailView"
import { notFound } from "next/navigation"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Trash } from "lucide-react"
import DeleteRecipeButton from "@/components/recipes/DeleteRecipeButton"

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>
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
        <Button asChild variant="secondary">
          <Link href="/recipes/"><ArrowLeft />Back</Link>
        </Button>

        <DeleteRecipeButton id={id}/>
      </footer>
    </div>
  )
}
