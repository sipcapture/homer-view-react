<img src="https://avatars2.githubusercontent.com/u/27866033?s=200&v=4">

# HEPIC Export Proxy
HEPIC Export Proxy w/ Relay Authentication


## Instructions
This simple, primitive proxy implementation allows UNAUTHORIZED ACCESS to an HEPIC Export route.

**NO WARRANTIES! USE AT YOUR OWN RISK!**  <br>

### Setup
```
git clone https://github.com/hepictel/hepic-export-proxy
cd hepic-export-proxy
npm install
```

### Configuration
Edit the access details and URLs in `config.js`

### Execution
```
npm start
```

### Usage
Direct your client at the Proxy port using an `HEPIC EXPORT LINK`. Any other request will be rejected.
