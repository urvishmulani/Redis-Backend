import mongoose from 'mongoose';
import {dbPwd,dbUser,port} from '../configs/config.js'

const Connection = async () => {
    
    const URL = `mongodb://localhost:27017/Ecommerce`
    //const URL = `mongodb://${username}:${password}@crud-app-shard-00-00.fyf2n.mongodb.net:27017,crud-app-shard-00-01.fyf2n.mongodb.net:27017,crud-app-shard-00-02.fyf2n.mongodb.net:27017/CRUD-APPLICATION?ssl=true&replicaSet=atlas-rz0rvg-shard-0&authSource=admin&retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }
}

export default Connection;