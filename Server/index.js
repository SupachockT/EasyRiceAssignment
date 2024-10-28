const express = require("express");
const { getRouter } = require("./routes/get")
const { postRouter } = require("./routes/post")
const { delRouter } = require("./routes/del")
const { editRouter } = require("./routes/edit")

const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // Allow credentials (like cookies)
}));

app.use(express.json());
app.use("/get", getRouter);
app.use("/post", postRouter);
app.use("/del", delRouter);
app.use("/edit", editRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});