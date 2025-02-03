import { FormState, UseFormRegister } from 'react-hook-form'

interface DevFormValues {
  devName: string
  devEmail: string
}

interface DevFormProps {
  register: UseFormRegister<DevFormValues>
  formState: FormState<DevFormValues>
  emailExists: boolean
}

export const DevForm = ({ register, formState, emailExists }: DevFormProps) => {
  return (
    <div className='form-container'>
      <div className='form-control'>
        <label htmlFor='devName'>Dev</label>
        <input
          type='text'
          id='devName'
          placeholder='Digite o nome do dev...'
          className='input'
          {...register('devName')}
        />
        {formState.errors.devName && (
          <span className='error-message'>
            {formState.errors.devName.message}
          </span>
        )}
      </div>
      <div className='form-control'>
        <label htmlFor='devEmail'>E-mail</label>
        <input
          type='email'
          id='devEmail'
          placeholder='Digite o e-mail do dev...'
          className='input'
          {...register('devEmail')}
        />
        {formState.errors.devEmail && (
          <span className='error-message'>
            {formState.errors.devEmail.message}
          </span>
        )}
        {emailExists && <span className='error-message'>E-mail já existe</span>}
      </div>
    </div>
  )
}
