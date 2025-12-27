"use client"

import useSWR from "swr"
import { getRecipes } from "@/lib/api/recipes"
import { Recipe } from "@/shared/schemas/recipe"
import { motion } from "framer-motion"

import Image from "next/image"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item"
import { Inbox } from "lucide-react"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const fetcher = () => getRecipes()

export default function RecipesView({ initial }: {initial: Recipe[] }) {
  const { data, mutate } = useSWR("/items", fetcher, {
    fallbackData: initial,
    refreshInterval: 1000,
  })

  // Animation stuff
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
    <motion.div
     className="h-full w-full flex-col p-4 pt-2"
     variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      { data.length==0 ? (
        <div className="flex items-center justify-center h-full">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Inbox />
              </EmptyMedia>
              <EmptyTitle className="text-xl">Looks a bit empty…</EmptyTitle>
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
        <ItemGroup className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {data.map((recipe) => (
          <motion.div
            key={recipe.name}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Item key={recipe.name} variant="muted">
              <ItemHeader>
                <Image
                  src={recipe.img_url}
                  alt={recipe.name}
                  width={128}
                  height={128}
                  className="aspect-square w-full rounded-sm object-cover"
                />
              </ItemHeader>
              <ItemContent>
                <ItemTitle>{recipe.name}</ItemTitle>
                <ItemDescription>{recipe.description}</ItemDescription>
              </ItemContent>
            </Item>
          </motion.div>
        ))}
      </ItemGroup>
      )

      }
    </motion.div>
  )
}
