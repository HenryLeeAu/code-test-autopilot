import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCountryList } from "./redux/actions/countries";
import SuccessScreen from "./screens/SuccessScreen";
import LoadingScreen from "./screens/LoadingScreen";
import FailedScreen from "./screens/FailedScreen";

import { RootStateT } from "./redux/type";

type Props = {};

const App: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const countryList = useSelector((state: RootStateT) => state.countries.list);
  const loadingStatus = useSelector(
    (state: RootStateT) => state.countries.status
  );

  React.useEffect(() => {
    dispatch(fetchCountryList());
  }, [dispatch]);

  switch (loadingStatus) {
    case "SUCCESS":
      return <SuccessScreen countryList={countryList} />;
    case "LOADING":
      return <LoadingScreen />;
    case "FAILED":
      return <FailedScreen />;
    default:
      return null;
  }
};

export default App;
