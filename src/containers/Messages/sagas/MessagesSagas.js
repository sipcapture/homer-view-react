import { takeEvery, put, call } from "redux-saga/effects";
import { getMessages, getMessagesSuccess, getMessagesFail } from "../actions";
import mocketData from '../../../utils/mockData/transaction';

export function* getMessagesData() {
  // Select username from store

  try {
    console.log('get')
    // Call our request helper (see 'utils/request')
    // const repos = yield call(request, requestURL);
    yield put({ type: 'GET_MESSAGES_SUCCESS', data: mocketData });
  } catch (err) {
    yield put({ type: 'GET_MESSAGES_FAIL', error: err });
  }
}

export default function* handleGetDocumentSaga() {
  yield takeEvery('GET_MESSAGES', getMessagesData);
}

