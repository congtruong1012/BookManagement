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
  totalBook: 0,
  getBook: {},
  params: {
    limit: types.LIMIT,
    offset: 0,
  },
  statusFlag: {
    isLoadingListBook: false,
    isActionOnOff: false,
    isLoadMore: false,
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
        if (action.actionType === types.GET_LIST) {
          draft.isLoading = true;
        } else {
          draft.params.offset = state.params.offset + draft.params.limit;
          draft.statusFlag.isLoadMore = true;
        }
        break;
      case types.GET_LIST_BOOK_SUCCESS:
        if (action.actionType === types.GET_LIST) {
          draft.listBook = action.data;
          draft.totalBook = action.totalBook;
          draft.isLoading = false;
        } else {
          draft.params.offset = state.params.offset;
          draft.listBook.push(...action.data);
          draft.statusFlag.isLoadMore = false;
        }
        break;
      case types.GET_LIST_BOOK_FAILURE:
        if (action.actionType === types.GET_LIST) {
          draft.log.error = action.message;
          draft.isLoading = false;
        } else {
          draft.params.offset = state.params.offset - draft.params.limit;
          draft.log.error = action.message;
          draft.statusFlag.isLoadMore = false;
        }
        break;
      case types.GET_TOTAL_BOOK:
        break;
      case types.GET_TOTAL_BOOK_SUCCESS:
        draft.totalBook = action.data;
        break;
      case types.GET_TOTAL_BOOK_FAILURE:
        draft.log.error = action.message;
        break;
      case types.SET_PUBLISH:
        draft.statusFlag.isLoadingListBook = true;
        break;
      case types.SET_PUBLISH_SUCCESS:
        draft.statusFlag.isLoadingListBook = false;
        draft.log.success = 'Change success';
        const index = draft.listBook.findIndex(item => item._id === action.id);
        if (index >= 0) {
          draft.listBook[index].published = !draft.listBook[index].published;
        }
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
        action.arr.forEach(id => {
          const indexM = draft.listBook.findIndex(item => item._id === id);
          if (indexM >= 0) {
            draft.listBook[indexM].published = action.bool;
          }
        });
        break;
      case types.SET_PUBLISH_MUILTI_FAILURE:
        draft.log.error = action.message;
        draft.statusFlag.isActionOnOff = false;
        break;
      case types.CREATE_BOOK:
        draft.isLoading = true;
        break;
      case types.CREATE_BOOK_SUCCESS:
        draft.listBook.push(action.data);
        draft.isLoading = false;
        break;
      case types.CREATE_BOOK_FAILURE:
        draft.log.error = action.message;
        draft.isLoading = false;
        break;
      case types.DELETE_BOOK:
        draft.isLoading = true;
        break;
      case types.DELETE_BOOK_SUCCESS:
        const indexD = draft.listBook.findIndex(item => item._id === action.id);
        if (indexD >= 0) {
          draft.listBook.splice(indexD, 1);
        }
        draft.isLoading = false;
        break;
      case types.DELETE_BOOK_FAILURE:
        draft.log.error = action.message;
        draft.isLoading = false;
        break;
      case types.DELETE_MUILTI_BOOK:
        draft.isLoading = true;
        break;
      case types.DELETE_MUILTI_BOOK_SUCCESS:
        action.arr.forEach(id => {
          const indexDM = draft.listBook.findIndex(item => item._id === id);
          if (indexDM >= 0) {
            draft.listBook.splice(indexDM, 1);
          }
        });
        draft.isLoading = false;
        break;
      case types.DELETE_MUILTI_BOOK_FAILURE:
        draft.log.error = action.message;
        draft.isLoading = false;
        break;
      case types.UPDATE_BOOK:
        draft.isLoading = true;
        break;
      case types.UPDATE_BOOK_SUCCESS:
        const indexU = draft.listBook.findIndex(item => item._id === action.id);
        if (indexU >= 0) {
          draft.listBook[indexU] = action.data;
        }
        draft.isLoading = false;
        break;
      case types.UPDATE_BOOK_FAILURE:
        draft.isLoading = false;
        draft.log.error = action.message;
        break;
    }
  });

export default homePageReducer;
