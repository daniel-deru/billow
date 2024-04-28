import axios from "axios"

const api = axios.create({
    withCredentials: true,
    baseURL: "https://griffon.optimatechlab.com"
})

export default api