import axios from 'axios';

export const AXIOS = axios.create({
  baseURL: `/testREST`
  ,
  // headers: {
  //   'Access-Control-Allow-Origin': 'http://localhost:8080'
  // }
})

