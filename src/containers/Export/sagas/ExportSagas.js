import { takeEvery, put, call } from "redux-saga/effects";
import { getExportPcapAsync, getExportTxtAsync } from "../actions";
import fetchData from "../../../utils/api";

export function* getExportPcapDataSaga() {
  try {

    const response = yield call(fetchData, {
      url: "/api/v3/export/call/messages/pcap"
    });
    const pcap = response.data;
    yield put(getExportPcapAsync.success(pcap));
  } catch (err) {
    yield put(getExportPcapAsync.fail(err));
  }
}

export function* getExportTxtDataSaga() {
  try {
    const response = yield call(fetchData, {
      url: "/api/v3/export/call/messages/text"
    });
    const text = response.data;
    yield put(getExportTxtAsync.success(text));
  } catch (err) {
    yield put(getExportTxtAsync.fail(err));
  }
}

export default function* handleGetDocumentSaga() {
  yield takeEvery(getExportPcapAsync.request.toString(), getExportPcapDataSaga);
  yield takeEvery(getExportTxtAsync.request.toString(), getExportTxtDataSaga);
}

