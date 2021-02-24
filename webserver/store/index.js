export const state = () => ({
  leftDrawer: false,
  rightDrawer: false,
  miniVariant: false,
  groups: [],
  selectedGroupName: null,
  selectedGroup: [],
})

export const mutations = {
  set_selected_group_name(state, newSelectedGroupName) {
    state.selectedGroupName = newSelectedGroupName
  },
  set_selected_group(state, newSelectedGroup) {
    state.selectedGroup = newSelectedGroup
  },
  set_groups(state, newGroups) {
    state.groups = newGroups
  },
  set_minivariant(state, newMiniVariant) {
    state.miniVariant = newMiniVariant
  },
  set_right_drawer(state, newRightDrawerState) {
    state.rightDrawer = newRightDrawerState
  },
  set_truck_info(state, newTruckInfo) {
    state.truck.id = newTruckInfo._id
    state.truck.name = newTruckInfo.truckName
    state.truck.temp = newTruckInfo.trucksData[0].temp
    state.truck.lat = newTruckInfo.trucksData[0].lat
    state.truck.lng = newTruckInfo.trucksData[0].lng
  },
}
