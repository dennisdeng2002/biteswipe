import {RECEIVE_RESTAURANTS, RECEIVE_RESTAURANT, RECEIVE_REVIEWS} from '../constants';

import dummyData from './dummyData';

const initialState = {
	list: dummyData,
  restaurant: {},
  reviews: []
};

const reducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	switch(action.type) {
		case RECEIVE_RESTAURANTS:
			newState.list = action.restaurants;
			break;
    case RECEIVE_RESTAURANT:
      newState.restaurant = action.restaurant;
      break;
    case RECEIVE_REVIEWS:
      newState.reviews = action.reviews;
      break;
    default:
      return state;
	};

	return newState;

};

export default reducer;