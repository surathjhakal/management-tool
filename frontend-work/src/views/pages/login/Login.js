import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import HeaderContext from 'src/components/HeaderContext'
import { toast } from 'react-toastify'
import internalUserService from 'src/services/internalUserService'

const Login = () => {
  const navigate = useNavigate()
  const { setUserData } = useContext(HeaderContext)
  const [showPassword, setShowPassword] = useState(false)
  const [userInputData, setUserInputData] = useState({
    email: '',
    password: '',
  })

  const handleSignIn = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (userInputData.email == '' || regex.test(userInputData.email) === false) {
      toast.error('Enter your email correctly')
      return
    }
    if (userInputData.password == '') {
      toast.error('Enter your password')
      return
    }
    internalUserService
      .adminLogin({
        email: userInputData.email,
        password: userInputData.password,
      })
      .then((res) => {
        console.log(res)
        if (res.data) {
          if (res.data.userNotPresent) {
            toast.error('User not registered with that email')
            navigate('/singup')
          } else if (res.data.passwordNotMatch) {
            toast.error('Entered incorrect password')
            return
          } else {
            localStorage.setItem('userUUID', res.data.data.uuid)
            localStorage.setItem('role', res.data.data.role)
            setUserData(res.data.data)
            navigate('/homepage')
          }
        }
      })
  }

  const handleInputChange = (e, type) => {
    const value = e.target.value
    setUserInputData({ ...userInputData, [type]: value })
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        value={userInputData.email}
                        onChange={(e) => handleInputChange(e, 'email')}
                        style={{ outline: 'none' }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={userInputData.password}
                        onChange={(e) => handleInputChange(e, 'password')}
                        style={{ outline: 'none' }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleSignIn}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
