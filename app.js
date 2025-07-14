const express = require("express");
const app = express();
const port = 3000;
const web = require("./routes/web");
const connectDb = require("./database/connectDB");
// const session = require("express-session");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//image upload
// app.use(fileUpload({ useTempFiles: true }));
//tokan get cookie
app.use(cookieParser());

//connectDb
connectDb();

app.use(express.urlencoded({ extended: true }));

//data get
app.use(express.json());

//route load
app.use("/api", web);

//server create
app.listen(port, () => {
  console.log(`server start localhost ${port}`);
});