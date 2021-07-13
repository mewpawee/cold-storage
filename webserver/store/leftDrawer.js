export const state = () => ({
  status: true,
})

export const mutations = {
  set(state, status) {
    state.status = status
  },
}
