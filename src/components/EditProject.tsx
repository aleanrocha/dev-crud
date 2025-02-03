import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useDevProjectContext } from '../context/useDevProjectContext'
import { Project } from '../interfaces/Project'
import { Dev } from '../interfaces/Dev'

const projectSchema = z.object({
  projectName: z
    .string()
    .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  dev_id: z
    .string()
    .refine((val) => val !== '', { message: 'Selecione um dev' }),
})

interface EditProjectProps {
  selectedId: string
  cancel: () => void
}

type ProjectFormData = z.infer<typeof projectSchema>

export const EditProject = ({ selectedId, cancel }: EditProjectProps) => {
  const { devData, projectData, updateProjectById } = useDevProjectContext()
  const { register, handleSubmit, formState } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  })

  const selectedProject = (): Project | undefined => {
    if (selectedId !== '') {
      const project = projectData.find((pj) => pj.id === selectedId)
      if (project) {
        return project
      }
      return undefined
    }
  }

  const selectedDev = (): Dev | undefined => {
    const project = selectedProject()
    const dev = devData.find((dev) => dev.id === project?.dev_id)
    if (dev) return dev
    return undefined
  }

  const onSubmit: SubmitHandler<ProjectFormData> = (data) => {
    updateProjectById(selectedId, data)
    cancel()
  }

  return (
    <form className='modal-container' onSubmit={handleSubmit(onSubmit)}>
      <div className='form-container modal-child text-left'>
        <div className='form-control'>
          <label htmlFor='projectName'>Editar nome</label>
          <input
            type='text'
            id='projectName'
            placeholder='Digite o nome do projeto...'
            className='input'
            defaultValue={selectedProject()?.projectName}
            {...register('projectName')}
          />
          {formState.errors.projectName && (
            <span className='error-message'>
              {formState.errors.projectName.message}
            </span>
          )}
        </div>
        <div className='form-control'>
          <label htmlFor='dev'>Editar desenvolvedor</label>
          <select
            id='dev'
            className='input'
            defaultValue={selectedDev()?.id}
            {...register('dev_id')}
          >
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
