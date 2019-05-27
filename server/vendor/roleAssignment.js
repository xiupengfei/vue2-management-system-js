
const roleAssignment = {
  hr: ['user:query', 'user:create', 'user:update', 'user:delete'],
  manager: ['job_number:query',
    'job_number:create',
    'job_number:update',
    'job_number:delete',
    'businesses:query',
    'businesses:create',
    'businesses:update',
    'businesses:delete',
    'business:query',
    'business:create',
    'business:update',
    'business:delete',
    'business_overview:query',
    'business_overview:create',
    'business_overview:update',
    'business_overview:delete'
  ],
  leader: [
    'business_group:query',
    'business_group:create',
    'business_group:update',
    'business_group:delete',
    'business_ranking:query',
    'business_ranking:create',
    'business_ranking:update',
    'business_ranking:delete',
    'business_entering:query',
    'business_entering:create',
    'business_entering:update',
    'business_entering:delete',
    'business_overview:query',
    'business_overview:create',
    'business_overview:update',
    'business_overview:delete'
  ],
  default: [
    'business_ranking:query',
    'business_ranking:create',
    'business_ranking:update',
    'business_ranking:delete',
    'business_entering:query',
    'business_entering:create',
    'business_entering:update',
    'business_entering:delete'
  ]
}

module.exports = roleAssignment
