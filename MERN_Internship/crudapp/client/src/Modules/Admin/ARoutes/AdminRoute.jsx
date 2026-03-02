import React from "react";
import { Route, Routes } from "react-router-dom";
import AHome from "../AComponents/AHome";
import Sidebar from "../AComponents/Sidebar";
import Manageuser from "../AComponents/Manageuser";
import AddCategory from "../AComponents/AddCategory" 
import AdminLogin from "../AComponents/AdminLogin";
import ViewCategory from "../AComponents/ViewCategory";

export default function AdminRoute() {
  return (
    <div>
      <Sidebar />
      <>
        <Routes>
          <Route path="/dashboard" element={<AHome />} />
          <Route path="/users" element={<Manageuser />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/category/view" element={<ViewCategory />} />
          <Route path="/login" element={<AdminLogin />} />
        </Routes>
      </>
    </div>
  );
}
