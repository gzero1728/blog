import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history"
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "./redux/reducers/index";
import rootSaga from "./redux/sagas"

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

// 웹에 모든 상태를 담고 있는 초기값
// 초기값은 변화된 것이 없기 때문에 빈 객체이다.
const initialState = {};

const middlewares = [sagaMiddleware, routerMiddleware(history)];

// 브라우저에서 redux로 개발을 할 때 어떻게 상태가 진행되고 있는지 볼 수 있게 도와주는 도구
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const composeEnhancer =
    process.env.NODE_ENV === "production" ? compose : devtools || compose;

const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancer(applyMiddleware(...middlewares))
)

// sagaMiddleware을 rootSaga로 작동 
sagaMiddleware.run(rootSaga)

export default store;