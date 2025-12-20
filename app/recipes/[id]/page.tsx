'use client'

import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Image from 'next/image'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { ChevronLeft, Trash2 } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { Badge } from '@/components/ui/badge'

import { Recipe } from '@/shared/schemas/recipe'
import Steps from './components/Steps'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  async function deleteRecipe() {
    try {
      await fetch(`/api/recipes/${id}`, { method: 'DELETE' })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    async function loadRecipe() {
      try {
        const res = await fetch(`/api/recipes/${id}`, {
          cache: 'no-store',
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setRecipe(data)
        console.log(data)
      } catch (err) {
        console.error(err)
        setRecipe(null)
      } finally {
        setLoading(false)
      }
    }

    loadRecipe()
  }, [id])

  return (
    <SidebarProvider style={{ '--sidebar-width': '14rem' } as React.CSSProperties}>
      <AppSidebar />
      <SidebarInset className='flex h-screen flex-col'>
        {/* Breadcrumb */}
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className='hidden md:block'>
                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='hidden md:block' />
              <BreadcrumbItem className='hidden md:block'>
                <BreadcrumbLink href='/recipes'>Recipes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='hidden md:block' />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {recipe ? recipe.name : loading ? 'Loading...' : 'Not found'}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main content */}
        <div className='flex flex-1 flex-col overflow-y-scroll p-4'>
          {loading ? (
            <Spinner />
          ) : !recipe ? (
            <h1 className='text-xl font-medium'>Recipe not found</h1>
          ) : (
            <>
              <div className='w-full flex-1 space-y-4'>
                <div className='flex justify-between space-x-4'>
                  <div className='flex w-4/5 space-x-4'>
                    <Image
                      src={recipe.img_url}
                      alt=''
                      className='rounded-lg'
                      width='150'
                      height='150'
                      unoptimized
                    />
                    <div className='flex flex-col justify-between'>
                      <div className=''>
                        <h1 className='text-3xl'>{recipe.name}</h1>
                        <p className='text-lg'>{recipe.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex w-1/5 flex-col items-end justify-start space-y-2'>
                    <Badge variant='secondary'>
                      {recipe.quantity} {recipe.unit}
                    </Badge>
                    <Badge variant='secondary'>{recipe.difficulty}</Badge>
                  </div>
                </div>
                <Steps steps={recipe.steps} />
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        <footer className='flex h-16 w-full items-center justify-between p-4 text-lg underline'>
          <Link href='/recipes'>
            <Button variant='outline' className='cursor-pointer'>
              <ChevronLeft />
              Back
            </Button>
          </Link>
          <div className='space-x-4'>
            <Dialog>
              <DialogTrigger>
                <Button variant='destructive' className='cursor-pointer'>
                  <Trash2 />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Recipe?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete this recipe.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className='flex justify-between!'>
                  <DialogClose className='cursor-pointer'>Back</DialogClose>
                  <Button
                    onClick={() => {
                      deleteRecipe()
                      router.push('/recipes')
                      toast.info(`Recipe Deleted`, {
                        description: `"${recipe?.name}" has been permanently removed.`,
                      })
                    }}
                    variant='destructive'
                    className='cursor-pointer'
                  >
                    <Trash2 />
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
