import React from 'react'
import { useScale } from './useScale'
import './index.less'

export default function ScaleScreen() {
  useScale()
  return (
    <div className="screen-wrapper">
      <div className="screen" id="screen">
        <div className="demo-root">
          <header>头部</header>
          <main>
            <div className="demo-left"></div>
            <div className="demo-center"></div>
            <div className="demo-right"></div>
          </main>
          <footer>底部</footer>
        </div>
      </div>
      <footer className="large-footer"></footer>
    </div>
  )
}
