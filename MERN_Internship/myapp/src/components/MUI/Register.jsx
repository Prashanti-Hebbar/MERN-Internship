import React from "react";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Register() {
  return (
    <div>
      <Paper elevation={20} style={{ padding: 20, width: 500, margin: "20px auto" }}>
      <Typography variant="h5" component="h2">
        Register New Account
      </Typography>
      <TextField fullWidth label="Username" variant="outlined" margin="normal" type="text" />
      <TextField fullWidth label="Email" variant="outlined" margin="normal" type="email" />
      <TextField fullWidth label="Password" variant="outlined" margin="normal" type="password" />
      <TextField fullWidth label="Phone" variant="outlined" margin="normal" type="tel" />
      <TextField fullWidth label="Address" variant="outlined" margin="normal" type="text" />
      <Button variant="contained" color="primary" fullWidth style={{ marginTop: 20 }} onClick={() => alert("Registered successfully!")}>
        Register
      </Button>
      </Paper>
    </div>
  );
}