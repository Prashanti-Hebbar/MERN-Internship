import Button from "@mui/material/Button";
import React from "react";

export default function ArrowFunction() {
  // 1. Normal Function
  function Myfunction() {
    return <h3>Normal Function</h3>;
  }

  // 2. Arrow Function
  const MyArrowFunction = () => {
    return <h3>Arrow Function using multiple statement</h3>;
  };

  //   3. Arrow Function with single statement
  const SingleArrow = () => {
    return (
      <>
        <h3>Arrow Function with single statement</h3>
        <h4>second statement</h4>
      </>
    );
  };

  const handleClick = () => {
    alert("Button Clicked!");
  }

  const handleGreet = (name) => alert("Hello " + name) 

  return (
    <div>
      <Myfunction />
      <MyArrowFunction />
      <SingleArrow />
      <Button variant="contained" onClick={handleClick}>Click Me</Button>
      <Button variant="outlined" onClick={()=>console.log("hello! Good evening!")}>Greet</Button>
      <Button variant="outlined" onClick={()=>handleGreet("Prashanti")}>Alert</Button>
    </div>
  );
}
