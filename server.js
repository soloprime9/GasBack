const express = require("express");
const connection = require("./connection");
const Product = require("./routers/product");
const User = require("./routers/user");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"]
}))

app.get("/",async(req,res)=> {
    res.json("Hello Deaedr");
});

app.use("/", Product)
app.use("/", User);

app.listen(4000,console.log("Hello Dear"));