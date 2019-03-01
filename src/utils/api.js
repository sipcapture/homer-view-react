import config from "../config";

import getAllUrlParams from "./urlParams";

import axios from "axios";

export default function fetchData(params) {
  const { url } = params;
  const { serverUrl } = config['DEV'];
  const { from, to, callid } = getAllUrlParams(window.location.href);

  const ids = typeof callid === "object" ? callid : [callid];

  const payload = {
    // "timestamp":{
    //   "from":1550707199000,
    //   "to":1550707799000
    // },
    timestamp: {
      from: from,
      to: to
    },
    param: {
      search: {
        "1_call": {
          id: 6145,
          callid: ids,
          uuid: []
        }
      },
      location: {},
      transaction: {
        call: true,
        registration: false,
        rest: false
      },
      id: {},
      timezone: {
        value: -120,
        name: "Local"
      }
    }
  };

  return axios.post(serverUrl + url, payload);
}
