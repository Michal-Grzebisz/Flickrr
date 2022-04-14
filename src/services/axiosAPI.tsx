import axios from 'axios';

const axiosApiInstance = axios.create({
  baseURL: 'http://localhost:8080/',
});

const ACCESS_TOKE_KEY = 'ACCESS_TOKEN';

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKE_KEY);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKE_KEY, token);
}

axiosApiInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    // console.log('Token from local storage added to the request', token);
    config.headers = {
      Authorization: `Bearer ${token}`,
    };

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export { axiosApiInstance };
