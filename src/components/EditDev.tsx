import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDevProjectContext } from '../context/useDevProjectContext'
import { Dev } from '../interfaces/Dev'

const devSchema = z.object({
  devName: z.string().min(3, { message: 'Nome deve pelo menos 3 caracteres' }),
  devEmail: z.string().email({ message: 'E-mail inválido' }),
})

type DevFormData = z.infer<typeof devSchema>

interface DevFormProps {
  selectedId: string
  cancel: () => void
}

export const EditDev = ({ selectedId, cancel }: DevFormProps) => {
  const { devData, updateDevById } = useDevProjectContext()

  const { register, handleSubmit, formState } = useForm<DevFormData>({
    resolver: zodResolver(devSchema),
  })

  const onSubmit: SubmitHandler<DevFormData> = (data) => {
    updateDevById(selectedId, data)
    cancel()
  }

  const selectedDev = (): Dev | undefined => {
    const dev = devData.find((dev) => dev.id === selectedId)
    if (dev) return dev
    return undefined
  }

  return (
    <form className='modal-container' onSubmit={handleSubmit(onSubmit)}>
      <div className='form-container modal-child text-left'>
        <div className='form-control'>
          <label htmlFor='devName'>Editar Dev</label>
          <input
            type='text'
            id='devName'
            placeholder='Digite o nome do dev...'
            className='input'
            defaultValue={selectedDev()?.devName}
            {...register('devName')}
          />
          {formState.errors.devName && (
            <span className='error-message'>
              {formState.errors.devName.message}
            </span>
          )}
        </div>
        <div className='form-control'>
          <label htmlFor='devEmail'>Editar E-mail</label>
          <input
            type='email'
            id='devEmail'
            placeholder='Digite o e-mail do dev...'
            className='input'
            defaultValue={selectedDev()?.devEmail}
            {...register('devEmail')}
          />
          {formState.errors.devEmail && (
            <span className='error-message'>
              {formState.errors.devEmail.message}
            </span>
          )}
        </div>
        <div className='flex gap-2 justify-center'>
          <button type='button' className='btn' onClick={() => cancel()}>
            Cancelar
          </button>
          <button type='submit' className='btn'>
            Salvar
          </button>
        </div>
      </div>
    </form>
  )
}
