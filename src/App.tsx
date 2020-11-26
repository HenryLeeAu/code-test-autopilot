import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { fetchCountryList } from "./redux/actions/countries";
import CountrySelector from "./CountrySelector";
import { RootState } from "./redux/type";

const AppWrapper = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding-top: 15px;
`;

const App = () => {
  const dispatch = useDispatch();
  const countryList = useSelector((state: RootState) => state.countries.list);
  const loadingStatus = useSelector(
    (state: RootState) => state.countries.status
  );

  const [visibleNumber, setVisibleNumber] = React.useState("7");
  const [position, setPosition] = React.useState("4");
  const [itemSize, setItemSize] = React.useState("50");
  const [selectedData, setSelectedData] = React.useState("");

  React.useEffect(() => {
    dispatch(fetchCountryList());
  }, [dispatch]);

  switch (loadingStatus) {
    case "SUCCESS":
      return (
        <AppWrapper>
          <h2>Default example</h2>
          <CountrySelector
            countryList={countryList}
            onSelect={(data) => console.log(data)}
          />
          <h2>
            CountrySelector can also support dynamic item size and position
          </h2>
          <div>Change visible number</div>
          <input
            value={visibleNumber}
            onChange={(e) => setVisibleNumber(e.target.value)}
          />
          <div>Change default position </div>
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <div>Change item size </div>
          <input
            value={itemSize}
            onChange={(e) => setItemSize(e.target.value)}
          />
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
    case "LOADING":
      return <div>Waiting for data</div>;
    case "FAILED":
      return <div>Internet error, please refresh page</div>;
    default:
      return null;
  }
};

export default App;
