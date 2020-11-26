import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import styled from "styled-components";

import { fetchCountryList } from "./redux/actions/countries";

import CountrySelector from "./CountrySelector";

const AppWrapper = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding-top: 15px;
`;

const App = () => {
  const dispatch = useDispatch();
  const countryList = useSelector((state) => state.countries.list);
  const loadingStatus = useSelector((state) => state.countries.status);

  const [visibleNumber, setVisibleNumber] = useState("7");
  const [position, setPosition] = useState("4");
  const [itemSize, setItemSize] = useState("50");
  const [selectedData, setSelectedData] = useState("");

  useEffect(() => {
    dispatch(fetchCountryList());
  }, [dispatch]);

  if (loadingStatus === "SUCCESS") {
    return (
      <AppWrapper>
        <h2>Default example</h2>
        <CountrySelector
          countryList={countryList}
          onSelect={(data) => console.log(data)}
        />
        <h2>CountrySelector can also support dynamic item size and position</h2>
        <div>Change visible number</div>
        <input
          value={visibleNumber}
          onChange={(e) => setVisibleNumber(e.target.value)}
        />
        <div>Change default position </div>
        <input value={position} onChange={(e) => setPosition(e.target.value)} />
        <div>Change item size </div>
        <input
          value={itemSize}
          onChange={(e) => setItemSize(e.target.value)}
        />{" "}
        px
        <div>
          <CountrySelector
            countryList={countryList}
            onSelect={(data) => setSelectedData(data.name)}
            maxVisibleNumber={Number(visibleNumber)}
            defaultPosition={Number(position)}
            itemHeight={Number(itemSize)}
          />
        </div>
        your are selecting {selectedData}
      </AppWrapper>
    );
  }
  if (loadingStatus === "LOADING") {
    return <div>Waiting for data</div>;
  }
  return null;
};

export default App;
