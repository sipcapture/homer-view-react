import { createSelector } from "reselect";
import formatMessagesResponse from "../../normalazers/formatMessagesResponse";

const messages = store => {
  return store.get("messages");
};

export const makeSelectMessagesTab = createSelector(
  messages,
  msgs => formatMessagesResponse(msgs)
);

export const isMessagesLoaded = createSelector(
  messages,
  msgs => msgs.loaded
);

export const makeSelectMessages = createSelector(
  messages,
  msgs => msgs
);
