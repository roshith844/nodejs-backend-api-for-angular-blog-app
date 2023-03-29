const errorHandler = (error, req, res, next) => {
    console.log(error)
    return res.status(500).send("something Went Wrong")
};

module.exports = errorHandler