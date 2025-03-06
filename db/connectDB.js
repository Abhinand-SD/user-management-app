const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        const con = await mongoose.connect('mongodb://localhost:27017/UserAuth',{
            // useUnifiedTopology: true,
            // useNewUrlParser: true,
            // useCreateIndex: true
        });
        console.log(`MongoDB Connected : ${con.connection.host}`);
    }catch (error){
        console.log(error);
        process.exit(1);
    }
};
module.exports = connectDB