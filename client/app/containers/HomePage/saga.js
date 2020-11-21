/* eslint-disable no-plusplus */
import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  getListBookFailure,
  getListBookSuccess,
  getTotalBookFailure,
  getTotalBookSuccess,
  setPublishFailure,
  setPublishSuccess,
} from './actions';
import {
  GET_LIST,
  GET_LIST_BOOK,
  GET_TOTAL_BOOK,
  SET_PUBLISH,
  SET_PUBLISH_MUILTI,
} from './constants';
import { makeGetParams } from './selectors';

// Individual exports for testing
const URL = 'http://localhost:4000';
export function* countListBookApi() {
  try {
    const response = yield call(axios.get, `${URL}/book/count`);
    console.log(response.data);
    if (response.status === 200) {
      yield put(getTotalBookSuccess(response.data));
    }
  } catch (error) {
    yield put(getTotalBookFailure(error.message));
  }
}
export function* getListBookApi({ actionType }) {
  try {
    const { offset, limit } = yield select(makeGetParams());
    if (actionType === GET_LIST) {
      const response = yield call(
        axios.get,
        `${URL}/book?skip=${0}&&limit=${limit}`,
      );
      if (response.status === 200) {
        yield put(getListBookSuccess(response.data, actionType));
      }
    } else {
      const response = yield call(
        axios.get,
        `${URL}/book?skip=${offset}&&limit=${limit}`,
      );
      if (response.status === 200) {
        yield put(getListBookSuccess(response.data, actionType));
      }
    }
  } catch (err) {
    if (err.message) yield put(getListBookFailure(err.message, actionType));
    else yield put(getListBookFailure('', actionType));
  }
}

export function* setPublish({ id }) {
  try {
    const response = yield call(axios.patch, `${URL}/book/${id}`);
    if (response.status === 200) {
      yield put(setPublishSuccess());
    }
  } catch (err) {
    if (err.message) yield put(setPublishFailure(err.message));
    else yield put(setPublishFailure(''));
  }
}
export function* setPublishMuilti({ bool, arr }) {
  try {
    for (let i = 0; i < arr.length; i++) {
      const apiResponse = yield call(
        axios.patch,
        `${URL}/book/status/${arr[i]}`,
        { bool },
      );
      if (apiResponse.status === 200) {
        yield put(setPublishSuccess());
      }
    }
  } catch (err) {
    if (err.message) yield put(setPublishFailure(err.message));
  }
}

export default function* homePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_LIST_BOOK, getListBookApi);
  yield takeLatest(SET_PUBLISH, setPublish);
  yield takeLatest(SET_PUBLISH_MUILTI, setPublishMuilti);
  yield takeLatest(GET_TOTAL_BOOK, countListBookApi);
}
