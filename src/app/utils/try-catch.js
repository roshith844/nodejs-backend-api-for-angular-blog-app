exports.tryCatch = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next); // Ensure to pass next for error handling
    } catch (error) {
        // Log the error details (you can use a logging library here)
        console.error('Error occurred in controller:', error);

        // Customize error response
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Access token has expired.' });
        }

        // Pass the error to the next middleware or error handler
        return next(error);
    }
}
