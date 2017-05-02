module.exports = {
  $schema: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        primaryKey: true,
      },
      ref: {
        type: 'string',
      },
    },
    required: ['id', 'ref'],
  },
};
