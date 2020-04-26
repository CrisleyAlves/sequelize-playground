const express = require('express');

// Project modules
const AuthController = require('./controllers/authentication/AuthController');
const UserController = require('./controllers/user/UserController');
const CompanyController = require('./controllers/company/CompanyController');
const AddressController = require('./controllers/address/AddressController');
const TechController = require('./controllers/tech/TechController');

// Middlewares
const { checkRequestData } = require('./middlewares');

const routes = express.Router();

routes.get('/api/users', UserController.user.handler.index);
routes.post('/api/users', UserController.user.validations, checkRequestData, UserController.user.handler.save);

routes.get('/api/users/:user_id/addresses', AddressController.address.handler.index);
routes.post('/api/users/:user_id/addresses', AddressController.address.validations, checkRequestData, AddressController.address.handler.save);
routes.delete('/api/users/:user_id/addresses/:address_id', AddressController.address.handler.delete);

routes.get('/api/users/:user_id/techs', TechController.tech.handler.index);
routes.post('/api/users/:user_id/techs', TechController.tech.validations, checkRequestData, TechController.tech.handler.save);
routes.delete('/api/users/:user_id/techs', TechController.tech.handler.delete);

routes.post('/api/auth/login', AuthController.auth.validations, checkRequestData, AuthController.auth.handler.authenticate);

routes.get('/api/companies', CompanyController.company.handler.index);
routes.post('/api/companies', CompanyController.company.validations, checkRequestData, CompanyController.company.handler.save);

module.exports = routes;