const { verifyToken } = require('../middlewares/Auth');
const { BlogPost, PostCategory, Category, User } = require('../models');

const createBlogPost = async (title, content, categoryIds, authorization) => {
  const categIds = categoryIds;
  const { id } = verifyToken(authorization);
  const newPost = await BlogPost.create({ title, content, userId: id });

  await Promise.all(categIds.map((categ) => PostCategory
  .create({ postId: newPost.id, categoryId: categ })));
  return { statusCode: 201, response: newPost };
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: 'password' },
    },
    { model: Category,
    as: 'categories',
    through: { attributes: [] },
  },
    ],
  });
  console.log(posts[0]);
  return { statusCode: 200, response: posts };
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: 'password' },
    },
    { model: Category,
    as: 'categories',
    through: { attributes: [] },
  },
    ],
  });
  if (!post) return { statusCode: 404, response: { message: 'Post does not exist' } };
  return { statusCode: 200, response: post };
};

module.exports = {
  createBlogPost,
  getAllPosts,
  getPostById,
};