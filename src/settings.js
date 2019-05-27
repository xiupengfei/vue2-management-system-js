/**
 *  const ADMIN = 'admin' // 超级管理员权限
    const SYSTEM = 'system' // 系统管理员权限
    const MANAGER = 'manager' // 运营管理权限
    const LEADER = 'leader' // 业务组长权限
    const HR = 'hr' // 人事权限
    const DEFAULT = 'default' // 普通用户权限
    const SUPER_ADMIN = [ADMIN, SYSTEM] // 所有权限
 */

module.exports = {
  title: '禾泰综合管理系统',
  version: '0.0.1',
  /**
   * @type {boolean} true | false
   * @description 是否显示设置右面板
   */
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description 是否需要TagsView
   */
  tagsView: false,

  /**
   * @type {boolean} true | false
   * @description 是否固定header, 此功能不能与AppManin中el-scrollbar共存
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description 是否显示Logo
   */
  sidebarLogo: true,

  /**
   * @type {object} []
   * @description 超级管理员角色名称, 超级管理员拥有系统所有操作权限
   */
  superAdminRoleNames: ['admin', 'system'],

  /**
   * @type {string} 'session' | 'local'
   * @description 存储级别, 默认: local
   */
  storageLevel: 'local',
  /**
   * @type {RegExp}
   * @description 密码规则验证
   */
  password_regex: /^(?=^.{6,20}$)(?=(?:.*?\d){1})(?=(?:.*?[a-z]){1})(?=(?:.*?[A-Z]){1})(?!.*\s)[0-9a-zA-Z!@#$%*()_+^&?.]*$/
}
