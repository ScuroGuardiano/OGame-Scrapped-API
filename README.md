# OGAME SRAPPED API
My another attempt ( [last attempt](https://github.com/ScuroGuardiano/ogame-client-js) ) to create OGame API, this time with puppeteer.  
My target is to write at least 90% coverage of OGame functionality with this API

## Currently done
* Logging into default server (last played server)
* Get resources
* Get resource buildings
* Get station buildings

## How to launch
```sh
    clone this repo
    npm install
    create .env file with variables OGAME_LOGIN and OGAME_PASSWORD
    npm run dev
```
## Feel free to contribute :D
You just need to create OGameFunction in src/game/functions and then add it to src/game/index.ts if you want :D
