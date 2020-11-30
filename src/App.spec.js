import { render, waitFor } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { setupServer } from "msw/node";
import { rest } from "msw";

import reducers from "./redux/reducers";
import App from "./App";

describe("<App />", () => {
  const tarUrl = "https://restcountries.eu/rest/v2";

  const resData = [
    {
      name: "Country1",
      flag: "url1",
    },
    {
      name: "Country2",
      flag: "url1",
    },
  ];

  const initStore = () => {
    return createStore(reducers, applyMiddleware(thunk));
  };

  const server = setupServer(
    rest.get(tarUrl, (res, ctx) => {
      return res(ctx.json(resData));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders loading screen", async () => {
    const { queryByTestId } = render(
      <Provider store={initStore()}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(queryByTestId("screen-loading")).toBeTruthy();
    });
  });

  it("renders success screen", async () => {
    const { queryByTestId, queryAllByText } = render(
      <Provider store={initStore()}>
        <App />
      </Provider>
    );
    await waitFor(() => queryByTestId("screen-success"));

    expect(queryAllByText(resData[0].name)).toBeTruthy();
    expect(queryAllByText(resData[1].name)).toBeTruthy();
  });

  it("renders failed screen", async () => {
    server.use(
      rest.get(tarUrl, (res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { queryByTestId } = render(
      <Provider store={initStore()}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(queryByTestId("screen-failed")).toBeTruthy();
    });
  });
});
