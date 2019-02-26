import { takeEvery, put, call } from "redux-saga/effects";
import { getExportPcapAsync, getExportTxtAsync } from "../actions";

import axios from "axios"

function fetchExportPcap(type) {
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

  return axios.post('/api/v3/export/call/messages/pcap', payload);
}

function fetchExportTxt(type) {
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

  return axios.post('/api/v3/export/call/messages/text', payload);
}

export function* getExportPcapDataSaga() {
  try {
    const response = yield call(fetchExportPcap);
    const pcap = response.data;
    yield put(getExportPcapAsync.success(pcap));
  } catch (err) {
    yield put(getExportPcapAsync.fail(err));
  }
}

export function* getExportTxtDataSaga() {
  try {
    const response = yield call(fetchExportTxt);
    const text = response.data;
    yield put(getExportTxtAsync.success(text));
  } catch (err) {
    yield put(getExportTxtAsync.fail(err));
  }
}

export default function* handleGetDocumentSaga() {
  yield takeEvery(getExportPcapAsync.request.toString(), getExportPcapDataSaga);
  yield takeEvery(getExportTxtAsync.request.toString(), getExportTxtDataSaga);
}

