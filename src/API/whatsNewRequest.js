import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })
// const API = axios.create({ baseURL: "http://192.168.29.181" }) // Incorrect URL

// What's New CRUD API's
export const whatsNewAPI = (headers) => API.get(`/admin/whatsnews?size=10`, headers)
export const addWhatsNewPostAPI = (formData, headers) => API.post(`/admin/whatsnew/add`, formData, headers)
export const editWhatsNewPostAPI = (post_id, formData, headers) => API.post(`/admin/whatsnew/update/${post_id}`, formData, headers)
export const deleteWhatsNewPostAPI = (post_id, headers) => API.delete(`/admin/whatsnew/delete/${post_id}`, headers)
