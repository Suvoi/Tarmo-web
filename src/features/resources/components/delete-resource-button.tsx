"use client"

import * as React from "react"
import { deleteResource } from "@/features/resources/api"
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

interface DeleteResourceButtonProps extends Omit<React.ComponentPropsWithoutRef<"div">, "id"> {
  id: number
  trigger?: React.ReactNode
  showButton?: boolean
}

const DeleteResourceButton = React.forwardRef<HTMLDivElement, DeleteResourceButtonProps>(
  ({ id, trigger, showButton = true, className, ...props }, ref) => {
    const router = useRouter()

    async function handleDelete() {
      try {
        await deleteResource(id)
        router.push("/resources")
        mutate("/resources")
        toast.success("Resource removed from your collection.")
      } catch (error) {
        console.error("Failed to delete resource:", error)
        toast.error("Oops! Something went wrong.")
      } finally {
        router.refresh()
      }
    }

    const defaultTrigger = (
      <Button variant="destructive" className={className}>
        <Trash /> Delete
      </Button>
    )

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {trigger || defaultTrigger}
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this resource?</AlertDialogTitle>
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
              Delete resource
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
)

DeleteResourceButton.displayName = "DeleteResourceButton"

export default DeleteResourceButton
