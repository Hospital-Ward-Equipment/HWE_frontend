import { create } from 'axios';

var axiosInstance = create({
baseURL: 'http://localhost:8080/',

});

export default axiosInstance;
