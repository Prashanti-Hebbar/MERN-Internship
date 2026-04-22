import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TrackStatus() {
  const [bookings, setBookings] = useState([]);
  const utoken = localStorage.getItem("UserToken");
  const navigate = useNavigate();
  console.log("usertoken", utoken);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/booking/userbookings",
        {
          headers: { "auth-token": utoken },
        },
      );

      setBookings(res.data.bdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!utoken) {
      alert("Please login to view your bookings");
      navigate("/user/login");
    } else {
      fetchBookings();
    }
  }, [utoken, navigate]);

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Manage Bookings
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {bookings.map((b) => (
              <TableRow key={b._id}>
                <TableCell>{b.fullname}</TableCell>
                <TableCell>{b.productId?.name}</TableCell>
                <TableCell>{b.quantity}</TableCell>
                <TableCell>₹{b.totalamount}</TableCell>
                <TableCell>{b.bookingstatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
