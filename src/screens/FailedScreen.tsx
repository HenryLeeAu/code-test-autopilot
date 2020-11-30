import * as React from "react";

type Props = {};

const FailedScreen: React.FC<Props> = () => (
  <div data-testid="screen-failed">
    Can't find data, please refresh page or try again later
  </div>
);

export default FailedScreen;
