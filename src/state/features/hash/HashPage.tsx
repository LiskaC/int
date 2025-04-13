import { PayloadInput } from './create/PayloadInput'
import { ProcessCreateStatus } from './create/ProcessCreateStatus'
import { TrackCta } from './track/TrackCta'
import { Status } from './track/Status'
import { Result } from './track/Result'

function HashPage() {
  return (
    <>
      <div
        id='hash-page'
        className='flex flex-col items-left gap-4 shadow-sm shadow-zinc-200
          rounded-md p-4 m-8'
      >
        <PayloadInput />
        <ProcessCreateStatus />
        <TrackCta />
        <Status />
        <Result />
      </div>
    </>
  )
}

export default HashPage
