import qs from 'qs'
import { useCallback } from 'react'
import * as Auth from '../auth-provider'
import { useAuth } from 'context/auth-context'

const baseUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  token?: string
  data?: object
}

export const http = async (
  endPoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig,
  }

  config.method = config.method.toUpperCase()

  if (config.method === 'GET') {
    endPoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data)
  }
  return fetch(`${baseUrl}${endPoint}`, config).then(async (res) => {
    if (res.ok) {
      const { code, data } = await res.json()
      if (code === 401) {
        await Auth.logout()
        window.location.reload()
        return Promise.reject({ message: '请重新登陆' })
      }

      if (code === 200) {
        return data
      } else {
        return Promise.reject(await res.json())
      }
    }
  })
}

export const useHttp = () => {
  const { user } = useAuth()

  return useCallback(
    (...[endPoint, config]: Parameters<typeof http>) => {
      return http(endPoint, { ...config, token: user?.token })
    },
    [user?.token]
  )
}
