import {React, useRef, useState} from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import useStore from '../../../store/store'


export default function Login() {
  const [display, setDisplay] = useState({prop: 'none', msg: ''});
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);


  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = async() => {
    let userLoginInfo = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value
    };
    
    if((userLoginInfo.email === '' || userLoginInfo.password === '') ) {
      setDisplay({prop: 'block', msg: 'please fill all the fields'});
      return;
    }
    const response = await fetch('https://comfortable-sandals-bee.cyclic.app/api/v1/login', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userLoginInfo)
    });
  
    const data = await response.json();

    if(data.user === "false") {
      setDisplay({prop: 'block', msg: 'User not exist-create an account'});
    }else if(data.user === "true" && data.wrongCredentials === "true") {
      setDisplay({prop: 'block', msg: 'Invalid email or password'});
    }else{
      setDisplay({prop: 'none', msg: ''});
      setUser(data.res);
      navigate('/');
    }  
  }



  return (
  <>
  <div class="signIn-container">
    <h1 class="heading">Login</h1>

    <div class="email">
      <div class="input-feild">
        <input type="text" placeholder="Email" ref={emailInputRef}/>
      </div>
    </div>

    <div class="password">
      <div class="input-feild">
        <input type="text" placeholder="Password" ref={passwordInputRef}/>
      </div>
    </div>
    <p className='invalid-msg' style={{display: display.prop}}>{display.msg}</p>
    <p class="signUp-link">did't have account <a onClick={() => navigate('/sign-up')}>sign up</a></p>

    <div class="submit">
      <button class="submit-btn" onClick={handleSubmit}>Login</button>
    </div>

  </div>
  </>
  )
}
