const express = require("express");
const connection = require("./connection");
const Product = require("./routers/product");
const User = require("./routers/user");
const Job = request("/routes/Job");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(express.json());

app.use(cors({
  origin: ['https://computer-xrfg.vercel.app', 'https://www.fondpeace.com', 'http://localhost:3000', "http://localhost:8081"]
}));

app.get("/",async(req,res)=> {
    res.json("Hello Deaedr");
});

app.use("/", Product)
app.use("/", User);
app.use("/", Job);

app.listen(4000,console.log("Hello Dear"));

