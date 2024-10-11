import styled from 'styled-components';

export const TitleSession = styled.h1`
  text-align: center;
`;

export const ContainerForm = styled.div`
  display: flex;
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
      width: 35rem;
      margin-left: 5%;
  }

   & button {
      background: #0059ca;
      border: none;
      height: 60px;
      border-radius: 8px;
      color: #fff;
      font-size: 20px;
      letter-spacing: 2px;
      margin-top: 5px;
      margin-left: 5%;
      width: 35rem;
    }

   & ul li {
      border: 1px solid #777;
      border-radius: 8px;
      margin-bottom: 10px;
      padding: 10px;
    }
`;

export const ListForm = styled.li`
    border: 1px solid #777;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 10px;
    color: #fff;
    font-size: 18px;
    background: linear-gradient(79.8deg, rgb(101, 132, 154) 3.2%, rgb(160, 197, 201) 89.1%);
    cursor: pointer;
}
`;

export const ButtonForm = styled.button`
    height: 40px;
    width: 75px;
    margin-top: 10px;
    border: none;
    border-radius: 8px;
    background: radial-gradient(circle at 10% 20%, rgb(7, 121, 222) 0%, rgb(20, 72, 140) 90%);
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    margin-left: 10px;
}
`;
export const ButtonDeleteAccont = styled.button`
    height: 40px;
    width: 120px;
    margin-top: 10px;
    border: none;
    border-radius: 8px;
    background: radial-gradient(circle at 10% 20%, rgb(7, 121, 222) 0%, rgb(20, 72, 140) 90%);
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    margin-left: 10px;
}
`;
export const TitleContacts = styled.h1`
    text-align: center;
    margin-bottom: 15px;
    margin-top: 30px;
}
`;

export const ButtonOpenModal = styled.button`
    margin-top: 30px;
    height: 70px;
    width: 126px;
    border: none;
    font-size: 16px;
    font-weight: 700;
    background: radial-gradient(circle at 10% 20%, rgb(7, 121, 222) 0%, rgb(20, 72, 140) 90%);
    color: #fff;
    border-radius: 8px;
    margin-left: 10%;
}
`;