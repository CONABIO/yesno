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
      root: {
        type: 'boolean',
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
    required: ['id', 'ref', 'root', 'likes', 'dislikes', 'avgQuality'],
  },
};
