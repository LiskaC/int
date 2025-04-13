import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { createProcess } from './hashSlice'
import { InputField } from '../../../components/InputField'
import { CreateProcessPayload } from './types'

export const PayloadInput: FC = () => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.hash.loading)
  const [formData, setFormData] = useState<CreateProcessPayload>({
    payload: '',
  })
  const [formError, setFormError] = useState<CreateProcessPayload>({
    payload: '',
  })

  function validate() {
    // TODO - add validation here for Optional part
    return true
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    setFormData({ payload: value })
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    if (validate()) {
      setFormError({ payload: '' })
      dispatch(createProcess(formData))
    }
  }

  return (
    <PayloadInputView
      payload={formData.payload}
      error={formError.payload}
      cta={loading ? 'creating...' : 'create hash'}
      disabled={loading}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  )
}

interface Props {
  payload: string
  error: string
  cta: string
  disabled: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.SyntheticEvent) => void
}

const PayloadInputView: FC<Props> = (props) => (
  <section role='region' aria-labelledby='payload-form-header'>
    <h1 id='payload-form-header' className='text-2xl'>
      Get your hash
    </h1>
    <form id='payload-form' onSubmit={props.onSubmit}>
      <InputField
        id='payload-input'
        label='You can hash any arbitrary string. Provide a payload in the input below.'
        type='text'
        value={props.payload}
        minLength={1}
        placeholder='your payload'
        required
        onChange={props.onChange}
        error={props.error}
      />
      <button
        type='submit'
        disabled={props.disabled}
        aria-label='create hash'
        aria-live='polite'
        className={`bg-blue-700 px-3 py-2 rounded-sm text-amber-50 hover:bg-blue-800
          active:bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed`}
      >
        {props.cta}
      </button>
    </form>
  </section>
)
