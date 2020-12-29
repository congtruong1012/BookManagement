/* eslint-disable no-plusplus */
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createBookFailure,
  createBookSuccess,
  deleteBookFailure,
  deleteBookSuccess,
  deleteMuiltiBookFailure,
  deleteMuiltiBookSuccess,
  getBookFailure,
  getBookSuccess,
  getListBookFailure,
  getListBookSuccess,
  getTotalBookFailure,
  getTotalBookSuccess,
  setPublishFailure,
  setPublishMuiltiFailure,
  setPublishMuiltiSuccess,
  setPublishSuccess,
  updateBookSuccess,
} from './actions';
import {
  CREATE_BOOK,
  DELETE_BOOK,
  DELETE_MUILTI_BOOK,
  GET_BOOK,
  GET_LIST,
  GET_LIST_BOOK,
  GET_TOTAL_BOOK,
  SET_PUBLISH,
  SET_PUBLISH_MUILTI,
  UPDATE_BOOK,
} from './constants';

// Individual exports for testing
const URL = 'http://localhost:4000';
export function* countListBookApi() {
  try {
    const response = yield call(axios.get, `${URL}/book/count`);
    if (response.status === 200) {
      yield put(getTotalBookSuccess(response.data));
    }
  } catch (error) {
    yield put(getTotalBookFailure(error.message));
  }
}
export function* getListBookApi({ actionType }) {
  try {
    if (actionType === GET_LIST) {
      const response = yield call(axios.get, `${URL}/book`);
      if (response.status === 200) {
        yield put(getListBookSuccess(response.data, actionType));
      }
    }
    // else {
    //   const response = yield call(
    //     axios.get,
    //     `${URL}/book?skip=${offset}&&limit=${limit}`,
    //   );
    //   if (response.status === 200) {
    //     yield put(getListBookSuccess(response.data, actionType));
    //   }
    // }
  } catch (err) {
    if (err.message) yield put(getListBookFailure(err.message, actionType));
    else yield put(getListBookFailure('', actionType));
  }
}
export function* getBookApi({ id }) {
  try {
    const response = yield call(axios.get, `${URL}/book/${id}`);
    if (response.status === 200) {
      yield put(getBookSuccess(response.data));
    }
  } catch (error) {
    yield put(getBookFailure(error.message));
  }
}
export function* setPublish({ id }) {
  try {
    const response = yield call(axios.patch, `${URL}/book/${id}`);
    if (response.status === 200) {
      yield put(setPublishSuccess(id));
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
        yield put(setPublishMuiltiSuccess(bool, arr));
      }
    }
  } catch (err) {
    if (err.message) yield put(setPublishMuiltiFailure(err.message));
  }
}

export function* createBook({ data }) {
  try {
    const response = yield call(axios.post, `${URL}/book`, data);
    if (response.status === 201) {
      yield put(createBookSuccess(response.data));
    }
  } catch (error) {
    yield put(createBookFailure(error.message));
  }
}

export function* deleteBook({ id }) {
  try {
    const response = yield call(axios.delete, `${URL}/book/${id}`);
    if (response.status === 200) {
      yield put(deleteBookSuccess(id));
    }
  } catch (error) {
    yield put(deleteBookFailure(error.message));
  }
}

export function* deleteMuiltiBook({ arr }) {
  try {
    for (let i = 0; i < arr.length; i++) {
      const apiResponse = yield call(axios.delete, `${URL}/book/${arr[i]}`);
      if (apiResponse.status === 200) {
        yield put(deleteMuiltiBookSuccess(arr));
      }
    }
  } catch (err) {
    if (err.message) yield put(deleteMuiltiBookFailure(err.message));
  }
}

export function* updateBook({ id, data }) {
  try {
    const response = yield call(axios.put, `${URL}/book/${id}`, data);
    if (response.status === 200) {
      yield put(updateBookSuccess(id, data));
    }
  } catch (error) {
    yield put(deleteBookFailure(error.message));
  }
}

export default function* homePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_LIST_BOOK, getListBookApi);
  yield takeLatest(GET_BOOK, getBookApi);
  yield takeLatest(SET_PUBLISH, setPublish);
  yield takeLatest(SET_PUBLISH_MUILTI, setPublishMuilti);
  yield takeLatest(GET_TOTAL_BOOK, countListBookApi);
  yield takeLatest(CREATE_BOOK, createBook);
  yield takeLatest(DELETE_BOOK, deleteBook);
  yield takeLatest(DELETE_MUILTI_BOOK, deleteMuiltiBook);
  yield takeLatest(UPDATE_BOOK, updateBook);
}
