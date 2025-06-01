import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Header1 from './Header1'


const AppLayout = () => {
  return (
    <div>
      <Header1/>
      <Outlet/>
    </div>
  )
}

export default AppLayout
