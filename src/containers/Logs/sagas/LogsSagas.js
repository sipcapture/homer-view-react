import { takeEvery, put, call } from "redux-saga/effects";
import { getLogsAsync } from "../actions";
import fetchData from "../../../utils/api";

export function* getLogsDataSaga() {
  try {
    const response = yield call(fetchData, {
      url: "/api/v3/call/report/log"
    });
    const logs = response.data;
    yield put(getLogsAsync.success(logs));
  } catch (err) {
    yield put(getLogsAsync.fail(err));
  }
}

export default function* handleGetDocumentSaga() {
  yield takeEvery(getLogsAsync.request.toString(), getLogsDataSaga);
}

