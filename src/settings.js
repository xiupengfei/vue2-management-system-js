
module.exports = {
  title: '宏燊管理系统Demo',
  version: '0.0.1',
  /**
   * @type {boolean} true | false
   * @description 是否显示设置右面板
   */
  showSettings: false,
  /**
   * @type {string} 'large' | 'medium' | 'small'
   * @description 组件尺寸 默认: small
  */
  componentSize: 'small',
  /**
   * @type {boolean} true | false
   * @description 是否需要TagsView
   */
  showTagsView: true,

  /**
   * @type {boolean} true | false
   * @description 是否显示Logo
   */
  sidebarLogo: true,
  /**
   * @type {boolean} true | false
   * @description 是否显示系统时间
   */
  showSystemTime: false,

  /**
   * @type {object} []
   * @description 超级管理员角色名称, 超级管理员拥有系统所有操作权限
   */
  superAdminRoleNames: ['admin', 'root'],

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
