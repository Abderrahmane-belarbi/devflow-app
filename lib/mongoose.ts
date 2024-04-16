import mongoose from 'mongoose';
let isConnected: boolean = false;

export async function connectToDatabase (){
    mongoose.set('strictQuery', true);
    if(!process.env.MONGOOSE_URL){
        return console.log("Missing mongoose url")
    }
    if (isConnected) {
        return console.log("MongoDB is already connected");
    }
    try {
        await mongoose.connect(process.env.MONGOOSE_URL, {
            dbName: 'devflow'
        })
        isConnected = true;
        console.log("MongoDB connected.");
    } catch (error) {
        console.log("FAILE___TO___CONNECT___TO___DATABASE", error)
    }
}