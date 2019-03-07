import { createSelector } from "reselect";
import formatQOSResponse from "../../normalazers/formatQOSResponse";
import _ from "lodash";

const qos = store => {
  return store.get("qos");
};

export const makeSelectQOSTab = createSelector(
  qos,
  data => {
    const sortedData = _.orderBy(data.data, "create_date", "asc");
    return formatQOSResponse(sortedData);
  }
);

export const isQOSLoaded = createSelector(
  qos,
  data => data.loaded
);

export const isQOSError = createSelector(
  qos,
  data => data.error
);

export const getQOSData = createSelector(
  qos,
  data => data
);

export const getGraphsData = createSelector(
  qos,
  data => data.graphs
);
