import { fromJS } from 'immutable';
import tabsReducer from '../reducer';

describe('tabsReducer', () => {
  it('returns the initial state', () => {
    expect(tabsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
