import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })
// const API = axios.create({ baseURL: "http://192.168.29.181" }) // Incorrect URL

// Auth API's
export const logInAPI = (formData) => API.post('/admin/login', formData)
export const forgetPasswordAPI = (formData) => API.post('/admin/forget-password', formData)
export const verifyOtpAPI = (formData) => API.post('/admin/forget-password-verify-otp', formData)
export const changePasswordAPI = (formData, headers) => API.post('/admin/reset-password', formData, headers)

// Profile API's
export const updateProfileAPI = (formData, headers) => API.post('/admin/update-admin', formData, headers)
export const updatePasswordAPI = (formData, headers) => API.post('/admin/change-password', formData, headers)
export const updateAvatarAPI = (formData, headers) => API.post('/admin/update-avatar', formData, headers)