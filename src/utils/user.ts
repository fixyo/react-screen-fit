import { useMount } from 'utils'
import { useHttp } from './http'
import { useAsync } from './use-async'
import { User } from 'pages/project-list/search-pannel'

export const useUser = () => {
  const http = useHttp()
  const { run, ...result } = useAsync<User[]>()
  useMount(() => {
    run(http('/user/list'))
  })

  return result
}
