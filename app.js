const express = require("express");
const fileUpload = require("express-fileupload");
require('dotenv').config();
const connectDb = require('./db/connect.js');
const uploadRoute = require('./routes/uploadRoute.js');
const findPolicy = require('./routes/findPolicyRoute.js');
const aggregateRoute = require('./routes/aggregateRoute.js');
const checkCPU = require('./cpu.js');
const scheduleMsgRoute = require('./routes/scheduleMsgRoute.js')
require('./workers/msgScheduler.js')
const PORT = 3000;


const app = express();
app.use(express.json());
app.use(fileUpload());



app.use('/api', uploadRoute)
app.use('/api/policies',findPolicy);
app.use('/api/policies',aggregateRoute);
app.use('/api/messages',scheduleMsgRoute)
const start = async() =>{
    try {
        await connectDb(process.env.MONGO_URI)
        
        app.listen(PORT, () => {
          console.log(`Sever started at port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start()

checkCPU(70)