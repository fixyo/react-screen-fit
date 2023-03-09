import { useEffect, useState, useRef } from 'react'
export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const cleanObject = (obj: { [key in string]?: unknown }) => {
  const result = { ...obj }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (cb: () => void) => {
  useEffect(() => {
    cb()
    // eslint-disable-next-line
  }, [])
}

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [param, setParam] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setParam(value)
    }, delay)
    return () => {
      console.log('cleartimer')
      clearTimeout(timer)
    }
  }, [delay, value])

  return param
}

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current
  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  }, [oldTitle, keepOnUnmount])
}

export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}
