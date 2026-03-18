import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import AHome from "../AComponents/AHome";
import Sidebar from "../AComponents/Sidebar";
import Manageuser from "../AComponents/Manageuser";
import AddCategory from "../AComponents/AddCategory";
import AdminLogin from "../AComponents/AdminLogin";
import ViewCategory from "../AComponents/ViewCategory";
import ManageProducts from "../AComponents/ManageProducts";
import AddProduct from "../AComponents/AddProduct";
import ViewProduct from "../AComponents/ViewProduct";
import ViewUser from "../AComponents/ViewUser";
import AdminLayout from "../AComponents/AdminLayout";
import UpdateCategory from "../AComponents/UpdateCategory";
import ManageCategories from "../AComponents/ManageCategories";
import UpdateUser from "../AComponents/UpdateUser";
import UpdateProduct from "../AComponents/UpdateProduct";


export default function AdminRoute() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: "260px" }}>
        <Routes>
          {" "}
          <Route index element={<AHome />} />{" "}
          <Route path="/dashboard" element={<AHome />} />
          <Route path="/users" element={<ViewUser />} />
          <Route path="/products" element={<ViewProduct />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/category/view" element={<ViewCategory />} />
          <Route path="/login" element={<AdminLogin />} />
          {/* <Route path="/ViewUser" element={<ViewUser />} /> */}
          <Route path="/AdminLayout" element={<AdminLayout />} />
          <Route path="/category/update/:id" element={<UpdateCategory />} />
          <Route path="/product/update/:id" element={<UpdateProduct />} />
          <Route path="/ManageCategories" element={<ManageCategories />} />
          <Route path="/user/update/:id" element={<UpdateUser />} />{" "}
        </Routes>
      </Box>
    </Box>
  );
}
