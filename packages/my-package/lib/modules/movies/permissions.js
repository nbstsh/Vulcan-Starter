import Users from 'meteor/vulcan:users';

const membersActions = ['movie.create', 'movie.update.own', 'movie.delete.own'];
Users.groups.members.can(membersActions);
