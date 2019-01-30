import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the messagesTab state domain
 */

const selectMessagesTabDomain = state => state.get('messagesTab', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MessagesTab
 */

const makeSelectMessagesTab = () =>
  createSelector(selectMessagesTabDomain, substate => substate.toJS());

export default makeSelectMessagesTab;
export { selectMessagesTabDomain };
