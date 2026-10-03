import { LogoVertical, LogoWideVertical } from '@/components/Logo/Vertical'

const Logo = () => {
  return (
    <div className='w-full bg-transparent md:px-12 md:pt-12'>
      <LogoWideVertical id='horizontalLogo' />
      <span id='verticalLogo'>
        <LogoVertical viewBox='40 30 145 173.7' />
      </span>
    </div>
  )
}

export default Logo
