import { UPDATE_COUNTRY_LIST } from '../constants';

const initState = {
  list: [],
  status: 'idle',
}

const countries = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_COUNTRY_LIST:
      return {
        list:action.payload.list,
        status:action.payload.status,
      }
    default:
      return state;
  }
}

export default countries
