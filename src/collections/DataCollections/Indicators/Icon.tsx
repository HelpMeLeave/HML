'use client'

import { CurrentIcon } from '@/collections/DataCollections/Indicators/_components/Icons/CurrentIcon'
import { Icon } from '@/collections/DataCollections/Indicators/_components/Icons/Icon'
import { Icons } from '@/collections/DataCollections/Indicators/_components/Icons/Icons'
// import { Search } from '@/collections/DataCollections/Indicators/_components/Icons/Search'
import { SpecialItemPicker } from '@/collections/DataCollections/Indicators/_components/Icons/SpecialItemPicker'
import { useField } from '@payloadcms/ui'
import { useState } from 'react'

const IconPickerClient = ({ path }: { path: string }) => {
  const { value, setValue } = useField<string>({ path })
  // const { value: iconVal } = useField<string>({ path: 'icon' })
  const iconVal = value
  const [open, setOpen] = useState(false)
  // const [custom, setCustomAction] = useState('')

  const selectAction = (id: string) => {
    setValue(id)
    setOpen(false)
  }

  const { Icon: ThisIcon } = Icon({ icon: iconVal }) ?? {
    Icon: <></>,
    label: null,
  }

  return (
    <>
      <span className='txt-[1rem] flex w-full flex-col items-center gap-2 font-body font-semibold tracking-normal'>
        {ThisIcon}
      </span>
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
          {/* <Search
            custom={custom}
            selectAction={selectAction}
            setCustomAction={setCustomAction}
          /> */}
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
