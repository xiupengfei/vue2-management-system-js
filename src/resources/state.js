/**
 * 状态配置
 * @description 状态配置
 */

// json对象转数组
const getOptions = obj => {
  const arr = []
  Object.entries(obj).map(([key, label]) => {
    arr.push({ key: +key, label })
  })
  return arr
}

const baseColors = {
  1: '',
  2: 'danger'
}

// ******************************用户性别******************************
const _genderState = {
  1: '男',
  2: '女'
}

export const genderState = {
  states: _genderState,
  options: getOptions(_genderState)
}

// ******************************用户在职、离职等状态******************************
const _userState = {
  1: '在职',
  2: '离职',
  3: '实习',
  4: '试用'
}
export const userState = {
  states: _userState,
  options: getOptions(_userState)
}

// ******************************业务状态******************************
const _businessState = {
  1: '运行中',
  2: '暂停',
  3: '停止'
}

// 业务状态对应tag颜色
const _businessStateColors = {
  1: '',
  2: 'info',
  3: 'danger'
}

export const businessState = {
  states: _businessState,
  colors: _businessStateColors,
  options: getOptions(_businessState)
}

// ******************************移动工号******************************
const _jobNumberState = {
  1: '启用',
  2: '禁用'
}
export const jobNumberState = {
  states: _jobNumberState,
  colors: baseColors,
  options: getOptions(_jobNumberState)
}

// ******************************业务数据状态******************************
const _businessDataState = {
  1: '成功',
  2: '失败'
}

export const businessDataState = {
  states: _businessDataState,
  colors: baseColors,
  options: getOptions(_businessDataState)
}

// ******************************业务预数据状态******************************
const _preBusinessDataState = {
  1: '未处理',
  2: '已处理',
  3: '处理中'
}
export const preBusinessDataState = {
  states: _preBusinessDataState,
  colors: baseColors,
  options: getOptions(_preBusinessDataState)
}
