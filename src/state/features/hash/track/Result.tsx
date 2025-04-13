import { FC } from 'react'
import { useAppSelector } from '../../../store'
import { Row } from '../../../../components/Row'

export const Result: FC = () => (
  <>
    <HashResult />
    <ErrorResult />
  </>
)

const HashResult: FC = () => {
  const hash = useAppSelector((state) => state.hash.track.data?.hash)

  if (!hash) {
    return null
  }

  return <Row label='Hash' value={hash} />
}

const ErrorResult: FC = () => {
  const error = useAppSelector((state) => state.hash.track.data?.error)

  if (!error) {
    return null
  }

  return <Row label='Error' value={error} />
}
