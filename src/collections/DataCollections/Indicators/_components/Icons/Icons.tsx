'use client'
import { BtnEl } from '@/collections/DataCollections/Indicators/_components/Icons/BtnEl'
import { Icon } from '@/collections/DataCollections/Indicators/_components/Icons/Icon'
import { QUICK_ICONS } from '@/collections/DataCollections/Indicators/_components/Icons/_lib'
import { P } from './P'

export const Icons = ({ selectAction }: { selectAction: (id: string) => void }) => (
  <div>
    <P className='pickerTitle'>Icons</P>
    <div className='icon-picker--grp'>
      {QUICK_ICONS.map(({ id, label }, i) => (
        <BtnEl
          icon={Icon({ icon: id, searchFn: (_icon) => QUICK_ICONS[i].Comp })?.icon}
          selectAction={selectAction}
          iconId={id}
          id={id}
          key={id}>
          {label}
        </BtnEl>
      ))}
    </div>
  </div>
)
