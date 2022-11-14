const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Routes
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const showsRoute = require("./routes/shows");

dotenv.config();
const PORT = process.env.PORT || 3000;

// Database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successfull");
  })
  .catch((error) => {
    console.log(error);
  });

// Config
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/shows", showsRoute);

// Listening server
app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
