import * as React from "react";

type Props = {};

const LoadingScreen: React.FC<Props> = () => (
  <div data-testid="screen-loading">Waiting for data</div>
);

export default LoadingScreen;
