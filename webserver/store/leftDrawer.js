export const state = () => ({
  status: null,
})

export const mutations = {
  set(state, status) {
    state.status = status
  },
}
