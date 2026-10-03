import { RenderFields } from '@payloadcms/ui'
import type { FieldPaths, GroupFieldServerProps, RadioField } from 'payload'

const baseClass = 'checkbox-group'

type CheckboxGroupFieldProps = {
  direction: Valid<RadioField['admin']>['layout']
  items: string[]
  labelSize?: string
}

// Payload passes a group's FieldPaths to custom Field components at runtime; its server props type just leaves them out
const CheckboxGroupFieldEl = (
  props: GroupFieldServerProps & CheckboxGroupFieldProps & FieldPaths
) => {
  const {
    clientField: { fields },
    field: { admin, label },
    readOnly,
    direction,
    labelSize,
  } = props

  const { className, disabled, style } = admin ?? {}

  return (
    <fieldset
      style={style}
      className={[
        'field-type',
        baseClass,
        className,
        `${baseClass}--layout-${direction ?? 'horizontal'}`,
        `${baseClass}--layout__label-${labelSize ?? 'small'}`,
        (readOnly || disabled) && `${baseClass}--read-only`,
      ].join(' ')}>
      <legend className='field-label'>{String(label)}</legend>
      <div
        className={`${'field-type'}__wrap`}
        style={{
          marginTop: '0.25rem',
        }}>
        <RenderFields
          className={`${baseClass}--group`}
          margins={false}
          fields={fields}
          // same as Payload's own Group for an unnamed group: children sit at the parent's level, not under the group
          parentIndexPath={props.indexPath ?? ''}
          parentPath={props.parentPath ?? ''}
          parentSchemaPath={props.parentSchemaPath ?? ''}
          permissions={props.permissions}
        />
      </div>
    </fieldset>
  )
}

export default CheckboxGroupFieldEl
