import {
  HTTP_ERROR,
} from "@/store/actions/utils"

const state = {

}

const getters = {

}

const actions = {
  [HTTP_ERROR]: (store, {error, router}) => {
    return new Promise((resolve) => {
      console.error(error)
      if (error.response) {
        switch(error.response.status) {
          /* Ошибка при аутентификации */
          case 401:
            router.push({ name: 'Login' })
            break
        }
      }
      resolve()
    })
  },
}

const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations,
}