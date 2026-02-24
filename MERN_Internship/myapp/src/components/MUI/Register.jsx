import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Register() {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    console.log({ ...formdata, [e.target.name]: e.target.value });
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const existingusers = JSON.parse(localStorage.getItem("userdetails")) || [];
    console.log(existingusers);
    const allusers = [...existingusers, formdata]
    localStorage.setItem("userdetails", JSON.stringify(allusers));
    alert('registered successfully!')
  };

  // const handleRegister = (e) => {
  //   localStorage.setItem("userdetails", JSON.stringify(allusers));
  // }

  return (
    <div>
      <Paper
        elevation={20}
        style={{ padding: 20, width: 500, margin: "20px auto" }}
      >
        <Typography variant="h5" component="h2">
          Register New Account
        </Typography>
        <TextField
          fullWidth
          label="Username"
          name="name"
          variant="outlined"
          margin="normal"
          type="text"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          email="email"
          variant="outlined"
          margin="normal"
          type="email"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          password="password"
          variant="outlined"
          margin="normal"
          type="password"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Phone"
          phone="phone"
          variant="outlined"
          margin="normal"
          type="tel"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Address"
          address="address"
          variant="outlined"
          margin="normal"
          type="text"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          style={{ marginTop: 20 }}
        >
          Register
        </Button>
      </Paper>
    </div>
  );
}
