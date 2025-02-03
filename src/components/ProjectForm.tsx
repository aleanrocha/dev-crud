import { FormState, UseFormRegister } from 'react-hook-form'
import { useDevProjectContext } from '../context/useDevProjectContext'

interface ProjectFormValues {
  projectName: string
  dev_id: string
}

interface ProjectFormProps {
  register: UseFormRegister<ProjectFormValues>
  formState: FormState<ProjectFormValues>
}

export const ProjectForm = ({ register, formState }: ProjectFormProps) => {
  const { devData, devModeState } = useDevProjectContext()
  return (
    <div className='form-container'>
      <div className='form-control'>
        <label htmlFor='projectName'>Projeto</label>
        <input
          type='text'
          id='projectName'
          placeholder='Digite o nome do projeto...'
          className='input'
          {...register('projectName')}
        />
        {formState.errors.projectName && (
          <span className='error-message'>
            {formState.errors.projectName.message}
          </span>
        )}
      </div>
      <div className='form-control'>
        <label htmlFor='dev'>Desenvolvedor</label>
        <select
          id='dev'
          className='input'
          defaultValue=''
          {...register('dev_id')}
        >
          <option value='' disabled>
            Selecionar
          </option>
          {devModeState && (
            <option value={devModeState.id}>{devModeState.devName}</option>
          )}
          {devData.map((dev) => (
            <option key={dev.id} value={dev.id}>
              {dev.devName}
            </option>
          ))}
        </select>
        {formState.errors.dev_id && (
          <span className='error-message'>
            {formState.errors.dev_id.message}
          </span>
        )}
      </div>
    </div>
  )
}
