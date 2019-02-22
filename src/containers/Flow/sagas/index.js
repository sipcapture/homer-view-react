import { all, fork } from "redux-saga/effects";
import getFlowSaga from "./FlowSagas";

export default function* documentSaga() {
  yield all([fork(getFlowSaga)]);
}
