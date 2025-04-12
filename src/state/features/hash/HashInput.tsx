import { FC, useState } from 'react'
import { useAppDispatch } from '../../store'
import { hashValue } from './hashSlice'
import { InputField } from '../../../components/InputField'

export const HashInput: FC = () => {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<{ hash: string }>({ hash: '' })
  const [formError, setFormError] = useState<{ hash: string }>({ hash: '' })

  function validate() {
    // TODO - add validation here
    return true
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    // setFormData((prev) => ({ ...prev, [name]: value }))
    setFormData({ hash: value })
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    if (validate()) {
      dispatch(hashValue(formData.hash))
    }
  }

  return (
    <HashInputView
      hash={formData.hash}
      formError={formError.hash}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  )
}

interface Props {
  hash: string
  formError: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.SyntheticEvent) => void
}

const HashInputView: FC<Props> = (props) => (
  <section role='region'>
    <h1 className='text-center text-4xl'>Hash Input</h1>
    <form
      id='hash-form'
      onSubmit={props.onSubmit}
      className='bg-blue-100 p-4 rounded-sm m-8'
    >
      <InputField
        id='hash-field'
        label='Input your string to be hashed:'
        type='text'
        value={props.hash}
        placeholder='String to hash...'
        required
        onChange={props.onChange}
        error={props.formError}
      />
      <button
        type='submit'
        className='bg-blue-900 p-4 rounded-sm text-amber-50 hover:bg-blue-800 active:bg-blue-400'
      >
        Submit
      </button>
    </form>
  </section>
)
