import * as React from "react";
import styled from "styled-components";

import Item from "./Item";
import getCurrentScrollTop from "./getCurrentScrollTop";

import { CountryItemT } from "../../redux/type";

type Props = {
  countryList: CountryItemT[];
  isOpen: boolean;
  currentText: string;
  changeSelectedCountry: (country: CountryItemT) => void;
  selectedCountry: CountryItemT | null;
  maxVisibleNumber?: number;
  defaultPosition?: number;
  itemHeight?: number;
};

const ListWrapper = styled.div<{ isOpen: boolean; maxHeight: number }>`
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.15);
  background: #fff;
  border-radius: ${({ theme }) => theme.radius.sm};
  width: 200px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  max-height: ${(props) => `${props.maxHeight}px`};
  overflow: auto;
  position: absolute;
  z-index: 100;
`;

const List: React.FC<Props> = ({
  countryList,
  isOpen,
  currentText,
  changeSelectedCountry,
  selectedCountry,
  maxVisibleNumber = 5,
  defaultPosition = 3,
  itemHeight = 36,
}) => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const currentIndex = countryList?.findIndex(
    (country: CountryItemT) => country.name === selectedCountry?.name
  );

  React.useEffect(() => {
    if (listRef?.current && isOpen && countryList?.length) {
      const currentPosition = getCurrentScrollTop({
        maxVisibleNumber,
        // it will use maxVisibleNumber as defaultPosition if default selected position beyond the range
        position:
          defaultPosition > maxVisibleNumber
            ? maxVisibleNumber
            : defaultPosition,
        currentIndex,
        itemHeight,
      });
      listRef.current.scrollTop = currentPosition;
      listRef.current.scrollLeft = 0;
    }
  }, [
    listRef,
    isOpen,
    countryList,
    currentIndex,
    maxVisibleNumber,
    defaultPosition,
    itemHeight,
  ]);

  const listFilter = ({ name }: { name: string }) =>
    // show all countries when selectedCountry exists
    // or show matched string countries list ( include match empty string '')
    !!selectedCountry || name.toLowerCase().includes(currentText.toLowerCase());

  return (
    <ListWrapper
      isOpen={isOpen}
      maxHeight={itemHeight * maxVisibleNumber}
      ref={listRef}
    >
      {countryList?.filter(listFilter).map((country) => (
        <div key={country.name} onClick={() => changeSelectedCountry(country)}>
          <Item
            key={country.name}
            name={country.name}
            itemHeight={itemHeight}
            flagUrl={country.flag}
            highlight={country.name === selectedCountry?.name}
          />
        </div>
      ))}
    </ListWrapper>
  );
};

export default List;
