const express = require('express');
const userRouter = require('../routes/User')
const messageRouter = require('../routes/message')
const connectToMongo = require('./db')
const path = require('path');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;
require('dotenv').config()
const cors = require('cors');
const { app,server } = require('../lib/socket');


const dev = process.env.NODE_ENV !== 'production';
cloudinary.config({
    secure: process.env.NODE_ENV === 'production', cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

(async () => {
    try {
        await connectToMongo();

        app.use(express.json({ limit: '10mb' }))
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());
        app.use(cors({
            origin: process.env.actionURL, credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
        }))

        app.use('/api/v1/auth', userRouter)
        app.use('/api/v1/msg', messageRouter)

        app.use((err, req, res, next) => {
            if (res.headersSent) {
                return next(err);
            }

            console.error("GLOBAL ERROR:", err);
            res.status(err.status || 500).json({
                message: err.message,
            });
        });
        const PORT = process.env.PORT
        app.use(express.static(path.join(__dirname, '../../frontend/dist')));

        app.use((req, res, next) => {
            res.sendFile(
                path.join(__dirname, '../../frontend/dist/index.html')
            );
        });
        server.listen(PORT || 3000, () => {
            console.log(`Listening at port ${PORT || 3000}`)
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
})();