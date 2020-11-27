import * as React from "react";
import styled from "styled-components";

import InputBox from "./InputBox";
import List from "./List";
import { CountryItemT } from "../redux/type";
import { RestPropsT } from "./type";

const CountrySelectorWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

type CountryListT = {
  name: string;
  flag: string;
};

type Props = RestPropsT & {
  itemHeight?: number;
  onSelect?: (data: any) => void;
  maxVisibleNumber?: number;
  defaultPosition?: number;
  countryList?: CountryListT[];
};

const CountrySelector: React.FC<Props> = ({
  countryList = [],
  onSelect = () => {},
  maxVisibleNumber,
  defaultPosition,
  itemHeight,
  ...restProps
}) => {
  const [isOpen, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [
    selectedCountry,
    setSelectedCountry,
  ] = React.useState<CountryItemT | null>(null);
  const selectorRef = React.useRef<HTMLDivElement>(null);

  const onInputFocus = () => {
    setOpen(true);
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
    setSelectedCountry(null);
  };

  const changeSelectedCountry = (countryObj: CountryItemT): void => {
    onSelect(countryObj);
    setSearchText(countryObj.name);
    setSelectedCountry(countryObj);
    setOpen(false);
  };

  const clickAwayListener: any = (
    e: React.MouseEvent<HTMLDivElement>
  ): void => {
    if (
      selectorRef.current &&
      !selectorRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", clickAwayListener);

    return () => {
      document.removeEventListener("click", clickAwayListener);
    };
  }, []);

  return (
    <CountrySelectorWrapper ref={selectorRef}>
      <InputBox
        {...restProps}
        onFocus={onInputFocus}
        onChange={onTextChange}
        text={searchText}
        isOpen={isOpen}
        flagSrc={selectedCountry?.flag}
      />
      <List
        isOpen={isOpen}
        countryList={countryList}
        currentText={searchText}
        changeSelectedCountry={changeSelectedCountry}
        selectedCountry={selectedCountry}
        maxVisibleNumber={maxVisibleNumber}
        defaultPosition={defaultPosition}
        itemHeight={itemHeight}
      />
    </CountrySelectorWrapper>
  );
};

export default CountrySelector;
