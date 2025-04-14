import { FC } from 'react'
import { useAppSelector } from '../../../store'
import { Row } from '../../../components/Row'

function msToSeconds(ms: number): number {
  return parseFloat((ms / 1000).toFixed(1))
}

export const HashStatus: FC = () => {
  const hashing = useAppSelector((state) => state.hash.track.data)

  if (!hashing) {
    return null
  }

  return (
    <Row
      label='Status'
      value={`${hashing.status} since ${msToSeconds(
        hashing.processingTime
      )} seconds`}
    />
  )
}
