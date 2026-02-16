import React from 'react'

export default function SpreadOperator() {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];

    const book1 = ["JavaScript: The Good Parts", "Eloquent JavaScript", "You Don't Know JS"];
    const book2 = ["Clean Code", "The Pragmatic Programmer", "Code Complete"];
    const combinedArray = [...arr1, ...arr2];
    const combinedBooks = [...book1, ...book2];

  return (
    <div>
      {combinedArray}
      <br />
      {combinedBooks}
    </div>
  )
}
