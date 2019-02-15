import { takeEvery, put, call } from "redux-saga/effects";
import { getQOSAsync } from "../actions";
import mocketData from '../../../utils/mockData/qos';

export function* getQOSDataSaga() {
  try {
    yield put(getQOSAsync.success(mocketData));
  } catch (err) {
    yield put(getQOSAsync.fail(err));
  }
}

export default function* handleGetDocumentSaga() {
  yield takeEvery(getQOSAsync.request.toString(), getQOSDataSaga);
}

