var config = {
        apiUrl: 'http://my.hepic.server/',
        apiSess: 'http://my.hepic.server/api/v2/auth',
        apiAuthJWT: true, //Activate for Homer7 setup
        apiUser: 'admin',
        apiPass: 'password',
        timeOut: 1800, // seconds
        proxyHost: '0.0.0.0',
        proxyPort: 8765
};

module.exports = config;
