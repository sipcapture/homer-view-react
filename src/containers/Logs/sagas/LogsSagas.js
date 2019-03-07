import { takeEvery, put, call } from "redux-saga/effects";
import { getLogsAsync } from "../actions";
import fetchData from "../../../utils/api";

export function* getLogsDataSaga() {
  try {
    const response = yield call(fetchData, {
      url: "call/report/log"
    });
    const logs = response.data;
    if (response.data.total) {
      yield put(getLogsAsync.success(logs));
    } else {
      yield put(getLogsAsync.fail());
    }
  } catch (err) {
    yield put(getLogsAsync.fail(err));
  }
}

export default function* handleGetDocumentSaga() {
  yield takeEvery(getLogsAsync.request.toString(), getLogsDataSaga);
}
