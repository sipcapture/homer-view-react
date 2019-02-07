import { put, takeLatest } from 'redux-saga/effects';
// import request from 'utils/request';
import mockedData from 'utils/mockData/qos';
import * as ActionTypes from './constants';

export function* getRepos() {
  // Select username from store

  try {
    // Call our request helper (see 'utils/request')
    // const repos = yield call(request, requestURL);
    yield put({ type: ActionTypes.GET_QOS_DATA_SUCCESS, data: mockedData });
  } catch (err) {
    yield put({ type: ActionTypes.GET_QOS_DATA_FAILED, error: err });
  }
}

export default function* getMessagesSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(ActionTypes.GET_QOS_DATA, getRepos);
}
