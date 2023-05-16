import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from '../helpers/fetch-wrapper';
import { alertService } from './alertService';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    login,
    logout,
    signUp,
    // getById,
};

async function login(username, password) {
    const user = await fetchWrapper.post(`${baseUrl}/login`, { username, password });

    // publish user to subscribers and store in local storage to stay logged in between page refreshes
    userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    console.log('ddadsas',user)
}

function logout() {
    alertService.clear();
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/posts/login');
}

async function signUp(user) {
    await fetchWrapper.post(`${baseUrl}/signup`, user);
    console.log('ddadsas',user)
}

// async function getById(id) {
//     return await fetchWrapper.get(`${baseUrl}/${id}`);
// }



