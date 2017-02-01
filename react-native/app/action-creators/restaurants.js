import {RECEIVE_RESTAURANTS} from '../constants';
import axios from 'axios';

export const receiveRestaurants = restaurants => ({
	type: RECEIVE_RESTAURANTS,
	restaurants
});

export const getRestaurants = (latitude, longitude, radius, price, categories) => {
	return dispatch => {
		axios.get('http://10.0.2.2:1337/api/restaurants', {
			params: {
			  latitude: latitude,
			  longitude: longitude,
			  radius: radius,
			  price: price,
			  categories: categories
			}
		})
		.then(res => {
			return res.data
		})
		.then(restaurants => {
			dispatch(receiveRestaurants(restaurants));
		})
		.catch(console.error);
	};
};





