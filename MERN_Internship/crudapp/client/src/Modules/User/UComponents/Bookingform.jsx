import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Bookingform() {
  const { productId } = useParams();

  const [booking, setBooking] = useState({
    fname: "",
    email: "",
    phone: "",
    address: "",
    quantity: "",
    totalamount: "",
  });

  const [price, setPrice] = useState(0);

  const utoken = localStorage.getItem("UserToken");

  // 🔥 handle input
  const handleChange = (e) => {
    if (e.target.name === "quantity") {
      const quantity = e.target.value;
      setBooking((prev) => ({
        ...prev,
        quantity,
        totalamount: quantity * price,
      }));
    } else {
      setBooking((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  // 🔥 fetch user (PREFILL)
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/user/getprofile",
        {
          headers: { "auth-token": utoken },
        }
      );

      const user = res.data.udata;

      setBooking((prev) => ({
        ...prev,
        fname: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      }));
    } catch (error) {
      console.log("User fetch failed", error);
    }
  };

  // 🔥 fetch product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/product/getProductById/${productId}`
      );

      setPrice(res.data.product.price);
    } catch (error) {
      console.log("Product fetch failed", error);
    }
  };

  // 🔥 RUN BOTH
  useEffect(() => {
    fetchUser();
    fetchProduct();
  }, []);

  // 🔥 submit
  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:3000/booking/createbooking",
        { ...booking, productId },
        { headers: { "auth-token": utoken } }
      );

      alert("Booking successful!!");
    } catch (error) {
      console.log(error);
      alert("Booking failed");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ maxWidth: 500, width: "100%", p: 4 }}>

        <Typography variant="h4" textAlign="center" mb={2}>
          Booking Form
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>

          <TextField
            label="Full Name"
            name="fname"
            value={booking.fname}
            InputProps={{ readOnly: true }}
          />

          <TextField
            label="Email"
            name="email"
            value={booking.email}
            InputProps={{ readOnly: true }}
          />

          <TextField
            label="Phone"
            name="phone"
            value={booking.phone}
            onChange={handleChange}
          />

          <TextField
            label="Address"
            name="address"
            value={booking.address}
            onChange={handleChange}
          />

          <TextField
            label="Quantity"
            name="quantity"
            onChange={handleChange}
          />

          <TextField
            label="Price"
            value={price}
            InputProps={{ readOnly: true }}
          />

          <TextField
            label="Total"
            value={booking.totalamount}
            InputProps={{ readOnly: true }}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Book Now
          </Button>

        </Box>
      </Box>
    </Box>
  );
}