var config = {
	debug: true,
        apiUrl: 'http://homer7:9080',
        apiSess: 'http://homer7:9080/api/v3/auth',
        apiAuthJWT: true,
        apiUser: 'admin',
        apiPass: 'sipcapture',
        timeOut: 1800, // seconds
        proxyHost: '0.0.0.0',
        proxyPort: 8765
};

module.exports = config;
