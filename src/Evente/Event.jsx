import React, { useEffect, useState } from 'react';

export default function Event({step,initial}) {



  const [number, setNumber] = useState(initial);
  const [time,setTime] = useState(new Date())

  useEffect(()=>{
    console.log('counter changed')

   },[number])
  useEffect(()=>{
    console.log('counter updated')
    setTime(new Date())
    console.log(time)


   },[time])


  const handleClick = () => {
    setNumber(number + step);
  };

  return (
    <>
<p>{time.toLocalString()}</p>
      <h1>Voici le numéro {number}</h1>
      <button onClick={handleClick}>Click</button>
      <button onClick={()=>{
        setNumber(ProgressEvent)
      }}>Rest</button>
    </>
  );
}
