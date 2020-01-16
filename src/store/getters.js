const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  tableHeight: state => state.app.tableHeight,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  userinfo: state => state.user.userinfo,
  actions: state => state.user.actions,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  sidebarLogo: state => state.settings.sidebarLogo,
  showTagsView: state => state.settings.showTagsView
}
export default getters
