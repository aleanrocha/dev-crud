import React, { useState, useEffect, createContext } from 'react'

import { DevProjectContextType } from '../interfaces/DevProjectContextType'
import { Dev } from '../interfaces/Dev'
import { Project } from '../interfaces/Project'

interface DevProjectProviderProps {
  children: React.ReactNode
}

const DevProjectContext = createContext<DevProjectContextType | null>(null)

const DevProjectProvider = ({ children }: DevProjectProviderProps) => {
  const [devData, setDevData] = useState<Dev[]>([])
  const [projectData, setProjectData] = useState<Project[]>([])
  const [devModeState, setDevModeState] = useState<Dev>({} as Dev)

  const saveDevsToLS = (devData: Dev[]): void =>
    localStorage.setItem('devData', JSON.stringify(devData))

  const saveProjectsToLS = (projectData: Project[]): void =>
    localStorage.setItem('projectData', JSON.stringify(projectData))

  useEffect(() => {
    const fetchDevFromLS = (): void => {
      const devDataFromLS = localStorage.getItem('devData')
      if (devDataFromLS) {
        setDevData(JSON.parse(devDataFromLS))
      }
    }

    const fetchProjectFromLS = (): void => {
      const projectDataFromLS = localStorage.getItem('projectData')
      if (projectDataFromLS) {
        setProjectData(JSON.parse(projectDataFromLS))
      }
    }
    fetchDevFromLS()
    fetchProjectFromLS()
  }, [])

  const saveDev = (newDev: Dev): void => {
    if (!newDev.stateMode) {
      const newDevData = [...devData, newDev]
      saveDevsToLS(newDevData)
      setDevData(newDevData)
    } else {
      setDevModeState(newDev)
    }
  }

  const saveProject = (newProject: Project): void => {
    const newProjectData = [...projectData, newProject]
    saveProjectsToLS(newProjectData)
    setProjectData(newProjectData)
  }

  const removeDevOrProjectById = (id: string, type: string): void => {
    if (type === 'project') {
      const newProjects = projectData.filter((pj) => pj.id !== id)
      saveProjectsToLS(newProjects)
      setProjectData(newProjects)
    }
    if (type === 'dev') {
      const newDevs = devData.filter((dev) => dev.id !== id)
      const newProjects = projectData.filter((pj) => pj.dev_id !== id)
      saveDevsToLS(newDevs)
      saveProjectsToLS(newProjects)
      setDevData(newDevs)
      setProjectData(newProjects)
    }
  }

  const updateProjectById = (
    id: string,
    newProjectData: Partial<Project>
  ): void => {
    const project = projectData.find((pj) => pj.id === id)
    if (project && newProjectData) {
      const updatedProject = {
        ...project,
        projectName: newProjectData.projectName,
        dev_id: newProjectData.dev_id,
      } as Project
      const updatedProjects = projectData.map((pj) =>
        pj.id === id ? updatedProject : pj
      )
      saveProjectsToLS(updatedProjects)
      setProjectData(updatedProjects)
    }
  }

  const updateDevById = (id: string, newDevData: Partial<Dev>): void => {
    const dev = devData.find((dev) => dev.id === id)
    if (dev && newDevData) {
      const updatedDev = {
        ...dev,
        devName: newDevData.devName,
        devEmail: newDevData.devEmail,
      } as Dev
      const updatedDevs = devData.map((dev) =>
        dev.id === id ? updatedDev : dev
      )
      saveDevsToLS(updatedDevs)
      setDevData(updatedDevs)
    }
  }

  return (
    <DevProjectContext.Provider
      value={{
        devData,
        devModeState,
        projectData,
        saveDev,
        saveProject,
        removeDevOrProjectById,
        updateProjectById,
        updateDevById,
      }}
    >
      {children}
    </DevProjectContext.Provider>
  )
}

export { DevProjectContext, DevProjectProvider }
