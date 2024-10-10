import styled from 'styled-components';

export const FormLogin = styled.form`
    
    & input {
      width: 100%;
      height: 40px;
      border-radius: 8px;
      border: 1px solid #777;
      padding: 20px;
      margin: 10px; 
    }

    & button {
      width: 100%;
      height: 40px;
      margin: 10px;
      border-radius: 8px;
      border: 1px solid #777;
      background: #0059ca;
      border: none;
      color: #fff;
      font-size: 20px;
      letter-spacing: 2px;
      margin-top: 20px;
    }
`;

export const ContainerLogin = styled.div`
    margin: 0 auto;
    display: block;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 50%;
    margin-top: 5%;

    & a {
        color: #0059ca;
        font-weight: 600;
    }
`;