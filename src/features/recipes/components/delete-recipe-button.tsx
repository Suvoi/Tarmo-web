"use client"

import * as React from "react"
import { deleteRecipe } from "@/features/recipes/api"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { mutate } from "swr"

interface DeleteRecipeButtonProps extends Omit<React.ComponentPropsWithoutRef<"div">, "id"> {
  id: number
  trigger?: React.ReactNode
  showButton?: boolean
}

const DeleteRecipeButton = React.forwardRef<HTMLDivElement, DeleteRecipeButtonProps>(
  ({ id, trigger, showButton = true, className, ...props }, ref) => {
    const router = useRouter()

    async function handleDelete() {
      try {
        await deleteRecipe(id)
        router.push("/recipes")
        mutate("/recipes")
        toast.success("Recipe removed from your collection.")
      } catch (error) {
        console.error("Failed to delete recipe:", error)
        toast.error("Oops! Something went wrong.")
      } finally {
        router.refresh()
      }
    }

    const defaultTrigger = showButton ? (
      <Button variant="destructive" className={className}>
        <Trash /> Delete
      </Button>
    ) : (
      <div
        ref={ref}
        className={className}
        {...props}
      >
        <Trash /> Delete
      </div>
    )

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {trigger || defaultTrigger}
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this recipe?</AlertDialogTitle>
            <AlertDialogDescription>
              This action is permanent and can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDelete}
            >
              Delete recipe
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
)

DeleteRecipeButton.displayName = "DeleteRecipeButton"

export default DeleteRecipeButton
