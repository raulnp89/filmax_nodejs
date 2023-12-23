const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;

const userRouter = require("./Router/userRouter");
const movieRouter = require("./Router/movieRouter");

const app = express();
app.use(express.json());

require("dotenv").config();

const url_mongo = process.env.DATABASE_URL;
mongoose.connect(url_mongo);

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(`Error al conectar con mongo ${error}`);
});

db.on("connected", () => {
  console.log(`Succecss connect`);
});

db.on("disconected", () => {
  console.log(`Mongo is disconected`);
});

app.use("/Users", userRouter);
app.use("/Movies", movieRouter);

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
