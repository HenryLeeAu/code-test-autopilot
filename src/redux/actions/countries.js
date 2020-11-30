import axios from "axios";
import {
  UPDATE_COUNTRY_LIST,
  UPDATE_COUNTRY_LOADING_STATUS,
} from "../constants";

const updateLoadingStatus = (status) => {
  return {
    type: UPDATE_COUNTRY_LOADING_STATUS,
    payload: {
      status,
    },
  };
};

const updateCountryList = (list) => {
  return {
    type: UPDATE_COUNTRY_LIST,
    payload: {
      list,
    },
  };
};

export const fetchCountryList = () => (dispatch, getState) => {
  dispatch(updateLoadingStatus("LOADING"));

  axios
    .get("https://restcountries.eu/rest/v2")
    .then(({ data }) => {
      dispatch(updateCountryList(data));
      dispatch(updateLoadingStatus("SUCCESS"));
    })
    .catch((error) => {
      dispatch(updateLoadingStatus("FAILED"));
    });
};
