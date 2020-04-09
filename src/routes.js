const express = require('express');

// Project modules
const AuthController = require('./modules/authentication/controller/AuthController');
const UserController = require('./modules/user/controller/UserController');
const CompanyController = require('./modules/company/controller/CompanyController');
const AddressController = require('./modules/address/controller/AddressController');
const TechController = require('./modules/tech/controller/TechController');

const routes = express.Router();

routes.get('/api/users', UserController.user.handler.index);
routes.post('/api/users', UserController.user.validations, UserController.user.handler.save);

routes.get('/api/users/:user_id/addresses', AddressController.address.handler.index);
routes.post('/api/users/:user_id/addresses', AddressController.address.validations, AddressController.address.handler.save);
routes.delete('/api/users/:user_id/addresses/:address_id', AddressController.address.handler.delete);

routes.get('/api/users/:user_id/techs', TechController.index);
routes.post('/api/users/:user_id/techs', TechController.save);
routes.delete('/api/users/:user_id/techs', TechController.delete);

routes.post('/api/auth/login', AuthController.auth.validations, AuthController.auth.handler.authenticate);

routes.get('/api/companies', CompanyController.index);
routes.post('/api/companies', CompanyController.save);

module.exports = routes;