import { take } from "redux-saga/effects";

function* sagaChannel() {
  try {
    while (true) {
      yield take();
    }
  } catch (e) {
    console.log(e);
  }
}

export default sagaChannel;
