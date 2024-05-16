import axios from 'axios'

const API = 'http://localhost:10000/fepi'

export const registerRequest = user => axios.post(`${API}/auth/register`, user)
export const loginRequest = user => axios.post(`${API}/auth/login`, user)