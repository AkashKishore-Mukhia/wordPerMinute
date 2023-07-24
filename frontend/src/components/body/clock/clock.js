import React, { useEffect, useState } from 'react'
import './clock.css'


export default function Clock({wpm, setSeconds, flag}) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter => counter+1);
    }, 1000);
    
    if(counter === 60 || flag) {
      counter === 60 && setSeconds(counter);
      clearInterval(interval);
    }else{
      setSeconds(counter);
    }

    // clean up funcion
    return () => clearInterval(interval);
  }, [counter])

  return (
    <>
      <div className='counter'>
        : {counter}
      </div>
    </>
  )
}
