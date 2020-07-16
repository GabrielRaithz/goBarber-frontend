import React, { useRef, useCallback } from 'react';
import logoImg from '../../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import Input from '../../components/input';
import Button from '../../components/button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Container, Content, Background } from './styles'

import getValidaionErros from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';


interface signInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast, removeToast } = useToast();

  const handleSubmit = useCallback(
    async (data: signInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail valido'),
          password: Yup.string().required('Senha obrigatória')
        });

        await schema.validate(data, {
          abortEarly: false
        });

        await signIn({
          email: data.email,
          password: data.password
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const erros = getValidaionErros(error);
          formRef.current?.setErrors(erros);
        }

        addToast({
          type: 'info',
          title: 'erro na autenticação',
          description: 'erro econtrado na autenticação do usuário'
        });

      }
    }, [signIn, addToast]);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <Link to="/signup">
          <FiLogIn />
            Criar conta
        </Link>
      </Content>

      <Background />

    </Container>
  )
};

export default SignIn;
