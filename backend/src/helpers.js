const crypto = require('crypto');

exports.genSecret = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

exports.graceful = (app, server) => {
    console.log('[INFO] Shutting down server');
    server.close();
}

exports.resp = (res, code, message, data = {}) => {
    return res.status(code).json({
        success: (code >= 200 && code <= 299),
        message,
        data
    })
};
