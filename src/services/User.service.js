const { User } = require('../models');
const { tokenGenerate } = require('../middlewares/Auth');

const createUser = async (
displayName, 
  email,
  password, 
  image,
) => {
  const newUser = await User.create({ displayName, 
    email,
    password, 
    image });

  if (!newUser) {
    return ({ message: 'Não foi possível criar um novo usuario' });
  }

  const token = tokenGenerate(newUser.displayName, newUser.email, newUser.id);
  return ({ token });
};

const getAllUsers = async () => {
  const allUsers = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  if (!allUsers.length) {
    return ({ message: 'Nenhum usuário encontrado' });
  }
  return allUsers;
};

const getUserById = async (id, res) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return res.status(404).json({
      message: 'User does not exist',
    });
  }

  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};