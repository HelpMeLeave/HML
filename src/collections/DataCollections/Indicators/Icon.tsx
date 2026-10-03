'use client'

import { CurrentIcon } from '@/collections/DataCollections/Indicators/_components/Icons/CurrentIcon'
import { Icon } from '@/collections/DataCollections/Indicators/_components/Icons/Icon'
import { Icons } from '@/collections/DataCollections/Indicators/_components/Icons/Icons'
import { Search } from '@/collections/DataCollections/Indicators/_components/Icons/Search'
import { SpecialItemPicker } from '@/collections/DataCollections/Indicators/_components/Icons/SpecialItemPicker'
import { useField } from '@payloadcms/ui'
import { useState } from 'react'
import './_components/Icons/style.scss'

const IconPickerClient = ({ path }: { path: string }) => {
  const { value, setValue } = useField<string>({ path })
  const { value: iconVal } = useField<string>({ path: 'icon' })
  const [open, setOpen] = useState(false)
  const [custom, setCustomAction] = useState('')

  const selectAction = (id: string) => {
    setValue(id)
    setOpen(false)
  }

  return (
    <>
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          letterSpacing: 'normal',
          flexDirection: 'column',
          width: '100%',
        }}>
        {iconVal && iconVal != '' && Icon({ icon: iconVal })?.icon}
      </label>
      <div
        id='currentIcon'
        className='w-full text-center'>
        <CurrentIcon
          value={value}
          setOpenAction={setOpen}
          setValueAction={setValue}
          open={open}
        />
      </div>

      {open && (
        <>
          <Search
            custom={custom}
            selectAction={selectAction}
            setCustomAction={setCustomAction}
          />
          <div id='iconOptions'>
            <SpecialItemPicker selectAction={selectAction} />
            <Icons selectAction={selectAction} />
          </div>
        </>
      )}
    </>
  )
}

export default IconPickerClient
