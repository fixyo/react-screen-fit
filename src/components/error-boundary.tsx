import React, { ReactNode } from 'react'

type FallbackRender = ({ error }: { error: Error | null }) => React.ReactElement

export class ErrorBoundary extends React.Component<
  {
    children: ReactNode
    fallbackRender: FallbackRender
  },
  { error: Error | null }
> {
  state = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props

    if (error) {
      return fallbackRender({ error })
    }

    return children
  }
}
