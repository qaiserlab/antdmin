import axios from 'axios'

const axiosInstance = axios.create({ 
  baseURL: process.env.API_HOST 
})

axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent

  if (sessionStorage.accessToken) {
    const token = sessionStorage.accessToken
    config.headers.Authorization = 'Bearer ' + token

    return config
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default axiosInstance