import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstApp from "./components/FirstApp";
import Register from "./components/MUI/Register";
import ArrowFunction from "./components/ES7/ArrowFunction";
import BasicTable from "./components/MUI/BasicTable";
import ArrayMethod from "./components/ES7/ArrayMethod";
import SpreadOperator from "./components/ES7/SpreadOperator";
import MuiAppbar from "./components/MUI/MuiAppbar";
import Destructuring from "./components/ES7/Destructuring";
import ImportModule from "./components/ES7/ImportModule";
import TernaryOperator from "./components/ES7/TernaryOperator";
import Props from "./components/ES7/Props";
import HookUseState from "./components/Hook/HookUseState";
import MuiCard from "./components/MUI/MuiCard"
import Task1 from "./components/Hook/Task1"
import Task2 from "./components/Hook/Task2"
import HookUseEffect from "./components/Hook/HookUseEffect"
import ApiAxios from "./components/Hook/ApiAxios"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <MuiAppbar />
        <Routes>
          <Route path='/FirstApp' element={<FirstApp />} />
          <Route path='/' element={<Register />} />
          <Route path="/ArrowFunction" element={<ArrowFunction />} />
          <Route path="/BasicTable" element={<BasicTable />} />
          <Route path="/ArrayMethod" element={<ArrayMethod />} />
          <Route path="/SpreadOperator" element={<SpreadOperator />} />
          <Route path="/Destructuring" element={<Destructuring />} />
          <Route path="/ImportModule" element={<ImportModule />}/>
          <Route path="/TernaryOperator" element={<TernaryOperator />}/>
          <Route path="/Props" element={<Props name="prashanti" />}/>
          <Route path="/HookUseState" element={<HookUseState />}/>
          <Route path="MuiCard" element={<MuiCard />} />
          <Route path="Task1" element={<Task1 />} />
          <Route path="Task2" element={<Task2 />} />
          <Route path="HookUseEffect" element={<HookUseEffect />} />
          <Route path="ApiAxios" element={<ApiAxios />} />

          
        </Routes>
      </BrowserRouter>
    </>
  );
}

