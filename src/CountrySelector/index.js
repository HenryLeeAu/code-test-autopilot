import styled from 'styled-components'

import {useState} from 'react';

import InputBox from './InputBox';
import List from './List';

const CountrySelectorWrapper = styled.div`
  position:relative;
  display: inline-block;
`;

const CountrySelector = ({
  countryList,
}) => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('');

  const onInputFocus = () => {
    setOpen(true);
  }

  const onInputBlur = () => {
    //setOpen(false);
  }

  const onTextChange = (e) => {
    setSearchText(e.target.value)
    setSelectedCountry('')
  }

  const changeSelectedCountry = (text) => {
    setSearchText(text)
    setSelectedCountry(text)
    setOpen(false);

  }

  return (
    <CountrySelectorWrapper>
      <InputBox
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onChange={onTextChange}
        text={searchText}
        open={open}
        flagSrc={countryList.find((country) => country.name=== selectedCountry)?.flag}
      />
      <List
        open={open}
        countryList={countryList}
        currentText={searchText}
        changeSelectedCountry={changeSelectedCountry}
        selectedCountry={selectedCountry}
      />
    </CountrySelectorWrapper>
  )
}

export default CountrySelector;
