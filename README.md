# homer-view-react
Experimental React Viewer for HEP APIs


1. Clone this repo;
2. `cd homer-view-react`;
3. Run `npm install` to install dependencies;
4. Clone, configure and run https://github.com/adubovikov/hepic-export-proxy/commit/aa5b720f5e6d235aed3fca5f02df74d13494cc67;
5. Configure your proxy server (you can use NGINX, check `nginx.config.example`)
6. Run `npm run build` to build application;
7. If you wont to start dev-server run `npm run start` to run app at http://localhost:3000/;

##### WARNING
Current version doesn't work with API from Dev Server, but you can use mocked data. You must change brunch to `develop-mocked-data`.