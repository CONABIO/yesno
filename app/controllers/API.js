module.exports = {
  layout: false,
  inject: {
    allEntries: $ => $.models.Entry.findAll().map(entry => entry.get()),
  },
  methods: {
    entries($) {
      $.resp_body = $.allEntries;
    },
  },
};
