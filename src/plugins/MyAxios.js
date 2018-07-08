import axios from 'axios';

const MyAxios = axios.create({

  baseURL: 'http://localhost:8888/api/private/v1/'

});

export default MyAxios;
