"use client"
import useSWR from "swr"
import { getRecipes, type RecipeListItem } from "@/features/recipes/api"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Inbox, PencilLine } from "lucide-react"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import DeleteRecipeButton from "./delete-recipe-button"

const fetcher = () => getRecipes()

export default function RecipesView({ initial }: { initial: RecipeListItem[] }) {
  const { data } = useSWR("/recipes", fetcher, {
    fallbackData: initial,
    refreshInterval: 5000,
  })

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <div className="h-full w-full flex flex-col p-4 pt-2 overflow-hidden">
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Inbox />
              </EmptyMedia>
              <EmptyTitle className="text-lg">Looks a bit empty…</EmptyTitle>
              <EmptyDescription className="text-lg">
                Add a recipe to start building your collection.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild size="lg">
                <Link href="/recipes/new">Add a recipe</Link>
              </Button>
            </EmptyContent>
          </Empty>
        </div>
      ) : (
        <motion.div
          className="overflow-y-auto overflow-x-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <ItemGroup className="grid gap-4 grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 auto-rows-min p-1">
            {data.map((recipe) => (
              <motion.div
                key={recipe.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03, zIndex: 10 }}
                whileTap={{ scale: 0.97 }}
                className="relative"
                style={{ transformOrigin: "center center" }}
              >
                <ContextMenu>
                  <ContextMenuTrigger>
                    <Link href={`/recipes/${recipe.id}`}>
                      <Item variant="outline">
                        <ItemMedia variant="image">
                          <Image
                            src="https://placehold.co/100"
                            alt={recipe.name ?? "Recipe image"}
                            width={128}
                            height={128}
                            className="aspect-square w-full rounded-sm object-cover"
                            unoptimized
                          />
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>{recipe.name ?? "Untitled"}</ItemTitle>
                          <ItemDescription>{recipe.description ?? "No description"}</ItemDescription>
                        </ItemContent>
                      </Item>
                    </Link>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem asChild>
                      <Link href={`/recipes/${recipe.id}/edit`}><PencilLine />Edit</Link>
                    </ContextMenuItem>
                    <ContextMenuItem asChild variant="destructive" onSelect={(e) => e.preventDefault()}>
                      <DeleteRecipeButton id={recipe.id!} showButton={false} />
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </motion.div>
            ))}
          </ItemGroup>
        </motion.div>
      )}
    </div>
  )
}