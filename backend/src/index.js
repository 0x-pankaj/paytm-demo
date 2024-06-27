
require("dotenv").config();
const express = require("express");
const connectDB  = require("./db");
const rootRouter = require("./routes/index");
const app = express();
const cors = require("cors");



const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

console.log(PORT);
console.log(DB_URL);


app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1", rootRouter);


//database connection
connectDB(DB_URL);

app.get("/" , (req,res) => {
    res.send("OK")
})


//listening server
app.listen(PORT, ()=> {
    console.log(`server is listening on PORT: ${PORT} `)
});