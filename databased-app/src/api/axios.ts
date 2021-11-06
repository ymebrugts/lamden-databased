import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "",
  headers: {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	}
});


export default axiosInstance;
