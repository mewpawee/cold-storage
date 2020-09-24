export const state = () => ({
  leftDrawer: false,
  rightDrawer: false,
  miniVariant: false
})

export const mutations = {
  set_minivariant(state, newMiniVariant) {
    state.miniVariant = newMiniVariant
  },
  set_left_drawer(state, newLeftDrawerState) {
    state.leftDrawer = newLeftDrawerState
  },
  set_right_drawer(state, newRightDrawerState) {
    state.rightDrawer = newRightDrawerState
  }
}
