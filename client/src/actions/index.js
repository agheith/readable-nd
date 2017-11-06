import axios from 'axios';
import uuid from 'uuid';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const CATEGORY_POST = 'CATEGORY_POST';

export const FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS';

const ROOT_URL = 'http://localhost:3001';
const AUTH_HEADERS = { 'Authorization': 'whatever-you-want', 'Accept': 'application/json', 'Content-Type': 'application/json' }

axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

export function fetchPosts(){
    const request = axios.get(`${ROOT_URL}/posts`)

    return{
        type: FETCH_POSTS,
        payload: request
    };
}


export function fetchPost(id){

    const request = axios.get(`${ROOT_URL}/posts/${id}`)

    return {
        type: FETCH_POST,
        payload: request
    }

}


export function createPost(values, callback){

    const { title, body, author } = values;
    const data = {
        id: uuid(),
        title,
        body,
        author
    }

    const request = axios.post(`${ROOT_URL}/posts`, data).then(() => callback())

    return {
        type: CREATE_POST,
        payload: data
    }
}


export function editPost(id, values, callback){

    return dispatch => {
        axios.put(`${ROOT_URL}/posts/${id}`, values).then(res => {

            callback();
            dispatch({
                type: EDIT_POST,
                payload: res.data
            })
        })
    }
}


export function deletePost(id, callback){

    const request = axios.delete(`${ROOT_URL}/posts/${id}`).then(() => callback())

    return {
        type: DELETE_POST,
        payload: id
    }
}


export function votePost(id, vote) {
  return dispatch => {
    axios.post(`${ROOT_URL}/posts/${id}`, {option: vote}).then(res => dispatch({

          type: VOTE_POST,
          payload: res.data

       }));
  };
}


export function fetchCategories() {
  return dispatch => {
    axios.get(`${ROOT_URL}/categories`).then(res => dispatch({

        type: FETCH_CATEGORIES,
        payload: res.data

     }));
  };
}

export function categoryPost(category){
    return dispatch => {
        axios.get(`${ROOT_URL}/${category}/posts`).then(res => dispatch({

        type: CATEGORY_POST,
        payload: res.data

    })).catch(err => console.log(err));
    }
}


export function fetchPostComments(postId){
    return dispatch => {
        axios.get(`${ROOT_URL}/posts/${postId}/comments`).then(res => dispatch({

            type: FETCH_POST_COMMENTS,
            payload: res.data

        }))
    }
}

// export function fetchPostComments(parentId){
//     const request = axios.get(`${ROOT_URL}/posts/${parentId}/comments`);
//
//     return (dispatch) => {
//         request.then(({data}) => {
//             dispatch({ type: FETCH_POST_COMMENTS, payload: data })
//         })
//     }
//
// }
