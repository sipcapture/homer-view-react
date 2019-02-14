import { createActions } from "redux-actions";

const createAsyncAction = string => {
  return createActions({
    [string]: {
      request: payload => payload,
      success: payload => payload,
      fail: err => err
    }
  });
};

export default createAsyncAction;
