import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupServer } from "msw/node";

import { rest } from "msw";

import App from "./App";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./redux/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

describe("<App />", () => {
  const server = setupServer(
    rest.get("https://restcountries.eu/rest/v2", (req, res, ctx) => {
      return res(
        ctx.json([
          {
            name: "Country1",
            flag: "url1",
          },
          {
            name: "Country2",
            flag: "url1",
          },
        ])
      );
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("render loading screen", async () => {
    const store = createStore(
      reducers,
      composeEnhancers(applyMiddleware(thunk))
    );
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    await waitFor(() => {
      expect(getByTestId("screen-loading")).not.toBeNull();
    });
  });
  it("render success screen", async () => {
    const store = createStore(
      reducers,
      composeEnhancers(applyMiddleware(thunk))
    );
    const { getByTestId, getAllByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    await waitFor(() => getByTestId("screen-success"));
    expect(getAllByText("Country1").length).toBe(2);
    expect(getAllByText("Country2").length).toBe(2);
  });

  it("render failed screen", async () => {
    const store = createStore(
      reducers,
      composeEnhancers(applyMiddleware(thunk))
    );
    server.use(
      rest.get("https://restcountries.eu/rest/v2", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    await waitFor(() => {
      expect(getByTestId("screen-failed")).not.toBeNull();
    });
  });
});
