import React from 'react'
import { addNumbers, greetUser } from "../../services/test/test.service"; 

const Test = () => {
    
  const sum = addNumbers(5, 10);
  const greeting = greetUser("John");
  return (
    <div>
        <h1>{greeting}</h1>
        <p>Sum of 5 + 10 = {sum}</p>
    </div>
  )
}

export default Test