import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './nav.css'
import useStore from '../../store/store';

library.add(faRightFromBracket, faUser);


export default function Nav() {

  const navigate = useNavigate();
  const [display, setDisplay] = useState({ home: 'none', user: 'none', loginAndSignup: 'block' });

  const { user, removeUser } = useStore((state) => ({
    user: state.user,
    removeUser: state.removeUser
  }));

  const handleSignUpBtn = () => {
    navigate('/sign-up');
    setDisplay({ ...display, home: 'block' });
  }

  const handleHomeBtn = () => {
    navigate('/');
    setDisplay({ ...display, home: 'none' });
  }

  const handleLoginBtn = () => {
    navigate('/login')
    setDisplay({ ...display, home: 'block' });
  }

  const handleSignOutBtn = () => {
    navigate('/');
    removeUser();
    setDisplay({ home: 'none', user: 'none', loginAndSignup: 'block' });
  }

  const handleUsernameBtn = () => {
    navigate('/user');
    setDisplay({ ...display, home: 'block' });
  }

  useEffect(() => {
    Object.keys(user).length !== 0 && setDisplay({ home: 'none', user: 'block', loginAndSignup: 'none' });
  }, [user]);




  return (
    <>
      <div>
        <nav className="navbar">
          <nav className="nav-center">
            <div className="nav-header">
              <img className='title' src={require('../../static files/titleLogo.png')} alt='title' />
              {/* <h1 className="title" onClick={handleHomeBtn}>Word Per Minute</h1> */}
            </div>
            <div className="nav-links">
              <button className='home-btn' onClick={handleHomeBtn} style={{ display: display.home }}>Home</button>
              <button title='User account' className='user-btn' onClick={handleUsernameBtn} style={{ display: display.user }}><FontAwesomeIcon icon="fa-solid fa-user" /> {user.username}</button>
              <button className='login-btn' onClick={handleLoginBtn} style={{ display: display.loginAndSignup }}>Log in</button>
              <button id='signup-btn' className='signup-btn' onClick={handleSignUpBtn} style={{ display: display.loginAndSignup }}>Sign up</button>
              <button className='signout-btn' style={{ display: display.user }} onClick={handleSignOutBtn}><FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> Sign out</button>
            </div>
          </nav>
        </nav>
      </div>
    </>
  )
}
