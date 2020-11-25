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
`

const List = ({
  countryList,
  open,
  currentText,
  changeSelectedCountry,
  selectedCountry,
}) => {
  const listRef = useRef(null);

  const itemHeight = 36;
  const maxVisibleItemNumber = 5;
  const defaultPosition = 3;
  const currentIndex = countryList.findIndex((country) => country.name ===selectedCountry);

  useEffect(() => {
    if(listRef?.current && open) {
     const currentPosition = getCurrentScrollTop({
        maxVisibleItemNumber,
        position:defaultPosition,
        currentIndex,
        itemHeight,
        length:countryList.length,
      })
      listRef.current.scrollTop = currentPosition;
      listRef.current.scrollLeft = 0;

    }
  },[listRef, open, countryList.length, currentIndex])

  return (
    <ListWrapper
      open={open}
      maxHeight={itemHeight * maxVisibleItemNumber}
      ref={listRef}
    >
        {
          countryList.filter(({name}) => selectedCountry || name.toLowerCase().includes(currentText.toLowerCase())).map((country) => (
            <Item
              key={country.name}
              name={country.name}
              itemHeight={itemHeight}
              flagUrl={country.flag}
              onClick={() =>changeSelectedCountry(country.name)}
              highlight={country.name === selectedCountry}
            />
          ))
        }
    </ListWrapper>
  )
}

export default List
