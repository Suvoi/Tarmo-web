import { getRecipes } from "@/lib/api/recipes"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import RecipesView from "./RecipesView"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookDashed, Plus, Search } from "lucide-react"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

export default async function Page() {
  const initialRecipes = await getRecipes()
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
            <BreadcrumbItem>
              <BreadcrumbPage>Recipes</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="w-full pl-2 pr-3 pb-3 sticky top-16 z-30 flex space-x-2 bg-background">
        <ButtonGroup>
          <Button asChild>
            <Link href="/recipes/new">
              <Plus />
            </Link>
          </Button>
          <Button><BookDashed/></Button>
        </ButtonGroup>
        <InputGroup className="md:w-2/3 lg:w-1/3">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      </div>

      <div className="overflow-hidden flex-1">
        <RecipesView initial={initialRecipes} />
      </div>
    </div>
  )
}