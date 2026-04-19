const express = require("express");
const route = express.Router();
const {
  Createbooking,
  GetAllBookings,
  UpdateBookingStatus,
  getCurrentUser
} = require("../Controller/bookingController");
const auth = require("../Middleware/Auth");

route.post("/createbooking", auth, Createbooking);
route.get("/allbookings", auth, GetAllBookings);
route.put("/updatebooking/:id", auth, UpdateBookingStatus);
route.get("/getcurrentuser", auth, getCurrentUser)

module.exports = route;
