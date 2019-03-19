import axios from 'axios';
const API_URL = 'http://localhost:8080';
export class APIService{

  constructor(){
  }

  getEvents() {
    const url = `${API_URL}/events`;
    return axios.get(url).then(response => response.data);
  }
  createEvents(event){
    const url = `${API_URL}/events`;
    return axios.post(url, {
      event
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });


    // axios.post(url,event).then((response) => {
    //   console.log(response);
    // })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

}
