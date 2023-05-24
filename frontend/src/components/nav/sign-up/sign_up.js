import React, { useState } from 'react'
import './sign_up.css'
import { useNavigate } from 'react-router-dom'
import { useRef, useReducer } from 'react';
import { validateName, validateEmail, validatePassword } from "./validators";



export default function SignUp() {
  
  const validatorReducer = (validator, action) => {
    switch(action.type) {
      case 'Username':
        validateName(action.value) ? setOutlineColor({...outlineColor, username: {state: `1px solid green`, color:'1px solid green'}}) :
        setOutlineColor({...outlineColor, username: {state: '1px solid red', color: '1px solid red'}});
        return {...validator, username: validateName(action.value)};

      case 'Email': 
        validateEmail(action.value) ? setOutlineColor({...outlineColor, email: {state: `1px solid green`, color:'1px solid green'}}) :
        setOutlineColor({...outlineColor, email: {state: '1px solid red', color: '1px solid red'}});
        return {...validator, email: validateEmail(action.value)};
      case 'Password':
        validatePassword(action.value) ? setOutlineColor({...outlineColor, password: {state: `1px solid green`, color:'1px solid green'}}) : 
        setOutlineColor({...outlineColor, password: {state: '1px solid red', color: '1px solid red'}});
        return {...validator, password: validatePassword(action.value)};
    }
  }

  const [outlineColor, setOutlineColor] = useState({username: {state: 'none', color: 'none'}, email: {state: 'none', color: 'none'}, password: {state: 'none', color: 'none'}});
  const [display, setDisplay] = useState({prop: 'none', msg: ''});
  const [validator, setValidator] = useReducer(validatorReducer, {username: false, email: false, password: false})
  

  const navigate = useNavigate();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();


  const handleSubmit = async() => {
    const userInfo = {
      userName: usernameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value
    }

    if((userInfo.userName === '' || userInfo.email === '' || userInfo.password === '') ) {
      setDisplay({prop: 'block', msg: 'please fill all the fields'});
      return;
    }
    else if(!validator.username || !validator.email || !validator.password ) {
      setDisplay({prop: 'block', msg: 'please fill all the fields correctly'});
      return;
    }

    const response = await fetch('https://comfortable-sandals-bee.cyclic.app/api/v1/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  })

  const data = await response.json();
  // update it to user flag ;

  if(data.massege === 'user already exists') {
    setDisplay({prop: 'block', msg: 'email already in use'});
    return;
  }
  navigate('/login');

  }


  // delayed because setvalidator updated and validator.name comsume it in next render.
  const handleChange = (e) => {
    switch(e.target.placeholder) {
      case 'Username':
        setValidator({type: 'Username', value: e.target.value});
        break;
      case 'Email':
        setValidator({type: 'Email', value: e.target.value});
        break;
      case 'Password':
        setValidator({type: 'Password', value: e.target.value});
        break;
    }
  }
  
  // this need to edited
  const handleMouseClick = (e) => {
    switch(e.target.placeholder) {
      case 'Username':
        setOutlineColor({ ...outlineColor, username: outlineColor.username.state === 'none' ? {...outlineColor.username, color:'1px solid red'} : {...outlineColor.username, color: '1px solid green'} })
        break;
      case 'Email':
        setOutlineColor({ ...outlineColor,
        email: outlineColor.email.state === 'none' ? {...outlineColor.email, color:'1px solid red'} : {...outlineColor.email, color: '1px solid green'} });
        break;
      case 'Password':
        setOutlineColor({ ...outlineColor,
        password: outlineColor.password.state === 'none' ? {...outlineColor.password, color:'1px solid red'} : {...outlineColor.password, color: '1px solid green'} });
        break;
    }
  }
  
  return (
    <>
    <form action="">
      <div className="signUp-container">
        <h1 className="heading">Sign Up</h1>

        <div className="user-name">
          <div className="input-feild">
          <input required type="text" placeholder="Username" ref={usernameInputRef} onChange={handleChange} onClick={handleMouseClick} style={{outline: outlineColor.username.color}}  />
          </div>
        </div>

        <div className="email">
          <div className="input-feild">
            <input  required type="text" placeholder="Email" ref={emailInputRef} onChange={handleChange} onClick={handleMouseClick} style={{outline: outlineColor.email.color}} />
          </div>
        </div>

        <div className="password">
          <div className="input-feild">
            <input type="text" placeholder="Password" ref={passwordInputRef} onChange={handleChange} onClick={handleMouseClick} style={{outline: outlineColor.password.color}} />
          </div>
        </div>

        <p className='invalid-msg' style={{display: display.prop}}>{display.msg}</p>
        <p className="forget-password">already a user <a onClick={() => navigate('/login')}>sign in</a></p>

        <div className="submit">
          <button className="submit-btn" type="button" onClick={handleSubmit}>Submit</button>
        </div>

      </div>

    </form>
    </>
    
  )
}
