import { SetStorate, GetStorate, ClearStorate } from './index'

const TokenKey = 'X-Auth-Token'
const UserInfoKey = 'X-User-Info'
const RolesKey = 'X-Roles'

export const getToken = () => GetStorate(TokenKey)
export const setToken = token => SetStorate(TokenKey, token)
export const removeToken = () => ClearStorate(TokenKey)

export const getUserInfo = () => GetStorate(UserInfoKey)
export const setUserInfo = userinfo => SetStorate(UserInfoKey, userinfo)
export const clearUserInfo = () => ClearStorate(UserInfoKey)

export const getRoles = () => GetStorate(RolesKey)
export const setRoles = roles => SetStorate(RolesKey, roles)
export const clearToles = () => ClearStorate(RolesKey)
