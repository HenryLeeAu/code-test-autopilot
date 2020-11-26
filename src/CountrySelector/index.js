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
  const [selectedCountry, setSelectedCountry] = useState(null);
  const selectorRef = useRef();

  const onInputFocus = () => {
    setOpen(true);
  }

  const onTextChange = (e) => {
    setSearchText(e.target.value)
    setSelectedCountry(null)
  }

  const changeSelectedCountry = (countryObj) => {
    onSelect(countryObj)
    setSearchText(countryObj.name)
    setSelectedCountry(countryObj)
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
        onChange={onTextChange}
        text={searchText}
        open={open}
        flagSrc={selectedCountry?.flag}
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
