// src/services/Api.js

import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}/api`,
    headers: {'Cache-Control': 'no-cache, no-store, no-transform'}
  })
}