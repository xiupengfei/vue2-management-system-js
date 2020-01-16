import { SetStorate, GetStorate, ClearStorate } from './index'

const TokenKey = 'X-Auth-Token'

export const getToken = () => GetStorate(TokenKey)
export const setToken = token => SetStorate(TokenKey, token)
export const removeToken = () => ClearStorate(TokenKey)
