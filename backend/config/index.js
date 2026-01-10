const express = require('express');
const userRouter = require('../routes/User')
const messageRouter = require('../routes/message')
const connectToMongo = require('./db')
const next = require('next');
const path = require('path');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;

const app = express();
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: path.join(__dirname,"../../frontend/")});
const handle = nextApp.getRequestHandler();
cloudinary.config({
  secure: process.env.NODE_ENV=='production'?true:false,
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});

(async () => {
    try {
        await connectToMongo();
        await nextApp.prepare();
        console.log("Next.js prepared");

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());

        app.use('/api/v1/auth', userRouter)
        app.use('/api/v1/msg', messageRouter)
        app.use((req, res) => {
            return handle(req, res);
        });

        app.use((error, req, res, next) => {
            res.status(500).json({
                success: false,
                message: error.message
            });
        });
        const PORT = process.env.PORT;
        app.listen(PORT || 3000, () => {
            console.log(`Listening at port ${PORT || 3000}`)
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
})();