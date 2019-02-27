import { all, fork } from "redux-saga/effects";
import getLogsSaga from "./LogsSagas";

export default function* documentSaga() {
  yield all([fork(getLogsSaga)]);
}
