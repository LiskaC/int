import { FC } from 'react'

interface Props {
  label: string
  value: string
}

export const Row: FC<Props> = (props) => (
  <div className='flex justify-between flex-wrap gap-3'>
    <p className='text-zinc-600 font-semibold'>{props.label}</p>
    <p className='w-[80%] text-right'>{props.value}</p>
  </div>
)
