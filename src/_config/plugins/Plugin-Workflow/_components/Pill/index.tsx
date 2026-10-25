import { pillColors } from '@/_config/plugins/Plugin-Workflow/_components/Pill/pillColors'
import { Pill } from '@/components/Admin/Pill'
import type { FlowSTATUS } from 'payload-workflow'

type PillBaseProps = {
  status: FlowSTATUS
  label?: string
  className?: string
  style?: Props<'span'>['style']
}

const PillBase = ({ status, label, className, style }: PillBaseProps) => (
  <Pill
    className={className}
    statusOpts={pillColors}
    style={style}
    status={status}>
    {label ? label : undefined}
  </Pill>
)

/**
 * The document's status, as the sidebar shows it.
 *
 * `label` is the collection's own `pillLabel` for that status, worked out at boot — so what a status is *called* can differ per collection while the colour stays consistent across all of them.
 */
const FlowPill = ({
  status,
  label,
  wrapperStyles,
  pillStyles,
}: Pick<PillBaseProps, 'status' | 'label'> & {
  wrapperStyles?: Props['style']
  pillStyles?: Props['style']
}) => (
  <span
    style={wrapperStyles}
    // className={'flow-pill flow-pill__wrapper'}>
    className='flow-pill flow-pill__wrapper in-[.flow]:flex in-[.flow]:items-center in-[.flow]:justify-end in-[.flow]:gap-1 in-[.flow]:text-[0.75rem] in-[.flow-field]:justify-start'>
    <PillBase
      style={{
        ...pillStyles,
      }}
      className='my-0.5 h-full max-w-min justify-center'
      label={label}
      status={status}
    />
  </span>
)

export default FlowPill
