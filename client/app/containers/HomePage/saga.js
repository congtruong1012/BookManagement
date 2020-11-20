/* eslint-disable no-plusplus */
import axios from 'axios';
import { delay, take } from 'lodash';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getListBookFailure,
  getListBookSuccess,
  setPublishFailure,
  setPublishSuccess,
} from './actions';
import { GET_LIST_BOOK, SET_PUBLISH, SET_PUBLISH_MUILTI } from './constants';

// Individual exports for testing
const URL = 'http://localhost:4000';
export function* getListBookApi() {
  try {
    const response = yield call(axios.get, `${URL}/book`);
    if (response.status === 200) {
      yield put(getListBookSuccess(response.data));
    }
  } catch (err) {
    if (err.message) yield put(getListBookFailure(err.message));
    else yield put(getListBookFailure(''));
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
}
