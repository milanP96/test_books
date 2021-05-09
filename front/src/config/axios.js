import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.defaults.headers["Authorization"] = localStorage.getItem("token")

export default axios;