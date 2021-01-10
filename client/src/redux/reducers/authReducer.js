import { CLEAR_ERROR_FAILURE, CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../types"

// 초기 상태 정의
const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: "",
    userId: "",
    userName: "",
    userRole: "",
    errorMsg: "",
    successMsg: ""
}

const authReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                errorMsg: "",
                isLoading: true,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                userId: action.payload.user.id,
                userRole: action.payload.user.role,
                errorMsg: ""
            }
        case LOGIN_FAILURE:
            localStorage.removeItem("token", action.payload.token)
            return {
                ...state,
                ...action.payload,
                token: null,
                user: null,
                userId: null,
                userRole: null,
                isAuthenticated: false,
                isLoading: false,
                errorMsg: action.payload.data.msg
            }
        // eslint-disable-next-line no-duplicate-case
        case CLEAR_ERROR_REQUEST:
            return {
                ...state,
                errorMsg: null
            }
        case CLEAR_ERROR_SUCCESS:
            return {
                ...state,
                errorMsg: null
            }
        case CLEAR_ERROR_FAILURE:
            return {
                ...state,
                errorMsg: null
            }
        default:
            return state;
    }
}

export default authReducer;