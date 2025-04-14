import { HashForm } from './components/HashForm'
import { CreateResult } from './components/CreateResult'
import { TrackCta } from './components/TrackCta'
import { HashStatus } from './components/HashStatus'
import { TrackResult } from './components/TrackResult'

function HashPage() {
  return (
    <>
      <div
        id='hash-page'
        className='flex flex-col items-left gap-4 shadow-sm shadow-zinc-200
          rounded-md p-4 m-8'
      >
        <HashForm />
        <CreateResult />
        <TrackCta />
        <HashStatus />
        <TrackResult />
      </div>
    </>
  )
}

export default HashPage
