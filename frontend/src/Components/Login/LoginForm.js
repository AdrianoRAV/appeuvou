import React, {useState, useEffect} from 'react';
import { Navigate } from "react-router-dom";

import axios from 'axios';
import { storeToken, getToken } from '../../services/auth';
import Button from '../Forms/CustomButton/CustomButton';
import CustomSnackbar from '../../GeneralComponents/Snackbar';
import { Link } from "react-router-dom";
import Input from '../Forms/Input/Input';
import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/CustomButton/Button.module.css';

const LoginForm = () => {

  const [tokenGuardado, setTokenGuardado] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setErrorEmail] = useState('');
  const [, setErrorPassword] = useState('');
  const [abreNotificacao, setAbreNotificacao] = useState(false);
  const [resultadoRequisicao, setResultadoRequisicao] = useState("success");
  const [mensagemDeResultado, setMensagemDeResultado] = useState('');

  useEffect(() => {
    getToken() && setTokenGuardado(true);
  },[])

  async function login(){
    const account = {
      email: email,
      password: password,

    }

    await axios.post(process.env.REACT_APP_API_URL+'/api/auth/login', account)
      .then( res => {
        storeToken(res.data.token);
        setTokenGuardado(true);
        setErrorEmail(true);
        setErrorPassword(true);
        abrirNotificacao(res.data.message, "success");
      })
      .catch( error => {
        let message = error.response.data.message;
        abrirNotificacao(message, "error");
        setErrorEmail(true);
        setErrorPassword(true);
      });
  }

  function fecharNotificacao(){
    setAbreNotificacao(false);
  };

  function abrirNotificacao(mensagemDeResultado, resultadoRequisicao){
    setAbreNotificacao(true);
    setResultadoRequisicao(resultadoRequisicao);
    setMensagemDeResultado(mensagemDeResultado);
  }
    

  return (
    tokenGuardado ?
    <Navigate to="/dashboard" /> :
    <React.Fragment>
      <CustomSnackbar 
        abreNotificacao={abreNotificacao}
        fecharNotificacao={fecharNotificacao}
        mensagemDeResultado={mensagemDeResultado}
        resultadoRequisicao={resultadoRequisicao}
      />
      <section className="animeLeft">
        <h1 className="title">Login</h1>
        <form className={styles.form}>
          <Input label="Email" type="text" name="email" onChange={({target}) => setEmail(target.value)}/>
          <Input label="Senha" type="password" name="password" onChange={({target}) => setPassword(target.value)} />
        </form>

        <Button onClick={login}>Fazer Login</Button>

        <Link className={styles.perdeu} to="/login/perdeu">
          Perdeu a Senha?
        </Link>
        <div className={styles.cadastro}>
          <h2 className={styles.subtitle}>Cadastre-se</h2>
          <p>Ainda não possui conta? Cadastre-se no site.</p>
          <Link className={stylesBtn.button} to="/login/criar">
            Cadastro
          </Link>
        </div>    
      </section> 
    </React.Fragment>
  );
}


export default LoginForm;

