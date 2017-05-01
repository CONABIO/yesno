module.exports = {
  layout: false,
  methods: {
    entries($) {
      $.resp_body = $.models.Entry
        .findAll({
          where: {
            root: true,
          },
        })
        .map(entry => entry.get());
    },
    aggregate($) {
      return $.models.Entry
        .create({
          ref: $.params.ref,
          likes: $.params.likes,
          dislikes: $.params.dislikes,
          avgQuality: $.params.avgQuality,
        })
        .then(result => {
          $.resp_body = result;
        });
    },
  },
};
