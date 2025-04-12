import { FC } from 'react'

interface Props {
  id: string
  label: string
  type: string
  value: string
  error: string
  placeholder: string
  required: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputField: FC<Props> = (props) => (
  <div>
    <label htmlFor={props.id}>{props.label}</label>
    <input
      id={props.id}
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      className='bg-white border mt-4 mb-4 p-1 rounded-sm'
    />
    {/* Add error */}
  </div>
)
