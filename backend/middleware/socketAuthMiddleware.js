const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

async function socketAuthMiddleware(socket, next) {
    try {
        const token = socket.handshake.headers.cookie
            ?.split("; ").find((row) => row.startsWith('jwt='))?.split('=')[1];
        if (!token) {
            console.log("Socket connection: No token found");
            return next(new Error("Unauthorized - No token provided"));
        }
        const Verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!Verified) {
            return next(new Error("Unauthorized - token invalid"));
        }
        const user = await Users.findById(Verified.userId).select("-password");
        if (!user) {
            return next(new Error("Unauthorized - User not found"));
        }

        socket.user = user;
        socket.userId = user._id.toString();
        console.log(`Socket authenticated for ${user.username} id:${user._id}`)
        next();
    } catch (error) {
        console.log("Socket connection Error: ",error.message);
        next(new Error("Unauthorized - No token provided"));
    }
}

module.exports = socketAuthMiddleware;
