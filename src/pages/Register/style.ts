import { Container, FormDiv } from "../Login/style";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";

export const RegisterContainer = styled(Container)`
  height: calc(100vh - 56px);
  background-color: var(--backgroundRegister);
  @media (min-width: 1050px) {
    height: calc(100vh - 65px);
    flex-direction: row;
    justify-content: space-around;
  }
`;

export const RegisterFormDiv = styled(FormDiv)`
  position: absolute;
  text-align: center;
  top: 17%;
  z-index: 2;

  @media (min-width: 850px) {
    position: initial;
    width: 50%;
  }
`;

export const RegisterTextField = styled(TextField)`
  @media (max-width: 849px) {
    background-color: white;
  }
`;

export const RegisterButton = styled(Button)`
  background-color: var(--backgroundButton);
  color: var(--colorButton);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 7px 14px;
  border-radius: 20px;
  font-size: 16px;
  margin-top: 30px;
  width: 229px;
  height: 55px;
  &:hover {
    background-color: var(--backgroundHoverButton);
  }
  @media (max-width: 600px) {
    font-size: 12px;
    width: 186px;
    height: 43px;
  }
`;
