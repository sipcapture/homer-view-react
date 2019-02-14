import { takeEvery, put, call } from "redux-saga/effects";
import { getMessagesAsync } from "../actions";
import mocketData from '../../../utils/mockData/transaction';

export function* getMessagesDataSaga() {
  // Select username from store

  try {
    console.log('get')
    // Call our request helper (see 'utils/request')
    // const repos = yield call(request, requestURL);
    yield put(getMessagesAsync.success(mocketData));
  } catch (err) {
    yield put(getMessagesAsync.fail(err));
  }
}

export default function* handleGetDocumentSaga() {
  yield takeEvery(getMessagesAsync.request.toString(), getMessagesDataSaga);
}

