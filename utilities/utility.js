const url = require('url');

function getFullHostUrl(req) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
    });
}


module.exports = {
    getFullHostUrl
}