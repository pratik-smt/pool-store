import axios from "axios";

// const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })
const API = axios.create({ baseURL: "http://192.168.29.203:3000" }) // Incorrect URL

// Product basic API's
export const productListAPI = (headers) => API.get(`/getdata`, headers)
// export const addWhatsNewPostAPI = (formData, headers) => API.post(`/admin/whatsnew/add`, formData, headers)
// export const editWhatsNewPostAPI = (post_id, formData, headers) => API.post(`/admin/whatsnew/update/${post_id}`, formData, headers)
// export const deleteWhatsNewPostAPI = (post_id, headers) => API.delete(`/admin/whatsnew/delete/${post_id}`, headers)
