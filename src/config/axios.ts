import axios from "axios"

const MODE: string = "DEV"

const api = axios.create({
    withCredentials: true,
    baseURL: MODE == "PROD" ? "https://griffon.optimatechlab.com" : "http://localhost:3000"
})

export default api