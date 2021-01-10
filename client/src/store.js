import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history"
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "./redux/reducers/index";
import rootSaga from "./redux/sagas"

export const history = createBrowserHistory();

// saga를 store에 연결하기 위한 미들웨어
const sagaMiddleware = createSagaMiddleware();

// 웹에 모든 상태를 담고 있는 초기값
// 초기값은 변화된 것이 없기 때문에 빈 객체이다.
const initialState = {};

// 미들웨어로 sagaMiddleware, routerMiddleware를 사용
// 만약 logger를 적용한다면 가장 마지막에 위치해야 함
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
// 주의! 스토어 생성이 된 다음에 위 코드를 실행해야함
sagaMiddleware.run(rootSaga)

export default store;