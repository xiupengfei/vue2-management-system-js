/*
 * @Descripttion:
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-10-08 14:59:46
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2021-10-08 18:52:55
 */
import store from '@/store'
import { superAdminRoleNames } from '@/settings'

export default {
  // el, binding, vnode
  inserted(el, binding) {
    const { value } = binding
    const { roles, permissions } = store.getters

    if (Array.isArray(value) && value.length > 0) {
      const permissionPermissions = value

      const isSuperAdmin = roles.some((role) => superAdminRoleNames.includes(role))
      if (!isSuperAdmin) {
        const hasPermission = permissions.some((permission) => {
          return permissionPermissions.includes(permission)
        })
        if (!hasPermission) {
          if (binding.modifiers.enable) {
            el.className += ' is-disabled'
          } else {
            el.parentNode && el.parentNode.removeChild(el)
          }
        }
      }
    } else {
      throw new Error(`需要权限! 例如: v-permission="['user:get']"`)
    }
  },
}
