import axios from 'axios'

const axiosMockInstance = axios.create({ 
  baseURL: process.env.MOCK_HOST 
})

export default axiosMockInstance