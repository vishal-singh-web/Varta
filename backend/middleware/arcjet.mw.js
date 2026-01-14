const { isSpoofedBot } = require("@arcjet/inspect");
const aj = require("../lib/arcjet");

async function arcjetProtection(req, res, next) {
    try {
        const decision = await aj.protect(req); 
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ success: false, message: "Rate limit exceeded. Please try again later." })
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ success: false, message: "Bot access denied" })
            } else {
                return res.status(403).json({ success: false, message: "access denied by security policy." })
            }
        }
        if (decision.results.some(isSpoofedBot)){
            return res.status(403).json({ success: false, message: "Malicious spoof bot activity detected." })
        }
        return next()
    } catch (error) {
        console.log({ success: false, message: "Arcjet Protection Error." })
        return next()
    }
}

module.exports = arcjetProtection;