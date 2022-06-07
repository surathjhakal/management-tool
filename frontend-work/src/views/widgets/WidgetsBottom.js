import React from 'react'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import PropTypes from 'prop-types'
import UserTable from './UserTable'
import TaskTable from './TaskTable'
import CreateNewAdminAccount from './CreateNewAdminAccount'

const tableExample = [
  {
    avatar: { src: avatar1, status: 'success' },
    user: {
      name: 'Yiorgos Avraamu',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'USA', flag: cifUs },
    usage: {
      value: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'success',
    },
    payment: { name: 'Mastercard', icon: cibCcMastercard },
    activity: '10 sec ago',
    phoneNumber: '123456',
    email: 'test@gmail.com',
  },
]

const WidgetsBottom = ({ data, optionSelected, addNewUser, totalUsers, UpdatedTask }) => {
  WidgetsBottom.propTypes = {
    data: PropTypes.node.isRequired,
    optionSelected: PropTypes.node.isRequired,
    addNewUser: PropTypes.node.isRequired,
    totalUsers: PropTypes.node.isRequired,
    UpdatedTask: PropTypes.node.isRequired,
  }

  const getTableHeader = () => {
    if (optionSelected == 'customers') return 'All Customers'
    if (optionSelected == 'internalUsers') return 'All Internal Users'
    if (optionSelected == 'tasks') return 'All Tasks'
    if (optionSelected == 'createAccount') return 'Create New Account'
  }

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>{getTableHeader()}</CCardHeader>
          <CCardBody>
            <br />
            {optionSelected == 'tasks' && (
              <TaskTable data={data} totalUsers={totalUsers} UpdatedTask={UpdatedTask} />
            )}
            {optionSelected == 'createAccount' && <CreateNewAdminAccount addNewUser={addNewUser} />}
            {(optionSelected == 'internalUsers' || optionSelected == 'customers') && (
              <UserTable data={data} optionSelected={optionSelected} />
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default WidgetsBottom
