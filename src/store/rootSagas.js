import { all, spawn } from "redux-saga/effects";
import sagaChannel from "entities/sagaChannelsAndCommon";
import messagesSaga from "../containers/Messages/sagas";
import qosSaga from "../containers/QoS/sagas";
import flowSaga from "../containers/Flow/sagas";
import logsSaga from "../containers/Logs/sagas";
import exportSaga from "../containers/Export/sagas";

export default function* rootSaga() {
  yield all([spawn(messagesSaga)]);
  yield all([spawn(qosSaga)]);
  yield all([spawn(flowSaga)]);
  yield all([spawn(logsSaga)]);
  yield all([spawn(exportSaga)]);
  yield all([spawn(sagaChannel)]);
}
