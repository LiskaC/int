import { FC } from 'react'
import { HashInput } from './state/features/hash/HashInput'
import { useAppSelector } from './state/store'

interface Props {
  hash: string
}

const HashDisplay: FC<Props> = (props) => (
  <div className='flex gap-2'>
    <h2 className='font-bold'>Hash value:</h2>
    <p>{props.hash}</p>
  </div>
)

/**
 * The main entry point of the React application
 */
export function App() {
  const hash = useAppSelector((state) => state.hash)

  return (
    <>
      <main className='flex flex-col items-center gap-4'>
        <HashInput />
        <section>
          {!hash.id || hash.loading ? (
            <HashDisplay hash='No Hash' />
          ) : (
            <HashDisplay hash={hash.id} />
          )}
        </section>
      </main>
    </>
  )
}
