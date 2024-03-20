const apiKeyMiddleware = (req,res,next) => {
    const apiKey = req.headers['api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({
            message : "Invalid API KEY"
        });
        
    }

    next();
}