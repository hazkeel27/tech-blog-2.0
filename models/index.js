const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'user_id', // This is the foreign key in the posts table
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id', // This is the foreign key in the comments table
  onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id', // This is the foreign key in the comments table
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post, Comment };