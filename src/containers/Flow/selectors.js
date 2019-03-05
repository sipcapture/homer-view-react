import { createSelector } from "reselect";
import formatMessagesResponse from "../../normalazers/formatMessagesResponse";
import formatData from "../../normalazers/formatFlowResponse";

const flow = store => {
  return store.get("flow");
};

export const makeSelectFlowTab = createSelector(
  flow,
  msgs => formatMessagesResponse(msgs)
);

export const isFlowLoaded = createSelector(
  flow,
  msgs => msgs.loaded
);

export const isFlowError = createSelector(
  flow,
  msgs => msgs.error
);

export const makeSelectFlow = createSelector(
  flow,
  msgs => {
    if (msgs.data && msgs.data.messages) {
      return formatData(msgs.data.messages);
    } else {
      return false;
    }
  }
);
