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
  MenuItem
} from "@mui/material";
import axios from "axios";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const token = localStorage.getItem("AdminToken");

    const res = await axios.get(
      "http://localhost:3000/booking/allbookings",
      { headers: { "auth-token": token } }
    );

    setBookings(res.data.bookings);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    const token = localStorage.getItem("AdminToken");

    await axios.put(
      `http://localhost:3000/booking/updatebooking/${id}`,
      { status },
      { headers: { "auth-token": token } }
    );

    fetchBookings(); // refresh
  };

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

                <TableCell>
                  <Select
                    value={b.bookingstatus}
                    onChange={(e) =>
                      handleStatusChange(b._id, e.target.value)
                    }
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}