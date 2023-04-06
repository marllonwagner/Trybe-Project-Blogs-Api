module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define(
    'BlogPost',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      content:DataTypes.STRING,
    },
    { 
      timestamps: true,
      createdAt: 'published',
      updatedAt: 'updated',
      tableName: 'blog_posts',
      underscored: true,
    },
  );

  BlogPosts.associate = (models) => {
    BlogPosts.belongsToMany(models.User, { foreignKey: 'user_id', as: 'users' });

    BlogPosts.hasMany(models.PostsCategories, { foreignKey: 'id', as: 'posts_categories' });
  };

  return BlogPosts;
};
