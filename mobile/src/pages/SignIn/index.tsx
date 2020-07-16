import React, { useCallback, useRef } from 'react';
import { 
	Image, 
	KeyboardAvoidingView, 
	Platform, 
	ScrollView,
	TextInput,
	Alert
} from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Helpers from '../../utils/Helpers';

import { 
	Container, 
	Title, 
	ForgotPassword, 
	ForgotPasswordText, 
	CreateAccountButton, 
	CreateAccountButtonText 
} from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
	const navigation = useNavigation();
	const formRef = useRef<FormHandles>(null);
	const passwordInputRef = useRef<TextInput>(null);

	const handleSignIn = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória')
            });

            await schema.validate(data, {
                abortEarly: false //mostra todos os erros ao mesmo tempo
            });

            // await signIn({
            //     email: data.email,
            //     password: data.password
            // });

        }
        catch(err) {
            if(err instanceof Yup.ValidationError) {
                const errors = Helpers.getValidationErrors(err);
                formRef.current?.setErrors(errors);

                return;
            }
			
			Alert.alert(
				'Erro na autenticação', 
				'Ocorreu um erro ao fazer login. Verifique as credenciais.'
			);
        }
    }, []);

  	return (
		<>
			<KeyboardAvoidingView 
				style={{ flex: 1 }}
				behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
				enabled>
				
				<ScrollView 
					contentContainerStyle={{ flex: 1 }}
					keyboardShouldPersistTaps="handled"
				>
					<Container>
						<Image source={logoImg} />
						<Title>Faça seu login</Title>

						<Form 
							ref={formRef}
							onSubmit={handleSignIn}
						>

							<Input 
								autoCorrect={false}
								autoCapitalize="none"
								keyboardType="email-address"
								name="email" 
								icon="mail" 
								placeholder="E-mail"
								returnKeyType="next"
								onSubmitEditing={() => {
									passwordInputRef.current?.focus(); //acessa método focus do componente input por meio do ref
								}} />

							<Input 
								ref={passwordInputRef}
								name="password" 
								icon="lock" 
								placeholder="Senha" 
								secureTextEntry
								returnKeyType="send"
								onSubmitEditing={() => { 
									formRef.current?.submitForm() 
								}} />

							<Button onPress={() => { formRef.current?.submitForm() }}>
								Entrar
							</Button>

						</Form>

						<ForgotPassword onPress={() => {}}>
							<ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
						</ForgotPassword>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>

			<CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
				<Icon name="log-in" size={20} color="#ff9000" />
				<CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
			</CreateAccountButton>
		</>
  	);
}

export default SignIn;