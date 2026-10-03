import { Logo } from '@/components/Logo'
import { LogoVertical } from '@/components/Logo/Vertical'
import { Main } from '@/components/Structure/Main'
import { cn } from '@/lib/cn'
import leavePhoto from '@/panel-hearts.jpg'
import jesusPhoto from '@/panel-jesus.jpg'
import communityPhoto from '@/panel-leave-wide.jpg'
import { getPayload } from '@/server/getPayload'
import { ChevronsRightIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import './styles.scss'

const PANEL_SIZES = '36vw, 100vw'

type Route = {
  photo: StaticImageData
  name: string
  blurb: string
  href?: string
  tint?: boolean
  init?: boolean
}

const ROUTES: Route[] = [
  {
    photo: leavePhoto,
    name: 'EXPLORE',
    blurb: 'RESEARCH YOUR OPTIONS',
    href: '/explorer',
  },
  {
    photo: jesusPhoto,
    name: 'BUILD COMMUNITY',
    blurb: 'JOIN OUR DISCORD SERVER',
    href: '',
    tint: true,
    init: false,
  },
  {
    photo: communityPhoto,
    name: 'LEAVE',
    blurb: 'ACCESS ONE ON ONE SUPPORT.',
    href: '/support',
  },
]

const PanelBody = ({ route }: { route: Route }) => {
  return (
    <div className={'body'}>
      <div className={'name'}>
        {route.name}
        <ChevronsRightIcon className='chev' />
      </div>
      <div className={'rule h-0.75 w-16 bg-accent'} />
      <div
        className={
          'blurb text-[clamp(0.675rem,calc(0rem+0.6vw),--spacing(5))] tracking-[0.2em] text-accent-400 dark:text-accent'
        }>
        {route.blurb}
      </div>
    </div>
  )
}

const RouteDecorations = ({ tint }: { tint: Route['tint'] }) => (
  <>
    <span className={'shade'} />
    {tint && <span className={'tint absolute inset-0'} />}
    <span className={'wash'} />
  </>
)

export const metadata: Metadata = {
  title: 'Help Me Leave',
}

const Home = async () => {
  const discordRoute = ROUTES.findIndex((r) => 'init' in r)!
  if (Boolean(ROUTES[discordRoute].init) == false) {
    const payload = await getPayload()
    const { docs: discord, totalDocs } = await payload.find({
      collection: 'externalResources',
      where: {
        url: { like: 'discord' },
      },
      select: {
        url: true,
      },
      limit: 1,
      depth: 0,
    })
    if (totalDocs == 1) {
      ROUTES[discordRoute].init = true
      ROUTES[discordRoute].href = discord[0].url
    }
  }

  return (
    <Main
      data-layout='full'
      data-page='home'
      id='homePage'
      className={cn(
        'h-dvh max-h-dvh w-dvw',
        'relative flex max-w-screen! flex-col overflow-hidden'
      )}>
      <section
        className={
          'gate relative flex h-auto min-h-svh w-full flex-col overflow-hidden bg-[#060606] md:h-svh md:min-h-155 md:flex-row'
        }
        aria-label='Choose a path'>
        {ROUTES.map(({ photo, name, href, tint, blurb }) => (
          <Link
            prefetch={false}
            key={name}
            href={href!}
            data-slot={name}
            className={'panel'}>
            <Image
              src={photo}
              alt=''
              fill
              priority
              quality={75}
              sizes={PANEL_SIZES}
              className={'photo'}
            />
            <RouteDecorations tint={tint} />
            <PanelBody route={{ photo, name, href, tint, blurb }} />
          </Link>
        ))}
        <Logo
          wrapperProps={{
            className: 'mark absolute h-18 w-auto! pointer-events-none lg:hidden',
          }}
          logoType='mark'
          mark='uppercase'
          textBackground='text-black'
          className='text-accent mix-blend-normal! shadow-white drop-shadow-sm'
        />
        <LogoVertical className='pointer-events-none absolute -top-12 -left-12 hidden h-auto w-[30vw] opacity-70 mix-blend-plus-lighter lg:block' />
      </section>
    </Main>
  )
}

export default Home
