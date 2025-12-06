'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { recipeSchema, type Recipe } from '@/shared/schemas/recipe'

import Image from 'next/image'

import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Textarea } from '@/components/ui/textarea'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FieldSet, FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<Recipe>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: '',
      description: '',
      instructions: '',
      quantity: 0,
      unit: '',
      difficulty: '',
      img_url: 'https://placehold.co/150',
    },
  })

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit: SubmitHandler<Recipe> = async (data) => {
    setLoading(true)
    console.log('submitted', data)
    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, quantity: Number(data.quantity) }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      router.push('/recipes')
      toast.success('Recipe created successfully!')
      reset()
    } catch (err) {
      console.error('Failed to create recipe:', err)
      toast.error(`There was an error connecting to the server.`, {
        description: 'Please try again later.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <SidebarProvider style={{ '--sidebar-width': '14rem' } as React.CSSProperties}>
      <AppSidebar />
      <SidebarInset className='flex min-h-screen flex-col'>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className='hidden md:block'>
                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='hidden md:block' />
              <BreadcrumbItem>
                <BreadcrumbLink href='/recipes'>Recipes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='hidden md:block' />
              <BreadcrumbItem>
                <BreadcrumbPage>New</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className='m-4 flex shrink-0 items-center space-x-2'>
          <Link href='/recipes'>
            <ChevronLeft />
          </Link>
          <h1 className='text-2xl font-bold'>New Recipe</h1>
        </div>

        <div className='flex-1 overflow-auto p-4'>
          <form onSubmit={handleSubmit(onSubmit)} id='recipe-form' className='flex space-x-8'>
            <FieldSet className='w-1/2'>
              <FieldGroup>
                <div className='flex items-start space-x-4'>
                  <Field className='size-[150px]'>
                    <Image src={watch('img_url')} className='rounded-lg object-cover' alt='' />
                  </Field>
                  <div className='flex-1 space-y-2'>
                    <Field>
                      <FieldLabel htmlFor='name'>Name</FieldLabel>
                      <Input id='name' {...register('name')} autoComplete='off' required />
                      {errors.name && <p className='text-sm text-red-500'>Name is required</p>}
                    </Field>

                    <div className='flex items-end justify-between'>
                      <div className='flex items-end space-x-2'>
                        <Field className='w-1/3'>
                          <FieldLabel htmlFor='quantity'>Quantity</FieldLabel>
                          <Input
                            id='quantity'
                            type='number'
                            {...register('quantity', { valueAsNumber: true })}
                            autoComplete='off'
                            required
                          />
                          {errors.quantity && (
                            <p className='text-sm text-red-500'>Quantity is required</p>
                          )}
                        </Field>

                        <Controller
                          name='unit'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder='Unit' />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value='pcs'>Pieces</SelectItem>
                                <SelectGroup>
                                  <SelectLabel>Weight</SelectLabel>
                                  <SelectItem value='mg'>mg</SelectItem>
                                  <SelectItem value='g'>g</SelectItem>
                                  <SelectItem value='kg'>kg</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                  <SelectLabel>Volume</SelectLabel>
                                  <SelectItem value='ml'>ml</SelectItem>
                                  <SelectItem value='l'>l</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.unit && <p className='text-sm text-red-500'>Unit is required</p>}
                      </div>

                      <Controller
                        name='difficulty'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder='Difficulty' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='Easy'>Easy</SelectItem>
                              <SelectItem value='Medium'>Medium</SelectItem>
                              <SelectItem value='Hard'>Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.difficulty && (
                        <p className='text-sm text-red-500'>Difficulty is required</p>
                      )}
                    </div>
                  </div>
                </div>
              </FieldGroup>

              <FieldGroup>
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    className='max-h-60 min-h-60 resize-none overflow-y-auto'
                    {...register('description')}
                  />
                </Field>
              </FieldGroup>
              <Input type='hidden' {...register('img_url')} />
            </FieldSet>

            <FieldSet className='w-1/2'>
              <Field>
                <FieldLabel>Instructions</FieldLabel>
                <Textarea
                  className='min-h-[414px] resize-none overflow-y-auto'
                  {...register('instructions')}
                />
              </Field>
            </FieldSet>
          </form>
        </div>

        <footer className='flex shrink-0 items-center justify-between p-4'>
          <Link href={'/recipes'}>
            <Button variant='outline'>Back</Button>
          </Link>
          <Button type='submit' form='recipe-form' disabled={loading} className='cursor-pointer'>
            {loading ? <Spinner /> : 'Create'}
          </Button>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
