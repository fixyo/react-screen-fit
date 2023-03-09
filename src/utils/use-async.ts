import { useState, useCallback } from 'react'
import { useMountedRef } from 'utils'

interface State<D> {
  data: D | null
  error: Error | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  data: null,
  error: null,
  stat: 'idle',
}

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState,
  })

  const mountedRef = useMountedRef()

  const [retry, setRetry] = useState(() => () => {})

  const setData = useCallback((data: D) => {
    return setState({ data, error: null, stat: 'success' })
  }, [])

  const setError = useCallback((error: Error) => {
    return setState({ data: null, error, stat: 'error' })
  }, [])

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('参数须为promise类型')
      }

      setState((prevState) => {
        return { ...prevState, stat: 'loading' }
      })

      // 此种方式会造成无限循环
      // setState({ ...state, stat: 'loading' })

      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig)
        }
      })

      return promise
        .then((data) => {
          if (mountedRef.current) {
            setData(data)
          }
          return data
        })
        .catch((err) => {
          setError(err)
          return err
        })
    },
    [mountedRef, setData, setError]
  )
  return {
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isIdle: state.stat === 'idle',
    isSuccess: state.stat === 'success',
    run,
    retry,
    setData,
    setError,
    ...state,
  }
}
