import { take, put } from "redux-saga/effects";

const actionRequest = "request";

const actionSuccess = "success";

const actionFail = "fail";

function* sagaChannel() {
  try {
    while (true) {
      const action = yield take();

      // const withUsers =
      //   action.hasOwnProperty("payload") &&
      //   !!action.payload &&
      //   action.payload.hasOwnProperty("Users");

      // if (action.type.includes(actionRequest)) {
      //   yield put(setPartScreenPreloader());

      //   if (withUsers) {
      //     yield put(addToUsersCommonUsers(action.payload.Users));
      //   }
      //   yield put(waitAction.start(SWITCH_OFF_LOADERS_TIME));
      // }
    }
  } catch (e) {
    console.log(e);
  }
}

export default sagaChannel;
