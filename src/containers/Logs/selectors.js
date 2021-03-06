import { createSelector } from "reselect";

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

export const isLogsError = createSelector(
  logs,
  log => log.error
);

export const makeSelectLogs = createSelector(
  logs,
  log => log.data
);
