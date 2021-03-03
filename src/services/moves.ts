import { http } from "./axios"

export default {
  updade: (userId: number, currentExperience: number, challengesCompleted: number, level: number) => {
    return http.put(`moves`, { userId, currentExperience, challengesCompleted, level })
  },
  findOne: (userId: number) => {
    return http.get(`moves/${userId}`)
  }
}