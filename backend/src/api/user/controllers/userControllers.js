const { check } = require("express-validator");
const userRepository = require("../repository/userRepository");
const responses = require("../../common/responses/responses");

const {
  getErrosFromRequestValidation,
} = require("../../shared/errors/errorBuilder");

const UserModel = require("./userModel");




exports.get_user = async (req, res) => {
  try {
    const userSearch = await userRepository.getUser(req.params.id);
    if (userSearch) {
      return responses.response(res, {
        status: 200,
        message: "Sucesso ao trazer Usuário!",
        value: userSearch
          ? userSearch.map(
            (user) =>
              new UserModel(
                user.id,
                user.name,
                user.email,
                user.password,
                user.cep,
                user.cpf,
                user.endereco,
                user.dataNascimento,
                user.telefone,
                user.celular,
                user.position,
                user.active
              )
          )
          : null,
      });
    } else {
      return responses.response(res, {
        status: 500,
        message: "Falha ao trazer Usuário!",
      });
    }
  } catch (err) {
    return responses.response(res, {
      status: 500,
      message: "Falha ao trazer Usuário!",
    });
  }
};

exports.create_user = async (req, res, next) => {
  try {
    await configureCheckForName(req);
    await configureCheckForEmail(req);
    await configureCheckForPosition(req);

    const validationError = await getErrosFromRequestValidation(req);

    if (validationError) {
      return next(validationError);
    }

    const userEmail = await userRepository.getUserByEmail(req.body.email);

    if (userEmail)
      return next(new BadRequestError("Já existe um usuário com este email!"));

    const userCRM = await userRepository.getUserByCRM(req.body.crm);

    if (userCRM)
      return next(
        new BadRequestError("Já existe um usuário com este CRM Cadastrado!")
      );

    const newUser = await userRepository.createUser(
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.position,
      req.body.cep,
      req.body.endereco,
      req.body.cpf,
      req.body.dataNascimento,
      req.body.telefone,
      req.body.celular,
      req.body.active
    );
    if (newUser) {
      return responses.response(res, {
        status: 201,
        message: "Sucesso ao criar Usuário!",
      });
    }
    return next(new Error("Falha ao criar o Usuário!"));
  } catch (err) {
    return next(new Error("Falha ao criar o Usuário!"));
  }
};
