const resolvers = {
  multi: {
    name: 'movies',
    resolver(root, args, context) {
      return { results: context.Movies.find().fetch() };
    }
  },
  single: {
    name: 'movie',

    async resolver(root, args, context) {
      const _id = args.input.selector.documentId || args.input.selector._id;
      const document = await context.Movies.findOne({ _id: _id });
      return {
        result: context.Users.restrictViewableFields(
          context.currentUser,
          context.Movies,
          document
        )
      };
    }
  }
};

export default resolvers;
