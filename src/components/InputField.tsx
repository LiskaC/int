import { FC } from 'react'

interface Props {
  id: string
  label: string
  type: string
  value: string
  minLength: number
  error: string
  placeholder: string
  required: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputField: FC<Props> = (props) => (
  <div id='input-field' className='flex flex-col mt-2 mb-4 gap-1'>
    <label htmlFor={props.id} className='text-zinc-500'>
      {props.label}
    </label>
    <input
      id={props.id}
      type={props.type}
      value={props.value}
      minLength={props.minLength}
      required={props.required}
      // .toLowerCase() for consistency in the UI
      placeholder={props.placeholder.toLowerCase()}
      onChange={props.onChange}
      aria-invalid={props.error ? 'true' : 'false'}
      aria-describedby={props.error ? `${props.id}-error` : undefined}
      className='bg-white border border-zinc-300 shadow-xs mt-4 p-2 
        rounded-sm placeholder:text-green-700'
    />
    {props.error && (
      <p
        id={`${props.id}-error`}
        data-testid={`${props.id}-error`}
        aria-live='assertive'
        className='text-red-900 ml-2 text-sm'
      >
        {props.error.toLowerCase()}
      </p>
    )}
  </div>
)
