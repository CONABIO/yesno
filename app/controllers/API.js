module.exports = {
  layout: false,
  methods: {
    sources($) {
      $.resp_body = $.models.Source
        .findAll()
        .map(x => x.get());
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
