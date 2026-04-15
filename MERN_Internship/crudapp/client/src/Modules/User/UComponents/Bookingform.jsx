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

  const handleChange = (e) => {
    if (e.target.name === "quantity") {
      const quantity = e.target.value;
      setBooking({ ...booking, quantity, totalamount: (quantity * price)});
    } else {
      setBooking({ ...booking, [e.target.name]: e.target.value });
      console.log({ ...booking, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/product/getProductById/${productId}`)
      .then((res) => {
        console.log("product details", res.data.product.price);
        setPrice(res.data.product.price);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const utoken = localStorage.getItem("UserToken");

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:3000/booking/createbooking",
        { ...booking, productId },
        { headers: { "auth-token": utoken } },
      );
      alert("Booking successful!!");
    } catch (error) {
      console.log(error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #cbd4f9, #644d7a)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          width: "100%",
          p: 4,
          borderRadius: 4,
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
            mb: 1,
          }}
        >
          Complete your booking
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "rgba(255,255,255,0.7)",
            mb: 3,
          }}
        >
          Fill your details to confirm your booking
        </Typography>

        {/* Form */}
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Full Name"
            name="fname"
            fullWidth
            variant="filled"
            onChange={handleChange}
          />

          <TextField
            label="Email"
            name="email"
            fullWidth
            variant="filled"
            onChange={handleChange}
          />

          <TextField
            type="number"
            label="Phone"
            name="phone"
            fullWidth
            variant="filled"
            onChange={handleChange}
          />

          <TextField
            label="Address"
            name="address"
            multiline
            rows={3}
            fullWidth
            variant="filled"
            onChange={handleChange}
          />

          <TextField
            type="number"
            label="Quantity"
            name="quantity"
            fullWidth
            variant="filled"
            onChange={handleChange}
          />

          <TextField
            type="number"
            label="Price"
            name="price"
            fullWidth
            InputProps={{ readOnly: true }}
            variant="filled"
            onChange={handleChange}
            value={price}
          />

          <TextField
            type="number"
            label="Total Amount"
            name="totalamount"
            fullWidth
            InputProps={{ readOnly: true }}
            variant="filled"
            onChange={handleChange}
            value={booking.totalamount}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 2,
              background: "linear-gradient(90deg, #bcc6f4, #56416b)",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              },
            }}
          >
            Book Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
