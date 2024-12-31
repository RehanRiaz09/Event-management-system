const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyparser = require('body-parser');
const mongoose = require('mongoose');


const userRoutes = require("./routes/users")
const eventRoutes = require("./routes/events")
const attendeeRoutes = require("./routes/attendees")
const ticketRoutes = require("./routes/tickets")
const categoeyRoutes = require("./routes/categories")
const reviewRoutes = require("./routes/reviews")
const paymentRoutes = require("./routes/payments")
mongoose.connect("mongodb://127.0.0.1:27017/Eventdb");
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use("/user", userRoutes)
app.use("/event", eventRoutes)
app.use("/attendee", attendeeRoutes)
app.use("/ticket", ticketRoutes)
app.use("/category", categoeyRoutes)
app.use("/review", reviewRoutes)
app.use("/payment", paymentRoutes)
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;