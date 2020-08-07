// src/services/Server.js

import Api from '@/services/Api'

export default {
  login (user) {
    return Api().post('user/login', user)
  },

  sync (obj) {
    return Api().post('user/sync', obj)
  }
}