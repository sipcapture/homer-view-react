const ENV = "DEV";
const DEBUGGING = true;

const configs = {
  DEV: {
    env: "DEV",
    debugging: DEBUGGING,
    serverUrl: "http://localhost:8080/api/v3/"
  },
  UI: {
    availableTabs: ["messages", "flow", "qos", "logs", "export"]
  }
};

export default configs;
