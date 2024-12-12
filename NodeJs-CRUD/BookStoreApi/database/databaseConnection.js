import mongoose from "mongoose";

const dbConnection = async() => {
    try {
        const localConnectionString = `${process.env.MONGODB_CONNECTION_STRING}`;
        const mongoDBConn = mongoose.connect(localConnectionString);    
        
        if(mongoDBConn){
            return mongoDBConn;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

export { dbConnection };