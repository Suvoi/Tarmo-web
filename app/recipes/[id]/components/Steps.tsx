import { Step } from '@/shared/schemas/step'

interface StepsProps {
  steps: Step[]
}

export default function Steps({ steps }: StepsProps) {
  return (
    <div className='space-y-2 p-2'>
      {steps.map((step) => (
        <div key={step.order} className='bg-card flex h-20 rounded-lg'>
          <span className='bg-primary flex h-full w-10 items-center justify-center rounded-l-lg'>
            {step.order}
          </span>
          <div className='flex-1 px-2'>
            <p className='font-semibold'>{step.name}</p>
            {step.instructions && <p className='text-card-foreground'>{step.instructions}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
