import { createMutator, Utils } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const mutations = {
  create: {
    name: 'createMovie',

    check(user) {
      if (!user) return false;
      return Users.canDo(user, 'movie.create');
    },

    mutation(root, args, context) {
      const { data: document } = args;

      Utils.performCheck(this.check, context.currentUser, document);

      return createMutator({
        collection: context.Movies,
        document: document,
        currentUser: context.currentUser,
        validate: true,
        context
      });
    }
  },
  update: {
    name: 'updateMovie',

    check(user, document) {
      if (!user || !document) return false;
      return Users.owns(user, document)
        ? Users.canDo(user, 'movie.update.own')
        : Users.canDo(user, `movie.update.all`);
    },

    mutation(root, { selector, data }, context) {
      const document = context.Movies.findOne({
        _id: selector.documentId || selector._id
      });
      Utils.performCheck(this.check, context.currentUser, document);

      return updateMutator({
        collection: context.Movies,
        selector: selector,
        data: data,
        currentUser: context.currentUser,
        validate: true,
        context
      });
    }
  },

  delete: {
    name: 'deleteMovie',

    check(user, document) {
      if (!user || !document) return false;
      return Users.owns(user, document)
        ? Users.canDo(user, 'movie.delete.own')
        : Users.canDo(user, `movie.delete.all`);
    },

    mutation(root, { selector }, context) {
      const document = context.Movies.findOne({
        _id: selector.documentId || selector._id
      });
      Utils.performCheck(this.check, context.currentUser, document);

      return deleteMutator({
        collection: context.Movies,
        selector: selector,
        currentUser: context.currentUser,
        validate: true,
        context
      });
    }
  }
};

export default mutations;
