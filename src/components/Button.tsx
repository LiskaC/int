import { FC } from 'react'

interface Props {
  text: string
  id?: string
  icon?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
  ariaLabel?: string
}

export const Button: FC<Props> = ({
  id,
  text,
  icon,
  onClick,
  // deconstruction in order to allow for default values
  type = 'button',
  disabled = false,
  ariaLabel = text,
}) => (
  <button
    id={id}
    type={type}
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    aria-live='polite'
    className='w-fit bg-blue-700 px-3 py-1.5 rounded-sm text-amber-50
         hover:bg-blue-800 active:bg-blue-500 disabled:bg-blue-400
         disabled:cursor-not-allowed flex items-center align-middle gap-2
         font-semibold'
  >
    {icon && <img src={icon} alt='button icon' className='pt-1 w-4 h-5' />}
    <p>{text}</p>
  </button>
)
