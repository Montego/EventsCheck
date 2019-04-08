import axios from 'axios';

const SERVER_URL = '/api';


export const AXIOS = axios.create({
  // baseURL: `/api`
  baseURL: SERVER_URL

});

