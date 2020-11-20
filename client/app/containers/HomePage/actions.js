/*
 *
 * HomePage actions
 *
 */

import * as types from './constants';

export function defaultAction() {
  return {
    type: types.DEFAULT_ACTION,
  };
}
/**
 * Get list book
 */
export function getListBook() {
  return {
    type: types.GET_LIST_BOOK,
  };
}
export function getListBookSuccess(data) {
  return {
    type: types.GET_LIST_BOOK_SUCCESS,
    data,
  };
}
export function getListBookFailure(message) {
  return {
    type: types.GET_LIST_BOOK_FAILURE,
    message,
  };
}
/**
 * Get  book
 */
export function getBook(id) {
  return {
    type: types.GET_BOOK,
    id,
  };
}
export function getBookSuccess(data) {
  return {
    type: types.GET_BOOK_SUCCESS,
    data,
  };
}
export function getBookFailure(message) {
  return {
    type: types.GET_BOOK_FAILURE,
    message,
  };
}
/**
 * create book
 */
export function createBook(data) {
  return {
    type: types.CREATE_BOOK,
    data,
  };
}
export function createBookSuccess() {
  return {
    type: types.CREATE_BOOK_SUCCESS,
  };
}
export function createBookFailure(message) {
  return {
    type: types.CREATE_BOOK_FAILURE,
    message,
  };
}
/**
 * update book
 */
export function updateBook(id, data) {
  return {
    type: types.UPDATE_BOOK,
    id,
    data,
  };
}
export function updateBookSuccess() {
  return {
    type: types.UPDATE_BOOK_SUCCESS,
  };
}
export function updateBookFailure(message) {
  return {
    type: types.UPDATE_BOOK_FAILURE,
    message,
  };
}
/**
 * delete book
 */
export function deleteBook(id) {
  return {
    type: types.DELETE_BOOK,
    id,
  };
}
export function deleteBookSuccess() {
  return {
    type: types.DELETE_BOOK_SUCCESS,
  };
}
export function deleteBookFailure(message) {
  return {
    type: types.DELETE_BOOK_FAILURE,
    message,
  };
}
/**
 * filter book
 */
export function filterBook(name) {
  return {
    type: types.FILTER_BOOK,
    name,
  };
}
export function filterBookSuccess(data) {
  return {
    type: types.FILTER_BOOK_SUCCESS,
    data,
  };
}
export function filterBookFailure(message) {
  return {
    type: types.FILTER_BOOK,
    message,
  };
}
/**
 * set publish book
 */
export function setPublish(id) {
  return {
    type: types.SET_PUBLISH,
    id,
  };
}
export function setPublishSuccess() {
  return {
    type: types.SET_PUBLISH_SUCCESS,
  };
}
export function setPublishFailure(message) {
  return {
    type: types.SET_PUBLISH,
    message,
  };
}
/**
 * set publish book
 */
export function setPublishMuilti(bool, arr) {
  return {
    type: types.SET_PUBLISH_MUILTI,
    bool,
    arr,
  };
}
export function setPublishMuiltiSuccess() {
  return {
    type: types.SET_PUBLISH_MUILTI_SUCCESS,
  };
}
export function setPublishMuiltiFailure(message) {
  return {
    type: types.SET_PUBLISH_MUILTI,
    message,
  };
}
