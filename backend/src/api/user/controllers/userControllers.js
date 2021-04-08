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

