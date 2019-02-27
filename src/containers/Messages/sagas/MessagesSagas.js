import { takeEvery, put, call } from "redux-saga/effects";
import { getMessagesAsync } from "../actions";
import fetchData from "../../../utils/api";

export function* getMessagesDataSaga() {
  try {
    const response = yield call(fetchData, {
      url: "/api/v3/call/transaction"
    });
    const message = response.data;
    yield put(getMessagesAsync.success(message));
  } catch (err) {
    yield put(getMessagesAsync.fail(err));
  }
}

export default function* handleGetDocumentSaga() {
  yield takeEvery(getMessagesAsync.request.toString(), getMessagesDataSaga);
}

