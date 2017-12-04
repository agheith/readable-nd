import axios from 'axios';
import {
  FETCH_CATEGORIES,
} from './types';
import { ROOT_URL, AUTH_HEADERS } from './constants';

axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

export function fetchCategories() {
  return dispatch => {
    axios.get(`${ROOT_URL}/categories`).then(res => dispatch({

          type: FETCH_CATEGORIES,
          payload: res.data

      }));
  };
}
