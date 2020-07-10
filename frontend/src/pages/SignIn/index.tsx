import React, { useCallback, useRef, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import logo from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Helpers from '../../utils/Helpers';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { signIn } = useAuth();
    const { addToast } = useToast();

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória')
            });

            await schema.validate(data, {
                abortEarly: false //mostra todos os erros ao mesmo tempo
            });

            await signIn({
                email: data.email,
                password: data.password
            });
        }
        catch(err) {
            if(err instanceof Yup.ValidationError) {
                const errors = Helpers.getValidationErrors(err);
                formRef.current?.setErrors(errors);

                return;
            }
            
            addToast({
                type: 'error',
                title: 'Erro na autenticação!',
                description: 'Ocorreu um erro ao fazer login. Verifique as credenciais.'
            });
        }
    }, [signIn, addToast]);

    return (
        <Container>
            <Content>
                <img src={logo} alt="GoBarber" />
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password" type="password" icon={FiLock} placeholder="Senha"/>
                    <Button type="submit">Entrar</Button>
                    <a href="javascript:void(0)">Esqueci minha senha</a>
                </Form>

                <a href="javascript:void(0)">
                    <FiLogIn />
                    Criar conta
                </a>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;