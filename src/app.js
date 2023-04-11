const express = require('express');
const { userLogin } = require('./controllers/UserLogin.controller');
const { createUser, getAllUsers, getUserById } = require('./controllers/User.controller');
const { isNameValid, isEmailValid, 
  isPasswordValid, isEmailExists } = require('./middlewares/UserValidations');
  const { isCatNameValid } = require('./middlewares/CategoryValidations');
const { isTokenValid } = require('./middlewares/Auth');
const { createCateg, getAllCateg } = require('./controllers/Category.controller');
const { createBlogPost } = require('./controllers/BlogPost.controller');
const { isFieldsFilled, isCategIdValid } = require('./middlewares/BlogPostValidations');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', userLogin);
app.post('/user', isNameValid, isEmailValid, isEmailExists, isPasswordValid, createUser);
app.post('/categories', isTokenValid, isCatNameValid, createCateg);
app.post('/post', isFieldsFilled, isCategIdValid, isTokenValid, createBlogPost);

app.get('/user/:id', isTokenValid, getUserById);
app.get('/user', isTokenValid, getAllUsers);
app.get('/categories', isTokenValid, getAllCateg);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
