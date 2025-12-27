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
     className="flex h-full w-full flex-col gap-6 p-4 pt-2"
     variants={containerVariants}
      initial="hidden"
      animate="show"
    >
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
    </motion.div>
  )
}
