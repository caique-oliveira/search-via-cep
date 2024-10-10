import styled from 'styled-components';

export const TitleSession = styled.h1`
  text-align: center;
`;

export const ContainerForm = styled.div`
  display: grid;
  flex-direction: column;
  gap: 10px;
  grid-template-columns: 30% 70%;
`;

export const FormContacts = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px; 

  & input {
    height: 40px;
    border-radius: 8px;
    border: 1px solid #777;
    padding: 20px;
  }

   & button {
    background: #0059ca;
    border: none;
    height: 60px;
    border-radius: 8px;
    color: #fff;
    font-size: 20px;
    letter-spacing: 2px;
    margin-top: 20px;
    }
`;