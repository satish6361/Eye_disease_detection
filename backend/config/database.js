const mongoose = require('mongoose')

const connectDB = ()=>{
    const db_url = `mongodb://127.0.0.1:27017/caps`
    mongoose.connect(db_url,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`MongoDB connected with server :${data.connection.host}`);
    })

}

module.exports = connectDB;

