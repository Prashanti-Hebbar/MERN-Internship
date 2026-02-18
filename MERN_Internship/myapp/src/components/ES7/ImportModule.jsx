import React from 'react'
import { name, age } from './ExportModule'

export default function ImportModule() {
  return (
    <div>
      my name is {name} and i am {age} years old.
    </div>
  )
}
