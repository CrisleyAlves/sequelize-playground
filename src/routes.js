const express = require('express');

const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
const TechController = require('./controllers/TechController');
const AuthController = require('./controllers/AuthController');
const CompanyController = require('./controllers/CompanyController');

const routes = express.Router();

routes.get('/api/users', UserController.index);
routes.post('/api/users', UserController.save);

routes.get('/api/users/:user_id/addresses', AddressController.index);
routes.post('/api/users/:user_id/addresses', AddressController.save);

routes.get('/api/users/:user_id/techs', TechController.index);
routes.post('/api/users/:user_id/techs', TechController.save);
routes.delete('/api/users/:user_id/techs', TechController.delete);

routes.post('/api/auth/login', AuthController.login.validations, AuthController.login.handler);

routes.get('/api/companies', CompanyController.index);
routes.post('/api/companies', CompanyController.save);

module.exports = routes;