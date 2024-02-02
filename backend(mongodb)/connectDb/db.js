const mongoose=require('mongoose')

const dbUrl=process.env.Db_Url;

const ConnectDb = async()=>{
    try{
        // await mongoose.connect(dbUrl,{useNewUrlParser:true ,
        //     useUnifiedTopology : true});
        await mongoose.connect(dbUrl);
    }
    catch(err){
        console.log(`MongoDB Connection Error: ${err}`);
    }
    finally{
        console.log("Connected to MongoDB");
    }
}

module.exports=ConnectDb;