import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components'

import CountrySelector from './CountrySelector';

import { fetchCountryList } from './redux/actions/countries'

const AppWrapper = styled.div`
  max-width:640px;
  margin: 0 auto;
  padding-top:15px;
`


const App = () => {
  const dispatch = useDispatch()
  const countryList = useSelector((state) => state.countries.list);
  const loadingStatus= useSelector((state) => state.countries.status);

  useEffect(() => {
    dispatch(fetchCountryList())
  },[dispatch])


  console.log(countryList)
  return (
    <AppWrapper>
      <CountrySelector
        countryList={countryList}
        loadingStatus={loadingStatus}
      />
    </AppWrapper>
  )
}

export default App;
