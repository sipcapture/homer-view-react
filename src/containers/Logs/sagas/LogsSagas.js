import { takeEvery, put, call } from "redux-saga/effects";
import { getLogsAsync } from "../actions";

import axios from "axios"

function fetchLogs() {
  const payload = {
    "timestamp":{
      "from":1550707199000,
      "to":1550707799000
    },
    "param":{
      "search":{
        "1_call":{
          "id":6145,
          "callid":[
            "8afhjq@127.0.0.1"
          ],
          "uuid":[

          ]
        }
      },
      "location":{

      },
      "transaction":{
        "call":true,
        "registration":false,
        "rest":false
      },
      "id":{

      },
      "timezone":{
        "value":-120,
        "name":"Local"
      }
    }
  }

  return axios.post('/api/v3/call/report/log', payload);
}

export function* getLogsDataSaga() {
  try {
    const response = yield call(fetchLogs);
    const logs = response.data;
    yield put(getLogsAsync.success(logs));
  } catch (err) {
    yield put(getLogsAsync.fail(err));
  }
}

export default function* handleGetDocumentSaga() {
  yield takeEvery(getLogsAsync.request.toString(), getLogsDataSaga);
}

