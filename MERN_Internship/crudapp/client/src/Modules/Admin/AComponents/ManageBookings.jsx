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

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const fetchBookings = async () => {
    const token = localStorage.getItem("AdminToken");

    const res = await axios.get("http://localhost:3000/booking/allbookings", {
      headers: { "auth-token": token },
    });

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
      { headers: { "auth-token": token } },
    );

    fetchBookings(); // refresh
  };

  const confirmUpdate = async () => {
    const token = localStorage.getItem("AdminToken");

    await axios.put(
      `http://localhost:3000/booking/updatebooking/${selectedBooking}`,
      { status: newStatus },
      { headers: { "auth-token": token } },
    );

    setOpenDialog(false);
    fetchBookings();
  };

  const cancelUpdate = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
    setNewStatus("");
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
                <TableCell>{b.bookingstatus}</TableCell>

                <TableCell>
                  <Select
                    value={b.bookingstatus}
                    disabled={b.bookingstatus === "Completed"}
                    onChange={(e) => {
                      setSelectedBooking(b._id);
                      setNewStatus(e.target.value);
                      setOpenDialog(true);
                    }}
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
      <Dialog open={openDialog} onClose={cancelUpdate}>
        <DialogTitle>Confirm Status Change</DialogTitle>

        <DialogContent>
          Are you sure you want to change booking status to <b>{newStatus}</b>?
        </DialogContent>

        <DialogActions>
          <Button onClick={cancelUpdate} color="error">
            Cancel
          </Button>

          <Button onClick={confirmUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
