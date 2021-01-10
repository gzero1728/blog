import { all, fork } from "redux-saga/effects";
import axios from "axios";

import authSaga from "./authSaga";
import dotenv from "dotenv";
dotenv.config()

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL

export default function* rootSaga() {
    // all: 배열 안의 여러 사가를 동시에 실행
    yield all([
        fork(authSaga)
    ]);
}