import { User } from 'pages/project-list/search-pannel'

const baseUrl = process.env.REACT_APP_API_URL
const localStorageKey = 'TOKEN_KEY'

export const getToken = () => {
  return window.localStorage.getItem(localStorageKey)
}

export const handleUserResponse = (user: User) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: { username: string; password: string }) => {
  return fetch(`${baseUrl}/user/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (res) => {
    if (res.ok) {
      const { data, code, msg } = await res.json()
      if (code === 200) {
        return handleUserResponse(data)
      } else {
        return Promise.reject({ data, code, msg })
      }
    } else {
      return Promise.reject(await res.json())
    }
  })
}

export const register = async (data: {
  username: string
  password: string
}) => {
  const res = await fetch(`${baseUrl}/user/register`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (res.ok) {
    return handleUserResponse(await res.json())
  } else {
    return Promise.reject(await res.json())
  }
}

export const logout = async () => {
  window.localStorage.removeItem(localStorageKey)
}
