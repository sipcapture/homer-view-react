import { all, fork } from "redux-saga/effects";
import getMessagesSaga from "./MessagesSagas";

export default function* documentSaga() {
  yield all([fork(getMessagesSaga)]);
}
