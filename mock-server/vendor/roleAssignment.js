
const roleAssignment = {
    hr: ['user:query', 'user:create', 'user:update', 'user:delete'],
    manager: ['job_number:query', 
              'job_number:create', 
              'job_number:update', 
              'job_number:delete',
              'business_group:query',
              'business_group:create',
              'business_group:update',
              'business_group:delete',
              'business:query',
              'business:create',
              'business:update',
              'business:delete'
    ],
    leader: [
              'business_group:query',
              'business_group:create',
              'business_group:update',
              'business_group:delete',
              'business:query',
              'business:create',
              'business:update',
              'business:delete',
              'business_ranking:query',
              'business_ranking:create',
              'business_ranking:update',
              'business_ranking:delete',
              'business_entering:query',
              'business_entering:create',
              'business_entering:update',
              'business_entering:delete'
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
