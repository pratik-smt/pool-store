import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })
// const API = axios.create({ baseURL: "http://192.168.29.181" }) // Incorrect URL

// What's New CRUD API's
export const addScreenAPI = (formData, headers) => API.post(`/admin/onboarding-screen/add`, formData, headers)
export const onboardingScreenAPI = (headers) => API.get(`/admin/onboarding-screens`, headers)
export const deleteOnboardingScreenAPI = (screen_id, headers) => API.delete(`/admin/onboarding-screen/delete/${screen_id}`, headers)
// export const editBannerAPI = (post_id, formData, headers) => API.post(`/admin/whatsnew/update/${post_id}`, formData, headers)
// export const deleteBannerAPI = (post_id, headers) => API.delete(`/admin/whatsnew/delete/${post_id}`, headers)
