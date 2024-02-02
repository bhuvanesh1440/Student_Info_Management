const express=require('express')
var app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const cors=require('cors')
app.use(cors())

require('dotenv').config();

//importing the model and database connection from userModel file
const ConnectDb=require('./connectDb/db')


//routes
const Marks=require('./Routes/marks.router')
const Student=require('./Routes/student.router')

app.use('/marks',Marks)
app.use('/student',Student)


const port=process.env.PORT||3000;
app.listen(port,(req,res)=>{
    console.log(`Server is running on http://localhost:${port}`);
    ConnectDb();
})

