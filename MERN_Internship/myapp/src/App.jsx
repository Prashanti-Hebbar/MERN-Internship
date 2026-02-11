import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstApp from "./components/FirstApp";
import Register from "./components/MUI/Register";
import ArrowFunction from "./components/ES7/ArrowFunction";
import BasicTable from "./components/MUI/BasicTable";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/FirstApp' element={<FirstApp />} />
          <Route path='/' element={<Register />} />
          <Route path="/ArrowFunction" element={<ArrowFunction />} />
          <Route path="/BasicTable" element={<BasicTable />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

