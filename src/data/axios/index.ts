import axios, { AxiosResponse } from 'axios'

axios.interceptors.response.use((response: AxiosResponse) => response.data)

export default axios
