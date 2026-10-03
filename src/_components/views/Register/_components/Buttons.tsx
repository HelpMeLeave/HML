import { Row } from '@/_components/views/Register/_components/Row'
import { Button } from '@payloadcms/ui'

export const Buttons = () => {
  return (
    <Row>
      <Button
        type='submit'
        size='large'>
        Submit
      </Button>
      <Button
        type='button'
        onClick={(e) => {
          ;(e.currentTarget as HTMLButtonElement).form?.reset()
        }}
        size='large'
        buttonStyle='tab'>
        Clear
      </Button>
    </Row>
  )
}
