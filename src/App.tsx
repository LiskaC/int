import { useAppSelector } from './state/store'
import { PayloadInput } from './state/features/hash/PayloadInput'
import { ProcessCreateStatus } from './state/features/hash/ProcessCreateStatus'

/**
 * The main entry point of the React application
 */
function App() {
  const hash = useAppSelector((state) => state.hash)

  return (
    <>
      <div
        id='hash-page'
        className='flex flex-col items-left gap-4 shadow-sm shadow-zinc-200 rounded-md p-4 m-8'
      >
        <PayloadInput />
        <ProcessCreateStatus />
      </div>
    </>
  )
}

export default App
