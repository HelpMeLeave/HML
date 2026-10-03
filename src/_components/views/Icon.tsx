import './style.scss'

import { SocialIcon } from '@/components/Icon/Social'

const Icon = () => (
  <SocialIcon
    className='step-nav__home-icon'
    style={{
      position: 'relative',
      left: '-.5rem',
      top: '-.1rem',
      height: '1.25rem',
      color: 'var(--theme-primary)',
      borderRadius: '999px',
      overflow: 'visible',
      outlineOffset: '0.5rem',
    }}
  />
)

export default Icon
