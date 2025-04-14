import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { createProcess } from '../slice'
import { CreateProcessPayload } from '../types'
import { InputField } from '../../../components/InputField'
import { Button } from '../../../components/Button'

export const HashForm: FC = () => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.hash.create.loading)
  const polling = useAppSelector((state) => state.hash.polling)
  const [formData, setFormData] = useState<CreateProcessPayload>({
    payload: '',
  })
  const [formError, setFormError] = useState<CreateProcessPayload>({
    payload: '',
  })

  function validate() {
    const isValid = /^[a-zA-Z0-9]+$/.test(formData.payload)

    if (!isValid) {
      setFormError({
        payload: 'Only letters and numbers are allowed',
      })
    }

    return isValid
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
    <HashFormView
      payload={formData.payload}
      error={formError.payload}
      cta={loading ? 'creating...' : 'create hash'}
      disabled={loading || polling}
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

const HashFormView: FC<Props> = (props) => (
  <section role='region' aria-labelledby='hash-form-header'>
    <h1 id='hash-form-header' className='text-2xl'>
      Get your hash
    </h1>
    <form id='hash-form' onSubmit={props.onSubmit}>
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
      <Button type='submit' text={props.cta} disabled={props.disabled} />
    </form>
  </section>
)
