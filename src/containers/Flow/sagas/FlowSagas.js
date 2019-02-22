import { takeEvery, put, call } from "redux-saga/effects";
import { getFlowAsync } from "../actions";
import mocketData from '../../../utils/mockData/transaction';

import axios from "axios"

function fetchMessages() {
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

  return axios.post('/api/v3/call/transaction', payload);
}

export function* getFlowDataSaga() {

  try {
    // const response = yield call(fetchMessages);
    // const message = response.data;
    yield put(getFlowAsync.success(mocketData));
  } catch (err) {
    yield put(getFlowAsync.fail(err));
  }
}

export default function* handleGetDocumentSaga() {
  yield takeEvery(getFlowAsync.request.toString(), getFlowDataSaga);
}

