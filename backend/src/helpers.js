exports.resp = (res, code, message, data = {}) => {
    return res.status(code).json({
        success: (code >= 200 && code <= 299),
        message,
        data
    })
};