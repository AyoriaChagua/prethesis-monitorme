import mongoose from "mongoose";
import {MONGODB_URI} from "./config.js"

mongoose.connect(
    MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
.then(db => console.log(`Database is connected to ${db.connection.name}`))
.catch(error => console.log(error))