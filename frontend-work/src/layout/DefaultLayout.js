import React, { useContext, useEffect } from 'react'
import HeaderContext from 'src/components/HeaderContext'
import internalUserService from 'src/services/internalUserService'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  const { setAllInternalUsers } = useContext(HeaderContext)
  useEffect(() => {
    internalUserService.getAllUsers().then((res) => {
      console.log(res)
      setAllInternalUsers(res.data)
    })
  }, [])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
