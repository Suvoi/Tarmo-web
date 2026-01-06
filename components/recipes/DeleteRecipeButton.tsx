"use client"

import { deleteRecipe } from "@/lib/api/recipes"
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

export default function DeleteRecipeButton({ id }: { id: string }) {
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
      alert("Error deleting recipe. Try again.")
    } finally {
      router.refresh()
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this recipe?</AlertDialogTitle>
          <AlertDialogDescription>
            This action is permanent and can’t be undone.
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
