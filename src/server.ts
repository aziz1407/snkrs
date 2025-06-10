import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';
// mongoose has broader features than mongodb itself
import server from './app';

mongoose.connect(process.env.MONGO_URL as string, {}) 
.then((data) => {
    // 1.TCP
    console.log('MongoDB connection been on-point!')
    const PORT = process.env.PORT ?? 3005;
    server.listen(PORT, function() {
        console.info(`Everything is alright with the ${PORT} port!`);
        console.info(`Admin project on http://localhost:${PORT}/admin \n`);
    })
})
.catch(err => console.log('ERROR has occured!', err));