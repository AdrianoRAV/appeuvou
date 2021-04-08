const { getConnection, isSuccessfulCommand } = require("../../shared/dbConnection");
const sql = require("mssql");

const SQL_SELECT_QUERY = `SELECT Users.id, Users.name, Users.email, Users.crm, Users.especialidade, Users.crf, Users.cpf, Users.cep, Users.endereco, Users.dataNascimento, Users.telefone, Users.celular, UsersType.name as position, Users.active
FROM Users 
INNER JOIN UsersType ON Users.position_id = UsersType.id`;

const SQL_SELECT_USER = `${SQL_SELECT_QUERY} and Users.id=@id`;



exports.getUser = async (id) => {
  try {
    const dbClient = await getConnection();
    const request = dbClient.request();

    request.input("id", sql.UniqueIdentifier, id);

    const result = await request.query(SQL_SELECT_USER);
    return result.recordsets[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

