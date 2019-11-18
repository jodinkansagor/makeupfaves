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

