const responseHandler = (obj, req, res, next) => {
    return res.status(obj.status || 500).send({
        success: obj.success || false,
        status: obj.status || 500,
        message: obj.message || 'Something went wrong',
        stack: obj.stack,
        data: obj.data
    })
}

module.exports = responseHandler