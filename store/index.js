import { magic } from '../plugins/magic'

export const state = () => ({
  user: null,
  didToken: null,
  authenticated: false,
})

export const mutations = {
  SET_USER_DATA(state, data) {
    state.user = data.userData
    state.didToken = data.didToken
    state.authenticated = true
  },
  CLEAR_USER_DATA(state) {
    state.user = null
    state.didToken = null
    state.authenticated = false
    this.$router.push('/login')
  },
}

export const actions = {
  async login({ commit }, email) {
    await magic.auth.loginWithMagicLink(email)
    const userData = await magic.user.getMetadata()
    const didToken = await magic.user.getIdToken({ lifespan: 3600 })
    const data = { userData, didToken }
    // didToken is valid for 3600 seconds
    // Read more https://docs.magic.link/client-sdk/web/api-reference#getidtoken
    commit('SET_USER_DATA', data)
  },
  async logout({ commit }) {
    await magic.user.logout()
    commit('CLEAR_USER_DATA')
  },
}
