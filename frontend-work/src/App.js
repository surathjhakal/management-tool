import React, { Component, Suspense, useContext, useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { injectStyle } from 'react-toastify/dist/inject-style'
import 'react-datepicker/dist/react-datepicker.css'
import './scss/style.scss'
import './css/AppAccess.css'
import HeaderContext from './components/HeaderContext'
import { ToastContainer } from 'react-toastify'
import customerService from './services/customerService'
import internalUserService from './services/internalUserService'
// import jwt from 'jsonwebtoken'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const AdminLoginPage = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
const LoginPage = React.lazy(() => import('./components/Login'))
// const AdminLoginPage = React.lazy(() => import('./components/AdminLoginPage'))
const SignupPage = React.lazy(() => import('./components/Signup'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { userData, setUserData } = useContext(HeaderContext)
  const navigate = useNavigate()
  if (typeof window !== 'undefined') {
    injectStyle()
  }
  useEffect(() => {
    console.log('userData', userData)
  }, [userData])

  useEffect(() => {
    if (localStorage.getItem('userUUID') && !userData) {
      const userUUID = localStorage.getItem('userUUID')
      if (localStorage.getItem('role')) {
        internalUserService.getAdminUser(userUUID).then((res) => {
          console.log(res)
          setUserData(res.data)
          navigate('/homepage')
        })
      } else {
        customerService.getCustomer(userUUID).then((res) => {
          setUserData(res.data)
          navigate('/homepage')
        })
      }
    }
  }, [])

  return (
    <>
      <ToastContainer />
      <Suspense fallback={loading}>
        <Routes>
          {!userData ? (
            <>
              <Route
                exact
                path="/admin/login"
                name="Admin Login Page"
                element={<AdminLoginPage />}
              />
              <Route exact path="/login" name="Login Page" element={<LoginPage />} />
              <Route exact path="/signup" name="SignupPage Page" element={<SignupPage />} />
              <Route path="*" element={<Navigate to="login" replace />} />
            </>
          ) : (
            <>
              <Route exact path="*" name="Home" element={<DefaultLayout />} />
              {/* <Route path="*" name="Page 404" element={<Page404 />} /> */}
            </>
          )}
        </Routes>
      </Suspense>
    </>
  )
}

export default App
