import axios from 'axios';
import uuid from 'uuid';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';

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

export function deletePost(id, callback){

    const request = axios.delete(`${ROOT_URL}/posts/${id}`).then(() => callback())

    return {
        type: DELETE_POST,
        payload: id
    }
}
