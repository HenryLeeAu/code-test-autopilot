import { UPDATE_COUNTRY_LIST, UPDATE_COUNTRY_LOADING_STATUS } from '../constants';

const initState = {
  list: [],
  status: null,
}

const countries = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_COUNTRY_LOADING_STATUS:
      return {
        ...state,
        status:action.payload.status,
      }
    case UPDATE_COUNTRY_LIST:
      return {
        ...state,
        list:action.payload.list,
      }
    default:
      return state;
  }
}

export default countries
