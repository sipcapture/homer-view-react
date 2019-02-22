import { createSelector } from 'reselect';
import formatMessagesResponse from '../../normalazers/formatMessagesResponse';

const logs = store => {
  return store.get("logs");
};

export const makeSelectLogsTab = createSelector(
  logs,
  log => log
);

export const isLogsLoaded = createSelector(
  logs,
  log => log.loaded
);

export const makeSelectLogs = createSelector(
  logs,
  log => log.data
);
