import React from 'react';
import { FiLogIn, FiMail, FiLock, FiUser } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
    <>
        <Container>
            <Content>
                <img src={logo} alt="GoBarber" />
                <form>
                    <h1>Faça seu cadastro</h1>
                    <Input name="name" icon={FiUser} placeholder="Nome" />
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password" type="password" icon={FiLock} placeholder="Senha"/>
                    <Button type="submit">Cadastrar</Button>
                </form>

                <a href="javascript:void(0)">
                    <FiLogIn />
                    Fazer login
                </a>
            </Content>
            <Background />
        </Container>
    </>
);

export default SignUp;