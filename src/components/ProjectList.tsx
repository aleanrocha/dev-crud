import { useState } from 'react'

import { useDevProjectContext } from '../context/useDevProjectContext'
import { AlertModal } from './AlertModal'
import { EditProject } from './EditProject'

export const ProjectList = () => {
  const { projectData, devData, removeDevOrProjectById } =
    useDevProjectContext()
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<string>('')

  const devName = (id: string): string | undefined => {
    const dev = devData.find((dev) => dev.id === id)
    if (dev) return dev?.devName
    return undefined
  }

  const removeProject = (): void => {
    if (selectedId !== '') {
      removeDevOrProjectById(selectedId, 'project')
      setShowAlertModal(false)
    }
  }

  const selectModal = (id: string, type: string): void => {
    if (type === 'edit') setShowEditModal(true)
    if (type === 'remove') setShowAlertModal(true)
    setSelectedId(id)
  }

  return (
    <>
      {showAlertModal && (
        <AlertModal
          text='Tem certeza que deseja excluir o projeto?'
          cancel={() => setShowAlertModal(false)}
          confirm={() => removeProject()}
        />
      )}
      {showEditModal && (
        <EditProject
          selectedId={selectedId}
          cancel={() => setShowEditModal(false)}
        />
      )}
      {projectData.length > 0 ? (
        projectData.map((pj, i) => (
          <div key={pj.id} className='border p-4 rounded-lg min-w-64 relative'>
            <span className='span-id'>#{i}</span>
            <p>
              Nome:{' '}
              <span className='font-bold text-gray-800'>{pj.projectName}</span>
            </p>
            <p>
              Por:{' '}
              <span className='font-bold text-gray-800'>
                {devName(pj.dev_id)}
              </span>
            </p>
            <div className='flex gap-2 mt-4'>
              <button
                type='button'
                className='btn'
                onClick={() => selectModal(pj.id, 'edit')}
              >
                Editar
              </button>
              <button
                type='button'
                className='btn'
                onClick={() => selectModal(pj.id, 'remove')}
              >
                Remover
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhuum projeto encontrado ):</p>
      )}
    </>
  )
}
