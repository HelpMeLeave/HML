import { pillColors } from '@/_config/plugins/Plugin-Workflow/_components/Pill/pillColors'
import { Pill } from '@/components/Admin/Pill'
import type { Flow } from 'payload-workflow'
import './style.scss'

type PillBaseProps = {
  status: Flow.STATUS
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
    className={'flow-pill flow-pill__wrapper'}>
    <PillBase
      style={{
        marginInline: '1rem',
        height: '100%',
        justifyContent: 'center',
        maxWidth: 'min-content',
        ...pillStyles,
      }}
      label={label}
      status={status}
    />
  </span>
)

export default FlowPill
