import { useState, useCallback } from 'react'
export const useUndo = <T>(initial: T) => {
  // const [past, setPast] = useState<T[]>([])
  // const [present, setPresent] = useState(initial)
  // const [future, setFuture] = useState<T[]>([])
  const [state, setState] = useState<{
    past: T[]
    present: T
    future: T[]
  }>({
    past: [],
    present: initial,
    future: [],
  })

  // const canUndo = state.past.length !== 0
  // const canRedo = state.future.length !== 0

  const undo = useCallback(() => {
    setState((curState) => {
      const { past, future } = curState

      if (!past.length) return curState

      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)

      return {
        past: newPast,
        present: previous,
        future: [previous, ...future],
      }
    })
  }, [])

  const redo = useCallback(() => {
    setState((curState) => {
      const { past, present, future } = curState
      if (!future.length) return curState

      const next = future[0]

      return {
        past: [...past, present],
        present: next,
        future: future.slice(1),
      }
    })
  }, [])

  const set = useCallback((newPresent: T) => {
    setState((curState) => {
      const { past, present } = curState
      if (newPresent === present) return curState
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      }
    })
  }, [])

  return [
    state,
    {
      set,
      undo,
      redo,
      canUndo: state.past.length !== 0,
      canRedo: state.future.length !== 0,
    },
  ]
}
