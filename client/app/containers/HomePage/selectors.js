import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate,
  );
const makeGetListBook = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.listBook,
  );
const makeGetLoading = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.isLoading,
  );
const makeLoadingListBook = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.statusFlag,
  );

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeGetListBook,
  makeGetLoading,
  makeLoadingListBook,
};
