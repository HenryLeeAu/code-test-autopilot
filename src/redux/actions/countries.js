import axios from 'axios';
import {UPDATE_COUNTRY_LIST} from '../constants';

export const fetchCountryList = () => (
  (dispatch, getState) => {
    axios.get('https://restcountries.eu/rest/v2')
      .then(({data}) => {
        // handle success
        dispatch({
          type: UPDATE_COUNTRY_LIST,
          payload: {
            list:data,
            status: 'fetched',
          },
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  }
)



