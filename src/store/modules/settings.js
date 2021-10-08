/*
 * @Descripttion:
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-10-08 14:59:47
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2021-10-08 18:59:24
 */
import defaultSettings from '@/settings'
import { CHANGE_SETTING } from '@/store/types/settings'
const { showSettings, showTagsView, sidebarLogo } = defaultSettings

const state = {
  showSettings,
  showTagsView,
  sidebarLogo,
}

const mutations = {
  [CHANGE_SETTING]: (state, { key, value }) => {
    if (Reflect.has(state, key)) {
      state[key] = value
    }
  },
}

const actions = {
  changeSetting({ commit }, data) {
    commit(CHANGE_SETTING, data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
