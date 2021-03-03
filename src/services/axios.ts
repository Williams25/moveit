import axios from "axios"

export const http = axios.create({
  baseURL: "https://moveit-api.herokuapp.com/"
})