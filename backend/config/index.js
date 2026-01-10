const express = require('express');
const userRouter = require('../routes/User')
const messageRouter = require('../routes/message')
const connectToMongo = require('./db')
const path = require('path');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;
require('dotenv').config()

const app = express();
const dev = process.env.NODE_ENV !== 'production';
cloudinary.config({
    secure: process.env.NODE_ENV === 'production', cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

(async () => {
    try {
        await connectToMongo();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());

        app.use('/api/v1/auth', userRouter)
        app.use('/api/v1/msg', messageRouter)

        app.use((error, req, res, next) => {
            res.status(500).json({
                success: false,
                message: error.message
            });
        });
        const PORT = process.env.PORT;
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, '../../frontend/dist')));

            app.use((req, res, next) => {
                res.sendFile(
                    path.join(__dirname, '../../frontend/dist/index.html')
                );
            });
        }
        app.listen(PORT || 3000, () => {
            console.log(`Listening at port ${PORT || 3000}`)
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
})();