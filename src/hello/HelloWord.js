import React from 'react'

const helloWord = ({lastName}) => {
    const age = 19
    let adulte = true
  
  return (
    <div>
      <h1>hi react{lastName} you are { age <= 10 ? 'minor' : 'adulte'  } </h1>
    </div>
  )
}

export default helloWord
