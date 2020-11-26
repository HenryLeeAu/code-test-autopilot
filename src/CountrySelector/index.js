import styled from 'styled-components'

import { useState, useEffect, useRef } from 'react';

import InputBox from './InputBox';
import List from './List';

const CountrySelectorWrapper = styled.div`
  position:relative;
  display: inline-block;
`;

const CountrySelector = ({
  countryList,
  onSelect = () => {},
  maxVisibleNumber,
  defaultPosition,
  itemHeight,
  ...restProps
}) => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('');
  const selectorRef = useRef();

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
    onSelect(countryList?.find(country =>country.name === text))
    setSearchText(text)
    setSelectedCountry(text)
    setOpen(false);

  }

  const clickAwayListener = (e) => {
    if (selectorRef.current && !selectorRef.current.contains(e.target)) {
      setOpen(false);
    }
  }


  useEffect(() => {
    document.addEventListener('click', clickAwayListener);

    return () => {
      document.removeEventListener('click', clickAwayListener);
    }
  }, [])

  return (
    <CountrySelectorWrapper
      ref={selectorRef}
      >
      <InputBox
        {...restProps}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onChange={onTextChange}
        text={searchText}
        open={open}
        flagSrc={countryList?.find((country) => country.name=== selectedCountry)?.flag}
      />
      <List
        open={open}
        countryList={countryList}
        currentText={searchText}
        changeSelectedCountry={changeSelectedCountry}
        selectedCountry={selectedCountry}
        maxVisibleNumber={maxVisibleNumber}
        defaultPosition={defaultPosition}
        itemHeight={itemHeight}
      />
    </CountrySelectorWrapper>
  )
}

export default CountrySelector;
