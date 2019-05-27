/**
 * 操作权限映射路由表
 * @description 操作 -> 路由name
 */

const mappings = {
  // 人事管理
  'user:query': ['user', 'user_index'],
  'user:create': ['user', 'user_index'],
  'user:update': ['user', 'user_index'],
  'user:delete': ['user', 'user_index'],
  // 系统管理
  'group:query': ['system', 'system_group'],
  'group:create': ['system', 'system_group'],
  'group:update': ['system', 'system_group'],
  'group:delete': ['system', 'system_group'],
  'role:query': ['system', 'role'],
  'role:create': ['system', 'role'],
  'role:update': ['system', 'role'],
  'role:delete': ['system', 'role'],
  // 运营管理
  'business:query': ['operator', 'business'],
  'business:create': ['operator', 'business'],
  'business:update': ['operator', 'business'],
  'business:delete': ['operator', 'business'],
  'businesses:query': ['operator', 'businesses'],
  'businesses:create': ['operator', 'businesses'],
  'businesses:update': ['operator', 'businesses'],
  'businesses:delete': ['operator', 'businesses'],
  'job_number:query': ['operator', 'job_number'],
  'job_number:create': ['operator', 'job_number'],
  'job_number:update': ['operator', 'job_number'],
  'job_number:delete': ['operator', 'job_number'],
  // 业务组管理 + 个人管理
  'business_group:query': ['business_group', 'business_group_index'],
  'business_group:create': ['business_group', 'business_group_index'],
  'business_group:update': ['business_group', 'business_group_index'],
  'business_group:delete': ['business_group', 'business_group_index'],
  'business_overview:query': ['business_overview', 'business_overview_index'],
  'business_overview:create': ['business_overview', 'business_overview_index'],
  'business_overview:update': ['business_overview', 'business_overview_index'],
  'business_overview:delete': ['business_overview', 'business_overview_index'],
  // 个人管理
  'business_ranking:query': ['business_ranking', 'business_ranking_index'],
  'business_ranking:create': ['business_ranking', 'business_ranking_index'],
  'business_ranking:update': ['business_ranking', 'business_ranking_index'],
  'business_ranking:delete': ['business_ranking', 'business_ranking_index'],
  'business_entering:query': ['business_entering', 'business_entering_index'],
  'business_entering:create': ['business_entering', 'business_entering_index'],
  'business_entering:update': ['business_entering', 'business_entering_index'],
  'business_entering:delete': ['business_entering', 'business_entering_index']
}

const getRouterNames = (actions = []) => {
  const res = []
  actions.map(action => {
    if (mappings.hasOwnProperty(action)) {
      res.push(...mappings[action])
    }
  })
  return [...new Set(res)]
}

export { mappings, getRouterNames }
