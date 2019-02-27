import { all, fork } from "redux-saga/effects";
import getQOSSaga from "./QOSSagas";

export default function* documentSaga() {
  yield all([fork(getQOSSaga)]);
}
