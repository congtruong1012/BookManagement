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
const makeGetParams = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.params,
  );
const makeGetListBook = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.listBook,
  );
const makeGetBook = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.getBook,
  );
const makeTotalBook = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.totalBook,
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
  makeGetParams,
  makeGetListBook,
  makeGetBook,
  makeTotalBook,
  makeGetLoading,
  makeLoadingListBook,
};
