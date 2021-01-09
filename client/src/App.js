import React from "react";

// Redux
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import MyRouter from "./routes/Router";

// 부트스트랩에서 기본 css를 불러옴 
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/custom.scss";

// React와 Redux store와 router연결
function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MyRouter />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
