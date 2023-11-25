const express = require('express')
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json())

const userroute = require('./routes/userRoute')

app.use('/api',userroute);

module.exports=app;