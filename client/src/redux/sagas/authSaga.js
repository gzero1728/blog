import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { CLEAR_ERROR_FAILURE, CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, USER_LOADING_FAILURE, USER_LOADING_REQUEST, USER_LOADING_SUCCESS } from "../types";

// @ Login
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


// @ LOGOUT
// Logout 액션 모니터링
function* logout(action) {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    })
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
    })
    console.log(e)
  }
}

function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, logout)
}


// @ UserLoading: 로그인 상태 유지
const userLoadingAPI = (token) => {
  console.log(token)
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  if (token) {
    config.headers["x-auth-token"] = token
  }
  return axios.get("api/auth/user", config)
}

// Login 액션 모니터링
function* userLoading(action) {
  try {
    console.log(action, "userLoading")
    const result = yield call(userLoadingAPI, action.payload)
    console.log(result)
    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data
    })
  } catch (e) {
    yield put({
      type: USER_LOADING_FAILURE,
      payload: e.response
    })
  }
}

function* watchUserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading)
}


// @ Register

// register은 login과 유사함
// login은 token이 필요하지 않기 때문에 config 삭제
const registerUserAPI = (req) => {
  return axios.post("api/user", req)
}

// Register 액션 모니터링
function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload)
    console.log(result, "RegisterUser Data")
    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data
    })
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response
    })
  }
}

function* watchRegisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser)
}


// @ Clear Error
// 액션 모니터링
function* clearError() {
  try {
    yield put({
      type: CLEAR_ERROR_SUCCESS,
    })
  } catch (e) {
    yield put({
      type: CLEAR_ERROR_FAILURE,
    })
  }
}

function* watchClearError() {
  yield takeEvery(CLEAR_ERROR_REQUEST, clearError)
}



export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchUserLoading),
    fork(watchRegisterUser),
    fork(watchClearError)
  ])
}