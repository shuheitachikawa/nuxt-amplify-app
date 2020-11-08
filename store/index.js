import { API, Auth, graphqlOperation } from 'aws-amplify'
import { userByCognitoId } from '@/src/graphql/queries'

export const state = () => ({
  loginUser: '',
  cognitoId: '',
})

export const getters = {
  loginUser: (state) => {
    return state.loginUser
  },
  cognitoId: (state) => {
    return state.cognitoId
  },
}

export const mutations = {
  setUser: (state, loginUser) => {
    state.loginUser = loginUser
  },
  setCognitoId: (state, cognitoId) => {
    state.cognitoId = cognitoId
  },
}

export const actions = {
  async login({ dispatch }, payload) {
    await Auth.signIn(payload.username, payload.password)
      .then((res) => {
        dispatch('getUser', res.username)
      })
      .catch((e) => console.error(e))
  },
  async getUser({ commit }, cognitoUser) {
    const { data } = await API.graphql(
      graphqlOperation(userByCognitoId, {
        cognito_id: cognitoUser,
      })
    )
    commit('setUser', data.userByCognitoId.items[0])
  },
  async initLogin({ commit }, payload) {
    await Auth.signIn(payload.username, payload.password)
      .then((res) => {
        commit('setCognitoId', res.username)
      })
      .catch((e) => console.error(e))
  },
}
