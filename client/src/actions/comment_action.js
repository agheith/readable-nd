import axios from 'axios';
import _ from 'lodash';
import uuid from 'uuid';
import {
  FETCH_POST_COMMENTS,
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  FETCH_COMMENTS_COUNT,
  FETCH_COMMENT,
  VOTE_COMMENT,
} from './types';
import { ROOT_URL, AUTH_HEADERS } from './constants';

axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

export function fetchPostComments(postId) {
  return dispatch => {
    axios.get(`${ROOT_URL}/posts/${postId}/comments`).then(res => dispatch({
        type: FETCH_POST_COMMENTS,
        payload: res.data
    }));
  };
}

export function createComment(values, parentId, callback) {
  const { author, body } = values;

  const data = {
    id: uuid(),
    parentId,
    timestamp: Date.now(),
    body,
    author,
  };

  return dispatch => {
    axios.post(`${ROOT_URL}/comments`, data).then(res => {
      callback();
      dispatch({
          type: CREATE_COMMENT,
          payload: res.data
      });
    });
  };
}

export function fetchCommentsCount(postId, callback) {
  return dispatch => {
    axios.get(`${ROOT_URL}/posts/${postId}/comments`).then(res => {
      const comments = _.filter(res.data, comment => !comment.deleted);
      const length = Object.keys(comments).length;
      const count = { postId, length };
      callback(count);
      dispatch({
          type: FETCH_COMMENTS_COUNT,
          payload: count
      });
    });
  };
}

export function fetchComment(id) {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/comments/${id}`)
      .then(res => dispatch({
          type: FETCH_COMMENT,
          payload: res.data
      }));
  };
}

export function deleteComment(id, callback) {
  return dispatch => {
    axios.delete(`${ROOT_URL}/comments/${id}`).then(res => {
      callback();
      dispatch({
          type: DELETE_COMMENT,
          payload: res.id
       });
    });
  };
}

export function editComment(id, values, callback) {
  return dispatch => {
    axios.put(`${ROOT_URL}/comments/${id}`, values).then(res => {
      callback();
      dispatch({
         type: EDIT_COMMENT,
         payload: res.data
        });
    });
  };
}

export function voteComment(id, vote) {
  return dispatch => {
    axios.post(`${ROOT_URL}/comments/${id}`, { option: vote }).then(res => dispatch({
        type: VOTE_COMMENT,
        payload: res.data
    }));
  };
}
