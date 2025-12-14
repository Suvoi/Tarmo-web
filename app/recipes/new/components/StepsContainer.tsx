'use client'

import { useFormContext, useFieldArray } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { Recipe } from '@/shared/schemas/recipe'

export default function StepsContainer() {
  const { control, register } = useFormContext<Recipe>()

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'steps',
  })

  const handleAddStep = () => {
    append({
      order: fields.length + 1,
      name: '',
      instructions: '',
    })
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    move(index, index - 1)
  }

  const moveDown = (index: number) => {
    if (index === fields.length - 1) return
    move(index, index + 1)
  }

  return (
    <div className='flex h-full flex-col justify-between space-y-4'>
      <div className='flex h-full flex-col space-y-4'>
        <div className='flex-1 space-y-2 overflow-y-auto'>
          {fields.map((field, index) => (
            <div key={field.id} className='flex'>
              <FieldGroup className='p-2'>
                <div className='flex items-center justify-between space-x-2'>
                  <span className='flex h-full w-1/16 items-center justify-center rounded-lg border'>
                    {index + 1}
                  </span>
                  <Field>
                    <Input placeholder='Name' {...register(`steps.${index}.name` as const)} />
                  </Field>
                </div>
                <Field>
                  <Textarea
                    placeholder='Instructions'
                    className='max-h-64'
                    {...register(`steps.${index}.instructions` as const)}
                  />
                </Field>
              </FieldGroup>

              {/* controles */}
              <div className='flex flex-col justify-between p-2'>
                <Button
                  type='button'
                  variant='ghost'
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className='cursor-pointer'
                >
                  <ChevronUp />
                </Button>

                <Button
                  type='button'
                  variant='ghost'
                  onClick={() => remove(index)}
                  className='cursor-pointer'
                >
                  <Minus />
                </Button>

                <Button
                  type='button'
                  variant='ghost'
                  onClick={() => moveDown(index)}
                  disabled={index === fields.length - 1}
                  className='cursor-pointer'
                >
                  <ChevronDown />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button
          type='button'
          variant='outline'
          className='flex h-8 w-full cursor-pointer items-center justify-center'
          onClick={handleAddStep}
        >
          <Plus className='mr-2' />
        </Button>
      </div>
    </div>
  )
}
