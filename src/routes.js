const express = require("express");

const UserController = require("./controllers/UserController");
const AddressController = require("./controllers/AddressController");
const TechController = require("./controllers/TechController");
const AuthController = require("./controllers/AuthController");

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.save);

routes.get("/users/:user_id/addresses", AddressController.index);
routes.post("/users/:user_id/addresses", AddressController.save);

routes.get("/users/:user_id/techs", TechController.index);
routes.post("/users/:user_id/techs", TechController.save);
routes.delete("/users/:user_id/techs", TechController.delete);

routes.post('/auth/login', AuthController.login);

module.exports = routes;