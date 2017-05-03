module.exports = {
  $schema: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        allowNull: true,
        primaryKey: true,
      },
      ref: {
        type: 'string',
      },
    },
    required: ['id', 'ref'],
  },
};
