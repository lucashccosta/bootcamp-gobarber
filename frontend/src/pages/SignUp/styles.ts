import styled from 'styled-components';
import { shade } from 'polished';
import backgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    place-content: center;    
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;

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