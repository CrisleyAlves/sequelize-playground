const express = require('express');

const AddressController = require('./controllers/AddressController');
const TechController = require('./controllers/TechController');
const CompanyController = require('./modules/company/controller/CompanyController');

// Project modules
const AuthController = require('./modules/authentication/controller/AuthController');
const UserController = require('./modules/user/controller/UserController');


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