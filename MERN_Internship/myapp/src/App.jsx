import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstApp from "./components/FirstApp";
import Register from "./components/MUI/Register";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/FirstApp' element={<FirstApp />} />
          <Route path='/' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}