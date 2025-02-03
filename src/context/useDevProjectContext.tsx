import { useContext } from 'react'
import { DevProjectContext } from './DevProjectContext'
import { DevProjectContextType } from '../interfaces/DevProjectContextType'

export const useDevProjectContext = (): DevProjectContextType => {
  const context = useContext(DevProjectContext)
  if (!context) {
    throw new Error('useDevProjectContext must be inside DevProjectProvider')
  }
  return context
}
