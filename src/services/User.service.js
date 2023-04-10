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

module.exports = {
  createUser,
};