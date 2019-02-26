import { all, fork } from "redux-saga/effects";
import getExportSaga from "./ExportSagas";

export default function* documentSaga() {
  yield all([fork(getExportSaga)]);
}
