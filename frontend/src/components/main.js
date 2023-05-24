import { React } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import useStore from '../store/store'

import Nav from './nav/nav'
import Body from './body/body'
import SignUp from './nav/sign-up/sign_up'
import Login from './nav/login/login'
import User from './nav/user/user'


export default function Main() {

  const user = useStore((state) => state.user);
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path='/user' element={<User id={user.id} username={user.username} email={user.email} />} />
          <Route path="/" element={<Body />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>

  )
}
