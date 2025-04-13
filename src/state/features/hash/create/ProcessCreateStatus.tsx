import { FC } from 'react'
import { useAppSelector } from '../../../store'

import SUCCESS_ICON from 'url:../../../../assets/images/success.svg'
import ERROR_ICON from 'url:../../../../assets/images/error.svg'

export const ProcessCreateStatus: FC = () => {
  const create = useAppSelector((state) => state.hash.create)

  if (!create.data.payload || create.loading) {
    return null
  }

  if (create.error) {
    return (
      <ProcessCreateStatusView
        status='error'
        text={create.error}
        img={{ src: ERROR_ICON, alt: 'error-icon' }}
      />
    )
  }

  return (
    <ProcessCreateStatusView
      status='success'
      text='Successfully started process to hash your payload'
      img={{ src: SUCCESS_ICON, alt: 'success-icon' }}
    />
  )
}

interface Props {
  status: 'error' | 'success'
  text: string
  img: {
    src: string
    alt: string
  }
}

const ProcessCreateStatusView: FC<Props> = (props) => (
  <div
    data-testid='process-create-status'
    id='process-create-status'
    className='flex gap-2'
  >
    <img src={props.img.src} alt={props.img.alt} className='pt-1 w-4 h-5' />
    <p
      className={`font-bold ${
        props.status === 'success' ? 'text-green-800' : 'text-red-800'
      }`}
    >
      {props.text}
    </p>
  </div>
)
