import {useRef, useEffect} from 'react';
import styled from 'styled-components';

import Item from './Item';
import getCurrentScrollTop from './getCurrentScrollTop';

const ListWrapper = styled.div`
  box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.15);
  background: #fff;
  border-radius:4px;
  width: 200px;
  display: ${({open}) => open ? "block" : "none"};
  max-height: ${({maxHeight}) => `${maxHeight}px`};
  overflow: auto;
  position: absolute;
  z-index: 100;
`

const List = ({
  countryList,
  open,
  currentText,
  changeSelectedCountry,
  selectedCountry,
  maxVisibleNumber= 5,
  defaultPosition =3,
  itemHeight = 36,

}) => {
  const listRef = useRef(null);

  const currentIndex = countryList?.findIndex((country) => country.name ===selectedCountry?.name);

  useEffect(() => {
    if(listRef?.current && open && countryList?.length) {
     const currentPosition = getCurrentScrollTop({
        maxVisibleNumber,
        position:defaultPosition,
        currentIndex,
        itemHeight,
        length:countryList.length,
      })
      listRef.current.scrollTop = currentPosition;
      listRef.current.scrollLeft = 0;

    }
  },[listRef, open, countryList, currentIndex, maxVisibleNumber, defaultPosition, itemHeight])

  const listFilter = ({name}) => (
    // show all countries when selectedCountry exists
    // or show matched string countries list ( include match empty string '')
    selectedCountry || name.toLowerCase().includes(currentText.toLowerCase())
  )
  return (
    <ListWrapper
      open={open}
      maxHeight={itemHeight * maxVisibleNumber}
      ref={listRef}
    >
        {
          countryList?.filter(listFilter).map((country) => (
            <Item
              key={country.name}
              name={country.name}
              itemHeight={itemHeight}
              flagUrl={country.flag}
              onClick={() =>changeSelectedCountry(country)}
              highlight={country.name === selectedCountry?.name}
            />
          ))
        }
    </ListWrapper>
  )
}

export default List
