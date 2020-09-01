const axios = require('axios');

let url = 'https://pokeapi.co/api/v2/';

const init = (url, method) => (path) => {
	return axios[method](`${url}${path}`);
}

const api = {
	get: init(url, 'get'),
};

export default api;