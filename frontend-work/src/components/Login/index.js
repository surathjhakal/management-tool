import React, { useContext } from 'react'
import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineGithub } from 'react-icons/ai'
import { useState } from 'react'
import { toast } from 'react-toastify'
import HeaderContext from '../HeaderContext'
import { CButton, CFormCheck } from '@coreui/react'
import { Link, useNavigate } from 'react-router-dom'
import internalUserService from '../../services/internalUserService'
import customerService from 'src/services/customerService'

const LoginPage = () => {
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
    customerService
      .customerLogin({
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
    <div className="LoginDiv">
      <div className="LoginDivTitle">DUWORK</div>
      <div className="LoginMainDiv">
        <h4 className="LoginHeader">Sign In</h4>
        <p className="LoginInfo">Enter your email & password to login</p>

        <div className="LoginFields">
          <p className="LoginFieldsHeader">Email Address</p>
          <input
            className="LoginInputFields"
            name="email"
            value={userInputData.email}
            onChange={(e) => handleInputChange(e, 'email')}
          />
        </div>
        <div className="LoginFields">
          <p className="LoginFieldsHeader">Password</p>
          <input
            className="LoginInputFields"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={userInputData.password}
            onChange={(e) => handleInputChange(e, 'password')}
          />
          <span onClick={handleShowPassword}>{showPassword ? 'Hide' : 'Show'}</span>
        </div>

        <div className="LoginForgotRemember centerItems">
          <CFormCheck id="flexCheckDefault" className="LoginForgotRememberCheckbox" />
          <p>Remember password</p>
          <div className="LoginForgotPassword">Forgot password?</div>
        </div>
        <CButton className="LoginButton" color="success" onClick={handleSignIn}>
          Sign In
        </CButton>
        <div className="LoginOtherMethodLine centerItems">
          <h3>Or Sign in with</h3>
          <div></div>
        </div>
        <div className="LoginOtherMethodButtons centerItems">
          <div>
            <FaFacebookF />
          </div>
          <div>
            <FcGoogle />
          </div>
          <div>
            <AiOutlineGithub />
          </div>
        </div>
        <div className="LoginAccountExistOrNot">
          Don&quot;t have account? <Link to="/signup"> Create Account</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
