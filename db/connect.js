const  mongoose = require('mongoose');

const connectDb = async(url) =>{
    return mongoose.
    connect(url).
    then(() => console.log(`Connected to Database`)).
    catch((err) => console.log(err));   
}


module.exports = connectDb;