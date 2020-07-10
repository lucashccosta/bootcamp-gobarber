import React from 'react';
import { Container } from './styles';
import { ToastMessage, useToast } from '../../hooks/toast';
import Toast from './Toast';

interface ToastProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastProps> = ({ messages }) => {
    return (
        <Container>
            {messages.map(message => (
                <Toast 
                    key={message.id} 
                    message={message}>
                </Toast>
            ))}
        </Container>
    );
};

export default ToastContainer;