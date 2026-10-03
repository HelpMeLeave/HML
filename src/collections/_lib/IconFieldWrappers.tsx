import { FieldLabel } from '@payloadcms/ui'
import type { LucideProps } from 'lucide-react'
import type { FieldTypes, LabelFunction, StaticLabel } from 'payload'
import type { JSXElementConstructor } from 'react'
import type { JSX } from 'react/jsx-runtime'

export const CellWrapper = ({
  Icon,
  children,
}: {
  children: ReactNode
  Icon: JSXElementConstructor<LucideProps>
}) => {
  return (
    <span
      className='btn btn--no-margin btn--icon btn--size-xsmall btn--style-none btn--icon-style-without-border'
      style={{
        cursor: 'default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        textWrap: 'nowrap',
      }}>
      <span className='btn__content italic opacity-75'>
        <Icon
          size='var(--btn-icon-size)'
          className='btn__icon'
        />
        {children}
      </span>
    </span>
  )
}

export const Wrapper = ({
  label,
  path,
  children,
  type,
  iconPosition,
  IconEl,
  className,
  style,
}: {
  children: ReactNode
  label?: StaticLabel | LabelFunction | boolean
  type: FieldTypes
  path: string
  iconPosition: 'left' | 'right'
  IconEl: JSX.Element
  className?: Props['className']
  style?: Props['style']
}) => {
  return (
    <div
      style={style}
      className={[`field-type ${type} field--with-icon`, className].filter(Boolean).join(' ')}>
      {label && (
        <FieldLabel
          path={path}
          label={label as string}
        />
      )}
      <div
        style={{
          position: 'relative',
        }}
        className={`field--with-icon__wrapper icon--position-${iconPosition}`}>
        {children}
        {IconEl}
      </div>
    </div>
  )
}
