'use client'

import { useState } from 'react'
import { SubmitHandler, useForm, Controller, FormProvider } from 'react-hook-form'
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

import StepsContainer from '@/app/recipes/new/components/StepsContainer'

export default function Page() {
  const form = useForm<Recipe>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: '',
      description: '',
      steps: [
        {
          order: 1,
          name: '',
          instructions: '',
        },
      ],
      quantity: 0,
      unit: 'pcs',
      difficulty: 'Easy',
      img_url: 'https://placehold.co/150',
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = form

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
      <SidebarInset className='flex max-h-screen min-h-screen flex-col'>
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

        <div className='flex-1 overflow-auto p-4'>
          <FormProvider {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              id='recipe-form'
              className='flex h-full space-x-8'
            >
              <FieldSet className='h-full w-2/5'>
                <FieldGroup>
                  <div className='flex items-start space-x-4'>
                    <Field className='size-[150px]'>
                      <Image
                        src={watch('img_url')}
                        className='rounded-lg object-cover'
                        alt=''
                        width='150'
                        height='150'
                        unoptimized
                      />
                    </Field>
                    <div className='flex-1 space-y-2'>
                      <Field>
                        <FieldLabel htmlFor='name'>Name</FieldLabel>
                        <Input id='name' {...register('name')} autoComplete='off' required />
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

                <FieldGroup className='flex min-h-0 flex-1 flex-col'>
                  <Field className='flex flex-1 flex-col'>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea className='h-full flex-1 resize-none' {...register('description')} />
                  </Field>
                </FieldGroup>
              </FieldSet>

              <FieldSet className='h-full w-3/5'>
                <StepsContainer />
              </FieldSet>
            </form>
          </FormProvider>
        </div>

        <footer className='flex shrink-0 items-center justify-between p-4'>
          <Link href={'/recipes'}>
            <Button variant='outline' className='cursor-pointer'>
              Back
            </Button>
          </Link>
          <Button type='submit' form='recipe-form' disabled={loading} className='cursor-pointer'>
            {loading ? <Spinner /> : 'Create'}
          </Button>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
