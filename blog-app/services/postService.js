import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from '../helpers/fetch-wrapper';
import { alertService } from './alertService';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/posts`;
// const postSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('post')));

export const postService = {
    // post: postSubject.asObservable(),
    // get postValue() { return postSubject.value },
    createPost,
    getAllposts,
    getPostById,
    deletePost: _delete
    // getSearch
    // logout,
    // signUp,
    // getById,
};



async function createPost(post) {
    await fetchWrapper.post(`${baseUrl}/`, post);
    console.log('ddadsas',post)
}

async function getAllposts() {
    return await fetchWrapper.get(`${baseUrl}/`);
}

async function getPostById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function _delete(id) {
    return await fetchWrapper.delete(`${baseUrl}/delete/${id}`);
}





