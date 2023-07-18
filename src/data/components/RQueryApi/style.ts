import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const CardUser = styled.div`
  width: 30%;
  box-shadow: 2px 4px 10px #e1e2e3;
  margin-bottom: 20px;
  padding: 25px;
`;

export const Button = styled.button`
  border: none;
  padding: 10px 20px;
  color: grey;
  margin: 10px;

  &:hover {
    color: white;
    background-color: grey;
    cursor: pointer;
    transition: 0.5s;
  }
`;

export const DivInputs = styled.div`
display: flex;
flex-direction: column;
  width: 30%;
  padding: 25px;
  box-shadow: 2px 4px 4px grey;
  margin: auto;
`;

export const Input = styled.input`
    padding: 10px;
    border: 1px solid grey;
    margin: 10px 0; 
` 
