import {
  AUTH_LOGIN,
  AUTH_LOGOUT,

  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
} from "@/store/actions/auth"

import axios from "axios"


const TOKEN_KEY = "token"

const state = {
  status: '',
  token: localStorage.getItem(TOKEN_KEY) || '',
  user: {},
}

const getters = {
  isAuth: state => !!state.token,
  authToken: state => state.status,
}

const actions = {
  /* Метод авторизации */
  [AUTH_LOGIN]: ({getters, commit}, user) =>  {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)

      axios.post(
        getters.getFullURL + "/auth/sign-in", user
        ).then(response => {
          const token = response.data.authtoken
          localStorage.setItem(TOKEN_KEY, token)
          commit(AUTH_SUCCESS, { token })
          resolve(response)
        }).catch(error => {
          commit(AUTH_ERROR, error)
          localStorage.removeItem(TOKEN_KEY)
          reject(error)
        })
    })
  },

  /* Метод выхода из профиля */
  [AUTH_LOGOUT]: ({commit}) => {
    return new Promise(resolve => {
      localStorage.removeItem(TOKEN_KEY)
      commit(AUTH_LOGOUT_SUCCESS)
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading"
  },
  [AUTH_SUCCESS]: (state, response) => {
    state.status = "success"
    axios.defaults.headers.common['Authorization'] = response.token
    state.token = response.token
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: state => {
    state.status = "error"
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT_SUCCESS]: state => {
    delete axios.defaults.headers.common['Authorization']
    state.token = ""
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
