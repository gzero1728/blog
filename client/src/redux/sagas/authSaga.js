import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../types";

// Login
const loginUserAPI = (loginData) => {
    console.log(loginData, "loginData")
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    return axios.post("api/auth", loginData, config)
}

// Login 액션 모니터링
function* loginUser(action) {
    try {
        // call: 함수의 첫번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수
        const result = yield call(loginUserAPI, action.payload)
        console.log(result)

        // put: 특정 액션을 디스패치
        // call과 put의 차이점
        //     @ put: 스토어에 인자로 들어온 action을 dispatch하고, 
        //     @ call: 주어진 함수를 실행함 
        yield put({
            type: LOGIN_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response
        })
    }
}

function* watchLoginUser() {
    // takeEvery: 특정 액션 타입에 대하여 디스패치되는 모든 액션들을 처리
    yield takeEvery(LOGIN_REQUEST, loginUser)
}

export default function* authSaga() {
    // all: 배열 안의 여러 사가를 동시에 실행
    yield all([
        // fork: call과 반대로 비동기적으로 처리될 수 있도록 도와줌
        //     : 함수이 인자로 전달할 특정 함수가 특정 조건을 만족했을 때 실행됨
        fork(watchLoginUser)
    ])
}