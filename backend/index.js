//2
const express = require("express");
const bodyParser = require("body-parser"); //when we are using post requests, we take in the body
const cors = require("cors"); //pass from backend to frontend (connection)
require("dotenv").config();

const userRouter = require("./routes/routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
