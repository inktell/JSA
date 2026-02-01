const url = 'https://lazada-api.p.rapidapi.com/product/details?itemId=123456789&site=vn';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY_CUA_BAN',
		'X-RapidAPI-Host': 'lazada-api.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}