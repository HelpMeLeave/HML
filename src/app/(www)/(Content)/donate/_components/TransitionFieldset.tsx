import type { DonationData, Step } from '@/app/(www)/(Content)/donate/_types'
import { Fieldset, Legend } from '@/components/Form/Fieldset'
import { cn } from '@/lib/cn'
import { toTitleCase } from '@/lib/textCasing'
import { Transition } from '@headlessui/react'
import { STEPS } from '../_lib/STEPS'

export const TransitionFieldset = ({
  thisStep,
  transactionData,
  ...props
}: Props<typeof Fieldset> & {
  thisStep: Step
  transactionData: DonationData
}) => {
  const { prevStep, step: currentStep } = transactionData

  return (
    <Transition
      afterEnter={() => {
        if (window) {
          const bottom = document.querySelector('main')?.getBoundingClientRect().bottom
          bottom
            && setTimeout(() => {
              window.scrollTo({ top: window.scrollY + bottom / 2, behavior: 'smooth' })
            })
        }
      }}
      show={thisStep == currentStep}>
      <div
        className={cn(
          'relative top-0 z-0 w-full duration-300 data-transition:absolute',
          STEPS.findIndex((s) => s == prevStep) < STEPS.findIndex((s) => s == currentStep) ?
            ['data-enter:translate-x-[200%]', 'data-leave:translate-x-[-200%]']
          : ['data-enter:translate-x-[-200%]', 'data-leave:translate-x-[200%]']
        )}>
        <Fieldset
          {...props}
          className={cn('mt-6 flex flex-col *:w-full', props.className)}>
          <Legend>{toTitleCase(thisStep)}</Legend>
          {props.children}
        </Fieldset>
      </div>
    </Transition>
  )
}
