import React, { useEffect, useState, useReducer, useRef } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import './body.css'

import createSpan from './utils/create_span';
import Clock from './clock/clock';
import Result from './result/result';
import {displayReducer, resultAttributeReducer} from './utils/reducers'
import useStore from '../../store/store';

var wpm, acc;
library.add(faRotate);


export default function Body({}) {
  const [charArray, setCharArray] = useState([' ']);
  const [id, setId] = useState([]);
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [flag, setFlag] = useState(false);

  const [inputDisplayStyle, setInputDisplayStyle] = useReducer(displayReducer, {displayProp: 'block'});
  const [resultDisplayStyle, setResultDisplayStyle] = useReducer(displayReducer, {displayProp: 'none'});
  const [resultAttributes, setResultAttributes] = useReducer(resultAttributeReducer, {wpm: 0, acc: 0});
  const user = useStore((state) => state.user);
  // selecting input Element
  const inputTag = useRef();
  

  useEffect(() => {
    const fetchData = async () => {
      return await createSpan();
    }
    fetchData().then((array) => {
      setCharArray(array);
      // assign a demo arr for reading the id state of each span
      const dummyArr = new Array(array.length).fill(null);
      setId(dummyArr);
      setInputDisplayStyle({type: 'block'});
      setResultDisplayStyle({type: 'none'});
      if(flag) setFlag(false);
    });
  }, []);

  useEffect(() => {
    if (seconds == 60 || index == charArray.length) {
      // console.log('if seconds=60 or index === chararray.length', seconds, index)
      setResultDisplayStyle({type: 'block'});
      setInputDisplayStyle({type: 'none'});
      wpm = parseInt((resultAttributes.wpm*60)/seconds);
      acc = 100 - parseInt((resultAttributes.acc *100) / index);
      if(!isEmpty(user)) recordInfo(wpm, acc, user.id);
    }
  }, [seconds, index])


  const handleResetBtn = async () => {
    const array = await createSpan();
    setCharArray(array);
    const idArray = new Array(array.length).fill(null);
    // index reset
    setIndex(0);
    // array with span id's
    setId(idArray);
    if(flag) setFlag(false);
    // handles display properies
    setResultDisplayStyle({type: 'none'});
    setInputDisplayStyle({type: 'block'});
    // seconds and wpm, acc
    setSeconds(0);
    setResultAttributes({});
    // inputTag clear old values
    inputTag.current.value = '';
  }

  const handleInput = (e) => {
    const char = e.nativeEvent.data;
    let newArr = [];
    if(!flag) setFlag(!flag);   // for initial render only
    // if the currChar and orginal char is __ and same
    if(char === ' ' && char === charArray[index]) {
      if(index !== charArray.length) setIndex(index+1);
      setResultAttributes({increment: 'wpm'});
      e.target.value = '';

    // if the currChar and original char is same
    }else if(char === charArray[index]) {
      if(index !== charArray.length) setIndex(index+1);
      newArr = [...id];
      newArr[index] = 'active';
      setId(newArr);

    // if currchar is backspace
    }else if(char === null) {
      if(index > 0) setIndex(index-1);
      newArr = [...id];
      newArr[index-1] = null;
      setId(newArr);
      
    // if currChar is not matched with original char
    }else {
      if(index !== charArray.length-1) setIndex(index+1);
      newArr = [...id];
      newArr[index] = 'passive';
      setId(newArr);
      setResultAttributes({increment: 'acc'});
    }
  }

  const recordInfo = async (wpm, acc, id) => {
    // console.log(`wpm: ${wpm}, acc: ${acc}, id: ${id}`)
    const userData = {
      wpm,
      acc,
      id
    };
    const response = await fetch('https://wild-red-prawn-hat.cyclic.app/api/v1/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
  }

  const isEmpty = (user) => {
    return Object.keys(user).length === 0;
  }

  return (
    <>
    <div>{flag === true ? <Clock wpm={seconds === 0 ? 0 : parseInt((resultAttributes.wpm*60)/seconds)} setSeconds={setSeconds} flag ={index===charArray.length}/> : ''}
    </div>

    <div className="text-container">{
      charArray.map((char, index) => {
        return <span key={index} className={index} id={id[index]}>{char}</span>
      })
    }</div>

    <div className="input-box-container">
      <input type="text" id="input-box" autoComplete="off" onInput={handleInput} ref={inputTag} placeholder='type here' style={ {display: inputDisplayStyle.displayProp}}></input>
      <div className='type-again'>
        <button id="restart-btn" onClick={handleResetBtn} title='Type again'><FontAwesomeIcon icon="fa-solid fa-rotate" /></button>
      </div>
    </div>

    <Result wpm={wpm}  acc={acc} resultDisplayStyle={resultDisplayStyle}/>
    </>
  )
}
