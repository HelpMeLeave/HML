'use client'

import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Form/Checkbox'
import { Label } from '@/components/Form/Label'
import {
  SectionEyebrow,
  SectionHeading,
  SectionHGroup,
  SectionSubtitle,
} from '@/components/Structure/Section'
import {
  Subsection,
  SubsectionContent,
  SubsectionHeading,
} from '@/components/Structure/Subsection/Subsection'
import { cn } from '@/lib/cn'
import { Trash2, X } from 'lucide-react'
import { type MotionProps, motion } from 'motion/react'
import { filterCbs } from 'www/(Content)/explorer/_lib/filterCbs'
import type { ExplorerMasonaryDrawer, tDrawerFilter } from 'www/(Content)/explorer/_types'

type DrawerProps = Props
  & MotionProps & {
    overlayRef: RefObject<HTMLDivElement | null>
    size: ExplorerMasonaryDrawer['size']
    activeKeys: string[]
    onFilterToggle: (key: string, checked: boolean) => void
    onClear: () => void
    onClose: () => void
  }

export const Drawer = ({
  overlayRef,
  size,
  activeKeys,
  onFilterToggle,
  onClear,
  onClose,
  ...props
}: DrawerProps) => {
  const motionVariants = {
    hidden: {
      opacity: 0,
      width: size == 'md' ? 0 : '100%',
      height: size == 'md' ? '100vh' : 0,
    },
    visible: {
      opacity: 1,
      width: size == 'md' ? '350px' : '100%',
      height: size == 'md' ? '100vh' : '80vh',
    },
  }

  return (
    <motion.div
      {...props}
      ref={overlayRef}
      key='overlay'
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        e.target == e.currentTarget && onClose()
      }}
      className='fixed inset-0 z-999 h-screen w-screen overflow-hidden backdrop-blur-sm md:backdrop-blur-xs'>
      <div
        key='drawer-container'
        className={cn(
          'fixed right-0 bottom-0 left-0',
          'z-999 h-max w-full',
          'md:top-0 md:right-20 md:h-screen md:w-max',
          'flex items-end'
        )}>
        <motion.div
          key='drawer'
          initial={motionVariants.hidden}
          animate={motionVariants.visible}
          exit={motionVariants.hidden}
          className={cn(
            'overflow-x-hidden overflow-y-scroll rounded-t-2xl border border-b-0 border-body/10 bg-background md:rounded-none',
            'p-8 shadow-[0_-4px_8px_rgba(0,0,0,0.4)] backdrop-blur-md md:backdrop-blur-xs'
          )}>
          <FilterHeading />

          <form className='mt-4 flex flex-col gap-2 pointer-coarse:mb-12'>
            {filterCbs.map((grp) => (
              <Subsection
                className='flex flex-col gap-1 *:[div]:flex *:[div]:flex-col *:[div]:gap-2'
                key={grp.group}>
                <SubsectionHeading>{grp.group}</SubsectionHeading>
                <SubsectionContent className='pl-0 *:gap-y-1 *:*:has-checked:text-accent sm:pl-4'>
                  {grp.items.map((cb) => (
                    <FilterCB
                      key={cb.label}
                      dataKey={cb.dataKey}
                      label={cb.label}
                      checked={activeKeys.includes(cb.dataKey)}
                      onFilterToggle={onFilterToggle}
                    />
                  ))}
                </SubsectionContent>
              </Subsection>
            ))}
            <ClearButton onClear={onClear} />
            <CloseButton onClose={onClose} />
          </form>
        </motion.div>
      </div>
    </motion.div>
  )
}

const FilterHeading = () => (
  <SectionHGroup>
    <SectionEyebrow>Filter</SectionEyebrow>
    <SectionHeading>Let&apos;s get you matched!</SectionHeading>
    <SectionSubtitle className='pointer-coarse:hidden'>
      We can help narrow down the selection if you tell us a little bit about yourself - don’t
      worry, we don’t keep a record of any of this and none of it can be traced back to you! If you
      don’t select anything, you will just be shown the full list of pathways
    </SectionSubtitle>
  </SectionHGroup>
)

type FilterCBProps = Props<typeof Checkbox>
  & Pick<tDrawerFilter, 'label' | 'dataKey'> & {
    checked: boolean
    onFilterToggle: (key: string, checked: boolean) => void
  }

const FilterCB = ({ label, dataKey, checked, onFilterToggle, ...props }: FilterCBProps) => {
  return (
    <Label className='flex items-start gap-3 text-sm font-semibold sm:text-base'>
      <Checkbox
        {...props}
        id={dataKey}
        name={dataKey}
        // controlled off activeKeys, so Clear resets the boxes without touching the DOM
        checked={checked}
        onChange={(state) => onFilterToggle(dataKey, state == true)}
        className='mt-0.5 pointer-coarse:mt-1'
      />
      {label}
    </Label>
  )
}

const CloseButton = ({ onClose }: { onClose: () => void }) => (
  <Button
    type='button'
    variant='muted'
    className='mt-4 flex items-center justify-center gap-2'
    onClick={onClose}>
    <X className='size-4' />
    Close Filters
  </Button>
)

const ClearButton = ({ onClear }: { onClear: () => void }) => (
  <Button
    type='button'
    variant='primary'
    className='mt-4 flex items-center justify-center gap-2'
    onClick={onClear}>
    <Trash2 className='size-4' />
    Clear all filters
  </Button>
)
