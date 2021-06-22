export const state = () => ({
  maximumThreshold: null,
  minimumThreshold: null,
})

export const mutations = {
  setMaximum(state, value) {
    state.maximumThreshold = value
  },
  setMinimum(state, value) {
    state.minimumThreshold = value
  },
}
