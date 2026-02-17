import React from 'react'

export default function Destructuring() {
    const number = [1,2,3,4,5]
    const [a,b,c,d,e] = number
    const num4 = number[4]

  return (
    <div>
      {a},{b},
      {num4}
    </div>
  )
}
