import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { Container, Content } from './styles';

const Toast: React.FC = () => {
    return (
        <Container>
            <Content type="success">
                <FiAlertCircle size={20} />
                <div>
                    <strong>Aconteceu um erro</strong>
                    <p>Não foi possível fazer login na aplicação</p>
                </div>

                <button type="button">
                    <FiXCircle size={18} />
                </button>
            </Content>
        </Container>
    );
};

export default Toast;