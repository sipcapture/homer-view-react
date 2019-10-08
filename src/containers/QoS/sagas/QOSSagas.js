import { takeEvery, put, call } from "redux-saga/effects";
import { getQOSAsync } from "../actions";
import fetchData from "../../../utils/api";

export function* getQOSDataSaga() {
  try {
    const response = yield call(fetchData, {
      url: "call/report/qos"
    });
    const qosdata = response.data.rtcp;

    if (qosdata.data.length) {
      yield put(getQOSAsync.success(qosdata));
    } else {
      yield put(getQOSAsync.fail());
    }
  } catch (err) {
    yield put(getQOSAsync.fail(err));
  }
}

export default function* handleGetDocumentSaga() {
  yield takeEvery(getQOSAsync.request.toString(), getQOSDataSaga);
}
