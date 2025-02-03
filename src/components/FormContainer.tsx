import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FormState,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { DevForm } from './DevForm'
import { ProjectForm } from './ProjectForm'
import { useDevProjectContext } from '../context/useDevProjectContext'
import { Create } from '../utils/Create'

const devSchema = z.object({
  devName: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  devEmail: z.string().email({ message: 'E-mail inválido' }),
})

const projectSchema = z.object({
  projectName: z
    .string()
    .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  dev_id: z
    .string()
    .refine((val) => val !== '', { message: 'Selecione um dev' }),
})

type DevFormData = z.infer<typeof devSchema>
type ProjectFormData = z.infer<typeof projectSchema>

export const FormContainer = () => {
  const [step, setStep] = useState<number>(0)
  const [emailExists, setEmailExists] = useState<boolean>(false)
  const { devData, devModeState, saveProject, saveDev } = useDevProjectContext()

  const { register, handleSubmit, formState, trigger, watch } = useForm<
    DevFormData | ProjectFormData
  >({
    resolver: zodResolver(step === 0 ? devSchema : projectSchema),
  })

  const watchEmail = watch('devEmail')
  const navigate = useNavigate()

  useEffect(() => {
    setEmailExists(false)
  }, [watchEmail])

  const onSubmit: SubmitHandler<DevFormData | ProjectFormData> = (data) => {
    const validateForm = async () => {
      const isValid = await trigger()
      if (step === 0 && isValid) {
        if (checkEmailExists(data as DevFormData)) return
        const devData = data as DevFormData
        saveDev({ ...devData, id: Create.Id(), stateMode: true })
        setStep(1)
      }
      if (step === 1 && isValid) {
        const projectData = data as ProjectFormData
        saveDev({ ...devModeState, stateMode: false })
        saveProject({
          id: Create.Id(),
          ...projectData,
          dev_id: projectData.dev_id ? projectData.dev_id : '',
        })
        navigate('/projetos')
      }
    }
    validateForm()
  }

  const checkEmailExists = (data: DevFormData): boolean => {
    const email = data.devEmail
    const selectedEmail = devData.find((dev) => dev.devEmail === email)
    if (selectedEmail) {
      setEmailExists(true)
      return true
    } else {
      return false
    }
  }

  const formComponents = [
    <DevForm
      register={register as UseFormRegister<DevFormData>}
      formState={formState as FormState<DevFormData>}
      emailExists={emailExists}
    />,
    <ProjectForm
      register={register as UseFormRegister<ProjectFormData>}
      formState={formState as FormState<ProjectFormData>}
    />,
  ]

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full shadow-2xl p-8 rounded-lg'
      noValidate
    >
      {formComponents[step]}
      <div className='flex gap-4 mt-8'>
        {step === 0 ? (
          <button type='submit' className='btn'>
            Prosseguir
          </button>
        ) : (
          <>
            <button
              type='button'
              onClick={(e) => {
                e.preventDefault()
                setStep(0)
              }}
              className='btn'
            >
              Voltar
            </button>
            <button type='submit' className='btn'>
              Salvar
            </button>
          </>
        )}
      </div>
    </form>
  )
}
