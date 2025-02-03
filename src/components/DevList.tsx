import { useState } from 'react'
import { Eye } from '@phosphor-icons/react'
import { useDevProjectContext } from '../context/useDevProjectContext'
import { AlertModal } from './AlertModal'
import { EditDev } from './EditDev'
import { Project } from '../interfaces/Project'

export const DevLIst = () => {
  const [showProjectsModal, setShowProjectsModal] = useState<boolean>(false)
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [devId, setDevId] = useState<string>('')

  const { projectData, devData, removeDevOrProjectById } =
    useDevProjectContext()

  const devProjects = (id: string): Project[] => {
    const projects = projectData.filter((pj) => pj.dev_id === id)
    return projects
  }

  const removeDev = (id: string): void => {
    removeDevOrProjectById(id, 'dev')
    setShowAlertModal(false)
  }

  const selectModal = (id: string, type: string): void => {
    if (type === 'remove') setShowAlertModal(true)
    if (type === 'edit') setShowEditModal(true)
    setDevId(id)
  }

  return (
    <>
      {showAlertModal && (
        <AlertModal
          text='Ao excluir um Dev você vai excluir todos os projetos relacionadoa a ele, quer continuar?'
          cancel={() => setShowAlertModal(false)}
          confirm={() => removeDev(devId)}
        />
      )}
      {showEditModal && (
        <EditDev cancel={() => setShowEditModal(false)} selectedId={devId} />
      )}
      {devData.length > 0 ? (
        devData.map((dev, i) => (
          <div
            key={dev.id}
            className='border p-4 rounded-lg min-w-64 relative text-center'
          >
            <span className='span-id'>#{i}</span>
            <p>
              Nome:{' '}
              <span className='font-bold text-gray-800'>{dev.devName}</span>
            </p>
            <p>
              E-mail:{' '}
              <span className='font-bold text-gray-800'>{dev.devEmail}</span>
            </p>
            <div>
              <h3 className='text-center font-bold uppercase my-2'>Projetos</h3>
              {devProjects(dev.id).length > 0 ? (
                <div>
                  <div className='flex items-center justify-center  gap-4 font-bold'>
                    <h3>
                      {devProjects(dev.id).length === 1
                        ? '(1)'
                        : `(+${devProjects(dev.id).length - 1})`}
                    </h3>
                    <Eye
                      className='cursor-pointer text-blue-600'
                      size={22}
                      onClick={() => {
                        setShowProjectsModal(!showProjectsModal)
                        setDevId(dev.id)
                      }}
                    />
                  </div>
                </div>
              ) : (
                <p className='text-gray-500 text-sm'>
                  Esse dev não possuí projetos ):
                </p>
              )}
            </div>
            <div className='flex gap-2 mt-8'>
              <button
                type='button'
                className='btn'
                onClick={() => selectModal(dev.id, 'edit')}
              >
                Editar
              </button>
              <button
                type='button'
                className='btn'
                onClick={() => selectModal(dev.id, 'remove')}
              >
                Remover
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Nunhum dev encontrado ):</p>
      )}
      {showProjectsModal && (
        <div className='modal-container'>
          <h3 className='w-full max-w-96 text-center text-lg text-white font-bold'>
            Projetos do Dev{' '}
            <span className='text-gray-300'>
              {devData.find((dev) => dev.id === devId)?.devName}
            </span>
          </h3>
          <ul className={`modal-child`}>
            <li
              className='span-id cursor-pointer bg-rose-500'
              onClick={() => setShowProjectsModal(!showProjectsModal)}
            >
              X
            </li>
            {devProjects(devId).map((pj) => (
              <li
                key={pj.id}
                className='shadow-2xl p-4 flex justify-center items-center min-w-32 rounded-md'
              >
                {pj.projectName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
