import axios from "./axios";
export const getMenu = () => {
  return axios.Request({
    url: "menu",
    method: 'get'
  })
}

export const getHome = () => {
  return axios.Request({
    url: '/home/getData',
    method: 'get'
  })
}
