import { http } from "./axios"

export default {
  login: (userName: string, password: string) => {
    return http.post(`users/login`, { userName, password })
  },
  cadastrar: (usuario) => {
    return http.post(`users`, usuario)
  },
  ranking: (usuario) => {
    return http.get(`/usuario/${usuario}`)
  }
}