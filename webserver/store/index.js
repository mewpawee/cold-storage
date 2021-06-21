export const state = () => ({
  miniVariant: false,
  groups: [],
  selectedGroupName: null,
})

export const mutations = {
  set_selected_group_name(state, newSelectedGroupName) {
    state.selectedGroupName = newSelectedGroupName
  },
  set_groups(state, newGroups) {
    state.groups = newGroups
  },
}
