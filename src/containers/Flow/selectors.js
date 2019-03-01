import { createSelector } from "reselect";
import formatMessagesResponse from "../../normalazers/formatMessagesResponse";

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

export const makeSelectFlow = createSelector(
  flow,
  msgs => msgs
);
