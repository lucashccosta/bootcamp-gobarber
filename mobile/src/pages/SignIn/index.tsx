import React, { useCallback, useRef } from 'react';
import { 
	Image, 
	KeyboardAvoidingView, 
	Platform, 
	ScrollView,
	TextInput
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { 
	Container, 
	Title, 
	ForgotPassword, 
	ForgotPasswordText, 
	CreateAccountButton, 
	CreateAccountButtonText 
} from './styles';

const SignIn: React.FC = () => {
	const navigation = useNavigation();
	const formRef = useRef<FormHandles>(null);
	const passwordInputRef = useRef<TextInput>(null);

	const handleSignIn = useCallback((data: object) => {
		console.log(data);
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

							<Button onPress={() => { 
								formRef.current?.submitForm() 
							}}>
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