'use client'
import { Icon } from '@/collections/DataCollections/Indicators/_components/Icons/Icon'
import {
  BTN_SIZE,
  QUICK_ICONS,
  SPECIAL_ICONS,
} from '@/collections/DataCollections/Indicators/_components/Icons/_lib'
import { BtnEl } from './BtnEl'
import { P } from './P'

export const SpecialItemPicker = ({ selectAction }: { selectAction: (id: string) => void }) => (
  <div id='specialIcons'>
    <P className='pickerTitle'>Special</P>
    <div
      className='icon-picker--grp'
      style={{ marginBottom: 16 }}>
      {SPECIAL_ICONS.map((s) => (
        <BtnEl
          selectAction={selectAction}
          iconId={s.id}
          key={s.id}
          {...Icon({
            icon: s.id,
            size: BTN_SIZE,
            searchFn: (icon) => {
              const iconIndex = QUICK_ICONS.findIndex((i) => i.id === icon)
              if (iconIndex > -1) return QUICK_ICONS[iconIndex].Comp
            },
          })}
        />
      ))}
    </div>
  </div>
)
