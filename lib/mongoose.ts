import mongoose from 'mongoose';
let isConnected: boolean = false;

export async function connectToDatabase (){
    mongoose.set('strictQuery', true);
    if(!process.env.MONGOOSE_URL){
        return console.log("MISSING MONGO_DB URI")
    }
    if (isConnected) {
        return console.log("MONGO_DB ALREADY CONNECTED");
    }
    try {
        await mongoose.connect(process.env.MONGOOSE_URL, {
            dbName: 'devflow'
        })
        isConnected = true;
        console.log("MONGO_DB CONNECTED.");

        require('@/database/question.model')
        require('@/database/tag.model')
        require('@/database/user.model')
    } catch (error) {
        console.log('------------------------------------')
        console.log("FAILE___TO___CONNECT___TO___DATABASE")
        console.log('------------------------------------')
        throw error;
    }
}