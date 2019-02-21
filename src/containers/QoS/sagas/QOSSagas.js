import { takeEvery, put, call } from "redux-saga/effects";
import { getQOSAsync } from "../actions";
import mocketData from '../../../utils/mockData/qos';
import axios from "axios";

function fetchQOS() {
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

  return axios.post('/api/v3/call/report/qos', payload);
}

export function* getQOSDataSaga() {
  try {
    const response = yield call(fetchQOS);
    const QoS = response.data;
    yield put(getQOSAsync.success(QoS));
  } catch (err) {
    yield put(getQOSAsync.fail(err));
  }
}

export default function* handleGetDocumentSaga() {
  yield takeEvery(getQOSAsync.request.toString(), getQOSDataSaga);
}

