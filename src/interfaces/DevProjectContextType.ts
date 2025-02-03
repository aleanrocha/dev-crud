import { Dev } from './Dev'
import { Project } from './Project'

export interface DevProjectContextType {
  devData: Dev[]
  devModeState: Dev
  projectData: Project[]
  saveDev: (dev: Dev) => void
  saveProject: (project: Project) => void
  removeDevOrProjectById: (id: string, type: string) => void
  updateDevById: (id: string, newDevData: Partial<Dev>) => void
  updateProjectById: (id: string, projectData: Partial<Project>) => void
}
