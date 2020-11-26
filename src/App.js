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

  if(loadingStatus === 'SUCCESS') {
    return (
      <AppWrapper>
        <CountrySelector
          countryList={countryList}
          onSelect={(data) => console.log(data)}
        />
        <ul>
          <li>other content on the page</li>
          <li>other content on the page</li>

        </ul>

        <h2>It can also support dynamic item size and position</h2>
        <CountrySelector
          countryList={countryList}
          onSelect={(data) => console.log(data)}
          maxVisibleNumber={7}
          defaultPosition={6}
          itemHeight={50}
         />
      </AppWrapper>
    )
  }
  if(loadingStatus === 'LOADING') {
    return <div>Waiting for data</div>
  }
  return null;

}

export default App;
