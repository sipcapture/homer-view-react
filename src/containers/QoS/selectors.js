import { createSelector } from 'reselect';
import formatQOSResponse from '../../normalazers/formatQOSResponse';
import _ from 'lodash';

const qos = store => {
  return store.get("qos");
};

export const makeSelectQOSTab = createSelector(
  qos,
  data => {
    const qoS = _.cloneDeep(data.data);
    const sortedData = _.orderBy(data.data, 'create_date', 'asc');
    return formatQOSResponse(sortedData)
  }
);

export const isQOSLoaded = createSelector(
  qos,
  data => data.loaded
);

export const getQOSData = createSelector(
  qos,
  data => data
);
