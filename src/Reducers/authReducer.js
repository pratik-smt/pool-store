
const authReducer = (state = { authData: null, token: null, authLoading: false, authError: false }, action) => {
    switch (action.type) {
        // Login Cases
        case "AUTH_START":
            return { ...state, authLoading: true, authError: false }

        case "AUTH_SUCCESS":
            // localStorage.setItem("authData", JSON.stringify({ ...action?.data }))
            return { ...state, authData: action.data, token: action.data.data.token, authLoading: false, authError: false }

        case "AUTH_FAIL":
            return { ...state, authError: true, authLoading: false }

        // Logout user
        case "LOGOUT_USER":
            localStorage.clear();
            return { ...state, authData: null, authLoading: false, error: false }



        // Profile Update Cases
        case "PROFILE_UPDATE_START":
            return { ...state, authLoading: true, authError: false }

        case "PROFILE_UPDATE_SUCCESS":
            // localStorage.setItem("authData", JSON.stringify({ ...action?.data }))
            return { ...state, authData: action.data, authLoading: false, authError: false }

        case "PROFILE_UPDATE_FAIL":
            return { ...state, authError: true, authLoading: false }



        // Avatar update Cases
        case "AVATAR_UPDATE_START":
            return { ...state, authLoading: true, authError: false }

        case "AVATAR_UPDATE_SUCCESS":
            // localStorage.setItem("authData", JSON.stringify({ ...action?.data }))
            return { ...state, authData: { ...state.authData, data: { ...state.authData.data, avatar: action.data.data.avatar } }, authLoading: false, authError: false }

        case "AVATAR_UPDATE_FAIL":
            return { ...state, authError: true, authLoading: false }


        default:
            return state
    }
}

export default authReducer