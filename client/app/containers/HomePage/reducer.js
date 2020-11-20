/* eslint-disable no-case-declarations */
/* eslint-disable no-underscore-dangle */
/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  isLoading: false,
  listBook: [],
  getBook: {},
  params: {
    limit: types.LIMIT,
    offset: 0,
  },
  statusFlag: {
    isLoadingListBook: false,
    isActionOnOff: false,
  },
  log: {
    success: '',
    error: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.DEFAULT_ACTION:
        break;
      case types.GET_LIST_BOOK:
        draft.isLoading = true;
        break;
      case types.GET_LIST_BOOK_SUCCESS:
        draft.listBook = action.data;
        draft.isLoading = false;
        break;
      case types.GET_LIST_BOOK_FAILURE:
        draft.listBook = action.message;
        draft.isLoading = false;
        break;
      case types.SET_PUBLISH:
        draft.statusFlag.isLoadingListBook = true;
        break;
      case types.SET_PUBLISH_SUCCESS:
        draft.statusFlag.isLoadingListBook = false;
        draft.log.success = 'Change success';
        break;
      case types.SET_PUBLISH_FAILURE:
        draft.log.error = action.message;
        draft.statusFlag.isLoadingListBook = false;
        break;
      case types.SET_PUBLISH_MUILTI:
        draft.statusFlag.isActionOnOff = true;
        break;
      case types.SET_PUBLISH_MUILTI_SUCCESS:
        draft.log.success = 'Change success';
        draft.statusFlag.isActionOnOff = false;
        break;
      case types.SET_PUBLISH_MUILTI_FAILURE:
        draft.log.error = action.message;
        draft.statusFlag.isActionOnOff = false;
        break;
    }
  });

export default homePageReducer;
