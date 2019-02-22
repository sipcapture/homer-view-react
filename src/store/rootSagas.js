import { all, spawn } from "redux-saga/effects";
import sagaChannel from "entities/sagaChannelsAndCommon";
import messagesSaga from "../containers/Messages/sagas"
import qosSaga from "../containers/QoS/sagas"
export default function* rootSaga() {
  yield all([spawn(messagesSaga)]);
  yield all([spawn(qosSaga)]);
  yield all([spawn(sagaChannel)]);
}
