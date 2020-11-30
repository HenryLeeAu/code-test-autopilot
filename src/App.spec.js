import { render, waitFor } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { setupServer } from "msw/node";
import { rest } from "msw";

import reducers from "./redux/reducers";
import App from "./App";

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
    const store = createStore(reducers, applyMiddleware(thunk));

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
    const store = createStore(reducers, applyMiddleware(thunk));

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
    server.use(
      rest.get("https://restcountries.eu/rest/v2", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const store = createStore(reducers, applyMiddleware(thunk));

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
