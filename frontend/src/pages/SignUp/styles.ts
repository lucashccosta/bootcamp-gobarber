import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import backgroundImg from '../../assets/sign-up-background.png';

const appearFromLeftAnimation = keyframes`
    from {
        opacity: 0;
        transform: translateX(-50px);
    },
    to {
        opacity: 1,
        transform: translateX(0);
    }
`;

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 600px;
`;

export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    animation: ${appearFromLeftAnimation} 1s;

    form {
        margin: 40px 0;
        width: 340px;
        text-align: center;

        h1 {
            margin-bottom: 24px;
        }

        a {
            color: #F4EDE8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
                color: ${shade(0.2, '#F4EDE8')};
            }
        }
    }

    > a {
            color: #FF9000;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;
            display: flex;
            align-items: center;

            &:hover {
                color: ${shade(0.2, '#FF9000')};
            }

            svg {
                margin-right: 16px;
            }
        }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${backgroundImg}) no-repeat center;
    background-size: cover;
`;