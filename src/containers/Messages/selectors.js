import { createSelector } from 'reselect';

const messages = store => {
  console.log(store);
  return store.get("messages");
}

export const makeSelectMessagesTab = createSelector(
  messages,
  n => n
);
