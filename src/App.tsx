import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { fetchCountryList } from "./redux/actions/countries";
import CountrySelector from "./CountrySelector";
import { RootStateT } from "./redux/type";

const AppWrapper = styled.div<{ theme: any }>`
  max-width: 640px;
  margin: 0 auto;
  padding-top: 15px;
  background: ${({ theme }) => theme.primary};
`;

const InputWrapper = styled.div`
  display: flex;
  padding-bottom: 25px;
  justify-content: space-between;
`;

const InputLabel = styled.div`
  font-size: 12px;
  color: #212121;
`;
const DisplayResultText = styled.div`
  color: #212121;
  display: inline;
  padding-left: 15px;
`;
const App = () => {
  const dispatch = useDispatch();
  const countryList = useSelector((state: RootStateT) => state.countries.list);
  const loadingStatus = useSelector(
    (state: RootStateT) => state.countries.status
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
          <InputWrapper>
            <div>
              <InputLabel>Change visible number</InputLabel>
              <input
                value={visibleNumber}
                onChange={(e) => setVisibleNumber(e.target.value)}
              />
            </div>
            <div>
              <InputLabel>Change default position </InputLabel>
              <input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div>
              <InputLabel>Change item size </InputLabel>
              <input
                value={itemSize}
                onChange={(e) => setItemSize(e.target.value)}
              />
              px
            </div>
          </InputWrapper>

          <div>
            <CountrySelector
              countryList={countryList}
              onSelect={(data) => setSelectedData(data.name)}
              maxVisibleNumber={Number(visibleNumber)}
              defaultPosition={Number(position)}
              itemHeight={Number(itemSize)}
            />
            <DisplayResultText>
              you are selecting {selectedData}
            </DisplayResultText>
          </div>
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
