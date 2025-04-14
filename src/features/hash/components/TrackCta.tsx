import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { pollProcess } from '../slice'
import { Button } from '../../../components/Button'

import LOADER from 'url:../../../assets/images/loader.svg'

export const TrackCta: FC = () => {
  const dispatch = useAppDispatch()
  const process = useAppSelector((state) => state.hash.create.data.id)
  const { loading, data } = useAppSelector((state) => state.hash.track)

  const polling = useAppSelector((state) => state.hash.polling)
  if (!process) {
    return null
  }

  function handleCLick() {
    dispatch(pollProcess())
  }

  return (
    <TrackCtaView
      cta={{
        text: loading ? 'fetching...' : 'fetch',
        disabled:
          polling || data?.status === 'completed' || data?.status === 'failed',
        icon: LOADER,
      }}
      onClick={handleCLick}
    />
  )
}

interface Props {
  cta: {
    text: string
    disabled: boolean
    icon?: string
  }
  onClick: () => void
}

const TrackCtaView: FC<Props> = (props) => (
  <section
    role='region'
    aria-labelledby='track-header'
    className='flex flex-wrap gap-3 align-baseline justify-between'
  >
    <h1 id='track-header' className='text-2xl'>
      Track your status
    </h1>
    <Button
      text={props.cta.text}
      icon={props.cta.icon}
      disabled={props.cta.disabled}
      onClick={props.onClick}
    />
  </section>
)
