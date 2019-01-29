import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tabs state domain
 */

const selectTabsDomain = state => state.get('tabs', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Tabs
 */

const makeSelectTabs = () =>
  createSelector(selectTabsDomain, substate => substate.toJS());

export default makeSelectTabs;
export { selectTabsDomain };
