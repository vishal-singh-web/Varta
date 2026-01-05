const express = require('express');
const userRouter = require('../routes/User')
const connectToMongo = require('./db')
const app = express();
 
(async () => {
    await connectToMongo();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/v1/auth',userRouter)

    app.use((error, req, res, next) => {
        res.status(500).json({
            success: false,
            message: error.message
        });
    });

    app.listen(3000,()=>{
        console.log("Listening at port 3000")
    })
})();