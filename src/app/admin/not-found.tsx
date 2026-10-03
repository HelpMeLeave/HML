import { Button, Link } from '@payloadcms/ui'

export default function NotFound() {
  return (
    <>
      <main>
        <div className='text-center'>
          <p>404</p>
          <h1>Page not found</h1>
          <p>Sorry, we couldn’t find the page you’re looking for.</p>
          <div>
            <Link
              prefetch={false}
              href='/admin'>
              <Button>Go back home</Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
