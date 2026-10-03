import { IconAttributes } from '@/components/Flag'
import { InlineLink } from '@/components/primitives/Link'
import { cn } from '@/lib/cn'
import Image from 'next/image'
import Link from 'next/link'
import type { ExplorerBase } from 'www/(Content)/explorer/_types'

export const Country = ({
  country,
  priority,
}: {
  country: { id: keyof ExplorerBase } & ExplorerBase[string]
  priority: boolean
}) => {
  return (
    <>
      <Figure
        country={country}
        priority={priority}
      />
      <Link
        href={`/countries/${country.id.toLowerCase()}`}
        title={country.name}
        prefetch={false}
        className='absolute inset-0 flex flex-col justify-end hocus:opacity-100'>
        <div className='absolute inset-0 flex flex-1 items-center justify-center'>
          <span className='mt-1 text-center font-header text-4xl font-medium tracking-normal text-white underline decoration-accent text-shadow-md sm:text-4xl md:text-5xl lg:text-6xl'>
            {country.name}
          </span>
        </div>
        <IconAttributes
          attr={country.community}
          className={cn(
            'bg-linear-0 from-black to-transparent',
            'flex h-24 w-full justify-start px-2 py-1',
            '**:[svg]:text-transparent',
            '*:text-2xl **:[svg]:size-10',
            'sm:*:text-xl sm:**:[svg]:size-8',
            'items-end md:**:[svg]:size-8',
            '*:h-8 *:max-h-8 *:min-h-8'
          )}
        />
      </Link>
    </>
  )
}

const Figure = ({
  country,
  priority,
}: {
  country: { id: keyof ExplorerBase } & ExplorerBase[string]
  priority: boolean
}) => {
  // Images are served from public/countries, keyed by lowercased country name — the V1 arrangement.
  const details = {
    ...country.images,
    url: '/countries/' + country.name.toLowerCase() + '.jpeg',
    alt: `Photograph showing life in ${country.name}`,
  }

  return (
    <figure
      style={{
        aspectRatio: `${details.width} / ${details.height}`,
      }}
      className='h-fill relative my-0 flex w-full shrink overflow-hidden rounded-lg px-0 pt-0'>
      <Image
        src={details.url}
        alt={details.alt}
        fill
        style={{
          objectFit: 'fill',
          objectPosition: 'center center',
        }}
        sizes={`500px`}
        className={cn(
          'h-full w-full grayscale-0 transition-all duration-300 group-hocus:grayscale-100',
          !country.images?.havePhoto && 'opacity-50 grayscale',
          country.images?.havePhoto && 'contrast-120 saturate-90'
        )}
        priority={priority}
      />
      <span className='pointer-events-none absolute inset-0 block h-full overflow-hidden rounded-b-lg bg-black/40' />
      <FigCaption country={country} />
    </figure>
  )
}

const CameraFilled = ({ ...props }: Props<'svg'>) => {
  return (
    <svg
      {...props}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M13.9971 3C14.5382 3.00001 15.0694 3.14657 15.5342 3.42383C15.9989 3.7011 16.3797 4.09901 16.6367 4.5752L17.123 5.47461C17.2087 5.6332 17.3355 5.76599 17.4902 5.8584C17.6451 5.95081 17.8226 5.99999 18.0029 6H20C20.7957 6 21.5585 6.3163 22.1211 6.87891C22.6837 7.44152 23 8.20435 23 9V18C23 18.7957 22.6837 19.5585 22.1211 20.1211C21.5585 20.6837 20.7957 21 20 21H4C3.20435 21 2.44152 20.6837 1.87891 20.1211C1.3163 19.5585 1 18.7956 1 18V9C1 8.20435 1.3163 7.44152 1.87891 6.87891C2.44152 6.3163 3.20435 6 4 6H5.99707C6.17718 6.00001 6.35404 5.95152 6.50879 5.85938C6.66361 5.76714 6.79117 5.63407 6.87695 5.47559L7.36523 4.57227L7.46777 4.39746C7.71946 3.99915 8.06236 3.66498 8.46875 3.42285C8.9331 3.14625 9.46341 3 10.0039 3H13.9971ZM12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10Z'
        fill='currentColor'
      />
    </svg>
  )
}

const FigCaption = ({
  country,
}: {
  country: { id: keyof ExplorerBase } & ExplorerBase[string]
}) => (
  <figcaption className='absolute top-0 right-0 z-20 w-full px-2 py-1 text-end font-body text-[.55em] uppercase text-shadow-2xs print:hidden'>
    <InlineLink
      prefetch={false}
      data-external=''
      href={'https://unsplash.com/@' + country.images.handle}
      target='_blank'
      className='flex items-center-safe justify-end gap-1 text-white underline decoration-current/30 decoration-1 transition-all hocus:decoration-accent/30 hocus:decoration-2 hocus:opacity-100 hocus:*:rotate-15 hocus:*:text-accent'
      rel='noopener noreferrer'>
      <CameraFilled className='mb-0.5 size-3 text-background transition-all' />
      {country.images.name}
    </InlineLink>
  </figcaption>
)
