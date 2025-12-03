"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { recipeSchema, type Recipe } from "@/shared/schemas/recipe"

import { AppSidebar } from "@/components/app-sidebar"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Textarea } from "@/components/ui/textarea"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FieldSet, FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import Link from "next/link"
import { Undo2 } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function Page() {
  const { register, handleSubmit, reset } = useForm<Recipe>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      description: "",
      instructions: "",
      quantity: "",
      unit: "",
      difficulty: "",
      img_url: "",
    },
  })

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: Recipe) => {
    setLoading(true)
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      router.push("/recipes")
      toast.success("Recipe created successfully!")
      reset()
    } catch (err) {
      console.error("Failed to create recipe:", err)
      toast.error(`There was an error connecting to the server.`, { description: "Please try again later." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <SidebarProvider style={{ "--sidebar-width": "14rem" } as React.CSSProperties}>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-full">

        {/* Header Breadcrumb */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/recipes">Recipes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>New</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Title */}
        <div className="flex items-center space-x-2 m-4">
          <Link href="/recipes">
            <Undo2 className="size-5" />
          </Link>
          <h1 className="text-2xl font-bold">New Recipe</h1>
        </div>

        {/* Form container centered */}
        <div className="border flex flex-1 items-center p-6">
          <div className="border w-full max-w-lg p-6 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input id="name" {...register("name")} autoComplete="off" required />
                  </Field>
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea {...register("description")} className="max-h-50 h-32" />
                  </Field>
                </FieldGroup>
              </FieldSet>

              {/* Button aligned right */}
              <div className="flex justify-between">
                <Link href="/recipes">
                  <Button variant="secondary" className="w-32 cursor-pointer">
                    Back
                  </Button>
                </Link>
                <Button type="submit" disabled={loading} className="w-32 cursor-pointer">
                  {loading ? <Spinner /> : "Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
