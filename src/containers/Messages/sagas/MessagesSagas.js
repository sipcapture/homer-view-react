import { takeEvery, put, call } from "redux-saga/effects";
import { getMessagesAsync } from "../actions";
import mocketData from '../../../utils/mockData/transaction';

export function* getMessagesDataSaga() {

  try {
    yield put(getMessagesAsync.success(mocketData));
  } catch (err) {
    yield put(getMessagesAsync.fail(err));
  }
}

export default function* handleGetDocumentSaga() {
  yield takeEvery(getMessagesAsync.request.toString(), getMessagesDataSaga);
}

