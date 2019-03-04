import config from "../config";

import getAllUrlParams from "./urlParams";

import axios from "axios";

export default function fetchData(params) {
  const { url } = params;
  const { serverUrl } = config['DEV'];
  const { from, to, callid } = getAllUrlParams();

  const ids = callid.split(',');

  const payload = {
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
