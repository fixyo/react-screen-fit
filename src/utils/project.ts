import { useEffect, useCallback } from 'react'
import { Project } from 'pages/project-list/list'
import { useAsync } from './use-async'
import { useHttp } from './http'

export const useProject = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>()
  const http = useHttp()
  const getProjects = useCallback(
    () => http('/user/project', { data: param }),
    [http, param]
  )
  useEffect(() => {
    run(getProjects(), { retry: getProjects })
  }, [param, run, getProjects])

  return result
}

export const useEditProject = () => {
  const { run } = useAsync()
  const http = useHttp()
  return (projectId: number, pin: number) => {
    return run(
      http(`/user/project/${projectId}`, { data: { pin }, method: 'PATCH' })
    )
  }
}
