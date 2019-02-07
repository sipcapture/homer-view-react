import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the qoS state domain
 */

const selectQoSDomain = state => state.get('qoS', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by QoS
 */

const makeSelectQoS = () =>
  createSelector(selectQoSDomain, substate => substate.toJS());

export default makeSelectQoS;
export { selectQoSDomain };
