import { GetStorate, SetStorate } from '@/utils'
import { TOGGLE_SIDEBAR, CLOSE_SIDEBAR, TOGGLE_DEVICE, SET_SIZE, SET_TABLE_HTIGHT } from '@/store/types/app'

const state = {
  sidebar: {
    opened: GetStorate('sidebarStatus') !== 0,
    withoutAnimation: false
  },
  device: 'desktop', // 'mobile' | 'desktop'
  size: GetStorate('size') || 'medium',
  tableHeight: innerHeight - 180
}
const mutations = {
  [TOGGLE_SIDEBAR]: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      SetStorate('sidebarStatus', 1)
    } else {
      SetStorate('sidebarStatus', 0)
    }
  },
  [CLOSE_SIDEBAR]: (state, withoutAnimation) => {
    SetStorate('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  [TOGGLE_DEVICE]: (state, device) => {
    state.device = device
  },
  [SET_SIZE]: (state, size) => {
    state.size = size
    SetStorate('size', size)
  },
  [SET_TABLE_HTIGHT]: (state, tableHeight) => {
    state.tableHeight = tableHeight
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit(TOGGLE_SIDEBAR)
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit(CLOSE_SIDEBAR, withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit(TOGGLE_DEVICE, device)
  },
  setSize({ commit }, size) {
    commit(SET_SIZE, size)
  },
  setTableHeight({ commit }, tableHeight) {
    commit(SET_TABLE_HTIGHT, tableHeight)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
