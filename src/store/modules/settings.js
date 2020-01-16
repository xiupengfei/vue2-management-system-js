import defaultSettings from '@/settings'
import { CHANGE_SETTING } from '@/store/types/settings'
const { showSettings, showTagsView, sidebarLogo } = defaultSettings

const state = {
  showSettings,
  showTagsView,
  sidebarLogo
}

const mutations = {
  [CHANGE_SETTING]: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit(CHANGE_SETTING, data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

