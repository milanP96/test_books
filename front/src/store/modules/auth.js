import axios from "../../config/axios.js"

export default {
    namespaced: true,
    state: {
        token: null,
        user: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setUser(state, data) {
            state.user = data
        }
    },
    actions: {
        async Login(context, data) {
            try {
                let res = await axios.post("user/token/", data)
                localStorage.setItem("token", `Token ${res.data["token"]}`)
                context.commit("setToken", res)
                axios.defaults.headers["Authorization"] = localStorage.getItem("token")
                return true
            } catch (e) {
                console.log(e)
                return false
            }
        },
        async FetchUser(context) {
            let resp = await axios.get("user/me")
            let required_info = ["email", "first_name", "last_name"]
            required_info.forEach((e) =>{
                if (!Object.prototype.hasOwnProperty.call(resp.data, e)) {
                    context.commit("setToken", null)
                    localStorage.removeItem("token")
                }
            })

            context.commit("setUser", resp.data)
            return resp.data
        },
        async logout(context) {
            context.commit("setUser", null)
            context.commit("setToken", null)
            localStorage.removeItem("token")
            return true
        }
    },
    getters: {
        isAuth(state) {
            return state.token != null
        }
    }
}