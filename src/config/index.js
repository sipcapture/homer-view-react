const ENV = "DEV";
const DEBUGGING = true;

const configs = {
  DEV: {
    env: "DEV",
    debugging: DEBUGGING,
    serverUrl: "127.0.0.1",
    endpoint(suffix) {
      return `/api/v1${suffix}`;
    }
  }
};

export default configs[ENV];
