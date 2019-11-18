//fetch calls!

const BASE_URL = '/api';

let token = '';
const json = localStorage.getItem('USER');
if (json) {
    const user = JSON.parse(json);
    token = user.token;
}

//redirect if not on the homepage and no token

if (!token && location.pathname !== '/auth.html') {
    const searchParams = new URLSearchParams();
    searchParams.set('redirect', location.pathname);
    location = '/auth.html?${searchParams.toString()}';
}

async function fetchWithError(url, options) {
    if (token) {
        options = options || {};
        options.headers = options.headers || {};
        options.headers.Authorization = token;
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
        return data;
    } else {
        throw data.error;
    }
}

export function getMakeups() {
    const hashQuery = window.location.hash.slice(1);
    const url = `${BASE_URL}/makeups?${hashQuery}`;
    return fetchWithError(url);
}

export function getFavorites() {
    const url = `${BASE_URL}/me/favorites`;
    return fetchWithError(url);
}

export function makeFavorite(makeup) {
    const url = `${BASE_URL}/me/favorites`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(makeup)
    });
}

export function unFavorite(makeupId) {
    const url = `${BASE_URL}/me/favorites/${makeupId}`;
    return fetchWithError(url, {
        method: 'DELETE'
    });
}

export function signUp(user) {
    const url = `${BASE_URL}/auth/signup`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
}

export function signIn(credentials) {
    const url = `${BASE_URL}/auth/signin`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    });
}
 

