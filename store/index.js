import { Auth } from 'aws-amplify'

export const state = () => ({
  loginUser: '',
})

export const getters = {
  getterValue: (state) => {
    return state.value
  },
}

export const mutations = {
  setCovnitoId: (state, loginUser) => {
    state.loginUser = loginUser
    console.log(state.loginUser)
  },
}

export const actions = {
  async login({ commit }, payload) {
    await Auth.signIn(payload.username, payload.password)
      .then((res) => {
        commit('setCovnitoId', res)
      })
      .catch((e) => console.error(e))
  },
}
