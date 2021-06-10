const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server at http://localhost:${PORT}/ `));


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

mongoose.connect(
    process.env.MDB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) return console.error(err);
      console.log("Connected to MongoDB");
    }
  );

  const userRoutes = require("./routes/userRoutes");
  const todoRoutes = require("./routes/todoRoutes");

  app.use("/auth", userRoutes);
  app.use("/todo", todoRoutes);