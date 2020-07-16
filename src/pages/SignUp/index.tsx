import React, { useCallback, useRef } from 'react';
import { Container, Content, Background } from './styles'
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft, FiMail, FiUser, FiLock } from "react-icons/fi";
import Input from '../../components/input';
import Button from '../../components/button';
import { FormHandles } from '@unform/core';
import getValidaionErros from '../../utils/getValidationErrors';
import * as Yup from 'yup';

import { Form } from '@unform/web';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail valido'),
        password: Yup.string().min(6, 'No minimo 6 digitos')
      });

      await schema.validate(data, {
        abortEarly: false
      });
    } catch (error) {
      const erros = getValidaionErros(error);
      formRef.current?.setErrors(erros);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="create">
          <FiArrowLeft />
        Voltar para logon
      </a>
      </Content>

    </Container>
  );

};

export default SignUp;
