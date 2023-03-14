import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import './index.less'
export default function Index() {
  return (
    <div className="app-container bs1">
      <div className="app-nav bs1">
        <NavLink to="/scale-screen">scale等比缩放页面</NavLink>
        <NavLink to="/shuffle-animate">shuffle动画</NavLink>
      </div>
      <div className="app-view bs1">
        <Outlet></Outlet>
      </div>
    </div>
  )
}
