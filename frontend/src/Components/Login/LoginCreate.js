import React, { useState } from "react";

import Button from "../Forms/CustomButton/CustomButton";
import CustomSnackbar from "../../GeneralComponents/Snackbar";
import { Link } from "react-router-dom";
import Input from "../Forms/Input/Input";
import Modal from "@material-ui/core/Modal";
import styles from "./LoginCreate.module.css";
import { Store } from "../../Infrastructure/Store/Store";
import stylesBtn from "../Forms/CustomButton/Button.module.css";
import { doCreateUser } from "../../Infrastructure/Actions/User";

const LoginCreate = () => {
  const { dispatch } = React.useContext(Store);
  const [user, setUser] = useState([
    {
      name: "",
      email: "",
      password: "",
      cep: "",
      endereco: "",
      dataNascimento: "",
      cpf: "",
      celular: "",
      telefone: "",
      doctor: "",
    },
  ]);
  const [abreNotificacao, setAbreNotificacao] = useState(false);
  const [resultadoRequisicao, setResultadoRequisicao] = useState("success");
  const [mensagemDeResultado, setMensagemDeResultado] = useState("");
  const [firstStep, setFirstStep] = useState(true);
  const [secondStep, setSecondStep] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  function fecharNotificacao() {
    setAbreNotificacao(false);
  }

  function abrirNotificacao(mensagemDeResultado, resultadoRequisicao) {
    setAbreNotificacao(true);
    setResultadoRequisicao(resultadoRequisicao);
    setMensagemDeResultado(mensagemDeResultado);
  }

  const formatInputDate = (data) => {
    var result = new Date(data);
    return `${result.getFullYear()}-${`00${result.getMonth() + 1}`.slice(
      -2
    )}-${`00${result.getDate()}`.slice(-2)}`;
  };

  const changeUser = (event) => {
    switch (event.target.name) {
      case "name":
        return setUser({
          name: event.target.value,
          email: user.email,
          password: user.password,
          cep: user.cep,
          endereco: user.endereco,
          dataNascimento: user.dataNascimento,
          cpf: user.cpf,
          celular: user.celular,
          telefone: user.telefone,
          doctor: user.doctor,
        });
      case "email":
        return setUser({
          name: user.name,
          email: event.target.value,
          password: user.password,
          cep: user.cep,
          endereco: user.endereco,
          dataNascimento: user.dataNascimento,
          cpf: user.cpf,
          celular: user.celular,
          telefone: user.telefone,
          doctor: user.doctor,
        });
      case "password":
        return setUser({
          name: user.name,
          email: user.email,
          password: event.target.value,
          cep: user.cep,
          endereco: user.endereco,
          dataNascimento: user.dataNascimento,
          cpf: user.cpf,
          celular: user.celular,
          telefone: user.telefone,
          doctor: user.doctor,
        });
      case "cep":
        return setUser({
          name: user.name,
          email: user.email,
          password: user.password,
          cep: event.target.value,
          endereco: user.endereco,
          dataNascimento: user.dataNascimento,
          cpf: user.cpf,
          celular: user.celular,
          telefone: user.telefone,
          doctor: user.doctor,
        });
      case "endereco":
        return setUser({
          name: user.name,
          email: user.email,
          password: user.password,
          cep: user.cep,
          endereco: event.target.value,
          dataNascimento: user.dataNascimento,
          crf: user.crf,
          cpf: user.cpf,
          celular: user.celular,
          telefone: user.telefone,
          doctor: user.doctor,
        });
      case "dataNascimento":
        let tagText = event.target.value;
        tagText = tagText.replace(/-/g, "/");
        return setUser({
          name: user.name,
          email: user.email,
          password: user.password,
          cep: user.cep,
          endereco: user.endereco,
          dataNascimento: new Date(`${tagText}`),
          cpf: user.cpf,
          celular: user.celular,
          telefone: user.telefone,
          doctor: user.doctor,
        });
      case "cpf":
        return setUser({
          name: user.name,
          email: user.email,
          password: user.password,
          cep: user.cep,
          endereco: user.endereco,
          dataNascimento: user.dataNascimento,
          cpf: event.target.value,
          celular: user.celular,
          telefone: user.telefone,
          doctor: user.doctor,
        });
      case "celular":
        return setUser({
          name: user.name,
          email: user.email,
          password: user.password,
          cep: user.cep,
          endereco: user.endereco,
          dataNascimento: user.dataNascimento,
          cpf: user.cpf,
          celular: event.target.value,
          telefone: user.telefone,
          doctor: user.doctor,
        });
      case "telefone":
        return setUser({
          name: user.name,
          email: user.email,
          password: user.password,
          cep: user.cep,
          endereco: user.endereco,
          dataNascimento: user.dataNascimento,
          cpf: user.cpf,
          celular: user.celular,
          telefone: event.target.value,
          doctor: user.doctor,
        });
      case "doctor":
        return setUser({
          name: user.name,
          email: user.email,
          password: user.password,
          cep: user.cep,
          endereco: user.endereco,
          dataNascimento: user.dataNascimento,
          cpf: user.cpf,
          celular: user.celular,
          telefone: user.telefone,
          doctor: event.target.value,
        });
      default:
        break;
    }
  };

  function handleFirstStep() {
    return (
      <>
        <div className={styles.twoLines}>
          <Input
            label="Nome"
            type="text"
            name="name"
            required="required"
            onChange={changeUser}
            value={user.name}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            required="required"
            onChange={changeUser}
            value={user.email}
          />
        </div>
        <div className={styles.twoLines}>
          <Input
            label="Senha"
            type="password"
            name="password"
            required="required"
            onChange={changeUser}
            value={user.password}
          />
          <Input
            label="Data de nascimento"
            type="date"
            name="dataNascimento"
            defaultValue={formatInputDate(user.dataNascimento)}
            onChange={changeUser}
          />
        </div>
      </>
    );
  }

  function handleSecondStep() {
    return (
      <>
        <div className={styles.twoLines}>
          <Input
            label="CPF"
            type="text"
            name="cpf"
            required="required"
            onChange={changeUser}
            value={user.cpf}
          />
          <Input
            label="CEP"
            type="text"
            name="cep"
            required="required"
            onChange={changeUser}
            value={user.cep}
          />
        </div>
        <div className={styles.twoLines}></div>
        <Input
          label="Endereço completo(Com número e complemento se houver)"
          type="text"
          name="endereco"
          onChange={changeUser}
          value={user.endereco}
        />
        <div className={styles.twoLines}>
          <Input
            label="Celular"
            type="text"
            name="celular"
            required="required"
            onChange={changeUser}
            value={user.celular}
          />
          <Input
            label="Telefone"
            type="text"
            name="telefone"
            onChange={changeUser}
            value={user.telefone}
          />
        </div>
      </>
    );
  }
  function onClose() {
    setOpenModal(false);
  }
  function nextStep() {
    setFirstStep(false);
    setSecondStep(true);
  }

  function previousStep() {
    setFirstStep(true);
    setSecondStep(false);
  }

  async function handleRegisterUser(e) {
    e.preventDefault();
    const dataUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      position: user.doctor,
      dataNacimento: user.dataNascimento,
      cep: user.cep,
      endereco: user.endereco,
      cpf: user.cpf,
      celular: user.celular,
      telefone: user.telefone,
    };
    try {
      await doCreateUser(dispatch, dataUser).then(async (res) => {
        setUser({
          name: "",
          email: "",
          password: "",
          cep: "",
          endereco: "",
          dataNascimento: "",
          cpf: "",
          telefone: "",
          celular: "",
          active: "",
        });
        if (res.status === 201) {
          abrirNotificacao(res.data.message, "success");
        } else {
          abrirNotificacao(res.data.message, "error");
        }
      });
    } catch {
      abrirNotificacao("Erro ao cadastrar Usuário!", "error");
    }
  }

  return (
    <React.Fragment>
      <CustomSnackbar
        abreNotificacao={abreNotificacao}
        fecharNotificacao={fecharNotificacao}
        mensagemDeResultado={mensagemDeResultado}
        resultadoRequisicao={resultadoRequisicao}
      />
      <section className="animeLeft">
        <h1 className="title">Cadastre-se</h1>
        <form className={styles.form}>
          <div className={styles.content}>
            {firstStep && handleFirstStep()}
            {secondStep && handleSecondStep()}
          </div>
        </form>

        {firstStep && (
          <Button onClick={nextStep} style={{ margin: "0.5em 0 1em 0" }}>
            Avançar
          </Button>
        )}
        {secondStep && (
          <div className={styles.twoLines}>
            <Button onClick={previousStep}>Voltar</Button>
            <Button onClick={handleRegisterUser}>Cadastrar</Button>
          </div>
        )}
        <div className={styles.cadastro}>
          <h2 className={styles.subtitle}>Login</h2>
          <p style={{ margin: "1em 0 2em 0" }}>Já possui conta? Faça Login.</p>
          <Link className={stylesBtn.button} to="/login">
            Login
          </Link>
        </div>
      </section>
    </React.Fragment>
  );
};

export default LoginCreate;
