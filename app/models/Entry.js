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
      likes: {
        type: 'integer',
      },
      dislikes: {
        type: 'integer',
      },
      avgQuality: {
        type: 'number',
      },
    },
    required: ['id', 'ref', 'likes', 'dislikes', 'avgQuality'],
  },
};
