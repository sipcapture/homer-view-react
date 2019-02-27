import { takeEvery, put, call } from "redux-saga/effects";
import { getFlowAsync } from "../actions";
import fetchData from "../../../utils/api";

export function* getFlowDataSaga() {
  try {
    const response = yield call(fetchData, {
      url: "/api/v3/call/transaction"
    });
    const flow = response.data;
    yield put(getFlowAsync.success(flow));
  } catch (err) {
    yield put(getFlowAsync.fail(err));
  }
}

export default function* handleGetDocumentSaga() {
  yield takeEvery(getFlowAsync.request.toString(), getFlowDataSaga);
}

