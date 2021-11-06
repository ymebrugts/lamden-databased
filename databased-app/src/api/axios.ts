import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://rocketswap.exchange:2053/",
  headers: {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	'Access-Control-Allow-Headers': 'Authorization'
}
});


export default axiosInstance;
