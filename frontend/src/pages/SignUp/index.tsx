import React from 'react';
import { FiLogIn, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import logo from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
    function handleSubmit(data: object): void {
        console.log(data);
    }

    return (
        <>
            <Container>
                <Content>
                    <img src={logo} alt="GoBarber" />
                    <Form onSubmit={handleSubmit}>
                        <h1>Faça seu cadastro</h1>
                        <Input name="name" icon={FiUser} placeholder="Nome" />
                        <Input name="email" type="email" icon={FiMail} placeholder="E-mail" />
                        <Input name="password" type="password" icon={FiLock} placeholder="Senha" />
                        <Button type="submit">Cadastrar</Button>
                    </Form>

                    <a href="javascript:void(0)">
                        <FiLogIn />
                        Fazer login
                    </a>
                </Content>
                <Background />
            </Container>
        </>
    );
}

export default SignUp;