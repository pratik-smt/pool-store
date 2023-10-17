import { logInAPI, updateAvatarAPI, updateProfileAPI } from "../API/authRequest"

export const loginToAdmin = (formData) => async (dispatch) => {

    dispatch({ type: "AUTH_START" })
    try {
        const { data } = await logInAPI(formData)
        if (data) {
            dispatch({ type: "AUTH_SUCCESS", data: data })
            return { success: data.message }
        }

    } catch (error) {
        console.log(error)
        dispatch({ type: "AUTH_FAIL" })
        if (error.code !== "ERR_NETWORK") {
            return { error: error.response.data.message };
        }
        else {
            return { error: "Something went wront! please try again later" };
        }
    }
}

export const resetPassword = async (formData) => {

    try {
        const { data } = await logInAPI(formData)
        if (data) {
            return { success: data.message }
        }

    } catch (error) {
        console.log(error)
        if (error.code !== "ERR_NETWORK") {
            return { error: error.response.data.message };
        }
        else {
            return { error: "Something went wront! please try again later" };
        }
    }
}

export const logoutAdmin = () => async (dispatch) => {
    dispatch({ type: "LOGOUT_USER" })
}

export const updateAdminProfile = (formData, headers) => async (dispatch) => {

    dispatch({ type: "PROFILE_UPDATE_START" })
    try {
        const { data } = await updateProfileAPI(formData, headers)
        if (data) {
            dispatch({ type: "PROFILE_UPDATE_SUCCESS", data: data })
            return { success: data.message }
        }

    } catch (error) {
        console.log(error)
        dispatch({ type: "PROFILE_UPDATE_FAIL" })
        if (error.code !== "ERR_NETWORK") {
            return { error: error.response.data.message }
        }
        else {
            return { error: "Something went wront! please try again later" }
        }
    }
}

export const avatarUpdate = (formData, headers) => async (dispatch) => {

    dispatch({ type: "AVATAR_UPDATE_START" })
    try {
        const { data } = await updateAvatarAPI(formData, headers)
        if (data) {
            dispatch({ type: "AVATAR_UPDATE_SUCCESS", data: data })
            return { success: data.message }
        }

    } catch (error) {
        console.log("avatarUpdate", error)
        dispatch({ type: "AVATAR_UPDATE_FAIL" })

        if (error.code == "ERR_NETWORK") {
            return { error: "Something went wront! please try again later" };
        }
        else {
            return { error: error.response.data.message };
        }
    }
}