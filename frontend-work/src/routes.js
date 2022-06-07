import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Homepage = React.lazy(() => import('./components/Homepage'))
const TasksPage = React.lazy(() => import('./components/TasksPage'))
const InboxPage = React.lazy(() => import('./components/InboxPage'))
const AboutPage = React.lazy(() => import('./components/AboutPage'))
const ProfilePage = React.lazy(() => import('./components/ProfilePage'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/homepage', name: 'Homepage', element: Homepage },
  { path: '/tasks', name: 'My Tasks', element: TasksPage },
  { path: '/inbox', name: 'Inbox', element: InboxPage },
  { path: '/about', name: 'About', element: AboutPage },
  { path: '/profile-page', name: 'Profile Page', element: ProfilePage },
]

export default routes
