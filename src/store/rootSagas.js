import { all, spawn } from "redux-saga/effects";
import sagaChannel from "entities/sagaChannelsAndCommon";
import messagesSaga from "../containers/Messages/sagas"
export default function* rootSaga() {
  yield all([spawn(messagesSaga)]);
  yield all([spawn(sagaChannel)]);
}
