import React, { useState } from "react";

export default function HookUseState() {
  //syntax bellow
  // const[state, setState] = useState()
  let favColor = "pink";

  const handleChange = () => {
    favColor = "blue";
    console.log(favColor);
  };

  //using useState
  const [color, setColor] = useState("red");

  const handleColor = () => setColor("yellow");

  // const [company, setCompany] = useState("codelab systems")
  // const [comtype, setComtype] = useState("IT")
  // const [year, setYear] = useState(2013)

  const [company, setCompany] = useState({
    company: "Codelab Systems",
    comtype: "IT",
    year: "2013",
  });
  return (
    <div>
      <h3>my favourite color is {favColor}</h3>
      <button onClick={handleChange}>change color</button>
      <br />
      <h3>using useState</h3>
      <h3>my favourite color is {color}</h3>
      <button onClick={handleColor}>change color</button>

      <h2>
        Welcome to {company.company}, {company.comtype} company, since{" "}
        {company.year}
      </h2>
    </div>
  );
}
