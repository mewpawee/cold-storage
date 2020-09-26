export const state = () => ({
  leftDrawer: false,
  rightDrawer: false,
  miniVariant: false,
  truck: {
    id: '',
    temp: '',
    lat: '',
    lng: ''
  }
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
  },
  set_truck_info(state, newTruckInfo) {
    state.truck.id = newTruckInfo.truckId
    state.truck.temp = newTruckInfo.temp
    state.truck.lat = newTruckInfo.lat
    state.truck.lng = newTruckInfo.lng
  }
}
