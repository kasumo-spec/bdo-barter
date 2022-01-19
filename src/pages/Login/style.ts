import styled, { keyframes } from "styled-components";
import { Button, TextField } from "@mui/material";

export const Container = styled.div`
  background-color: var(--backgroundLogin);
  height: calc(100vh - 56px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 1050px) {
    height: calc(100vh - 65px);
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

const animationFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const FormDiv = styled.div`
  position: absolute;
  top: 17%;
  z-index: 2;
  text-align: center;

  @media (min-width: 1050px) {
    animation: ${animationFromRight} 1.2s;
    position: initial;
    width: 50%;
  }
`;

const animationFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const ImageDiv = styled.div`
  @media (min-width: 1050px) {
    width: 50%;
    animation: ${animationFromLeft} 1.2s;
  }

  img {
    width: 360px;
    height: 350px;
    opacity: 0.3;

    @media (min-width: 1050px) {
      width: 538px;
      height: 404px;
      opacity: 1;
      margin-left: 135px;
    }
  }
`;

export const StyledTextField = styled(TextField)`
  /* background-color: white; */
  @media (max-width: 600px) {
    margin-bottom: 50px;
    background-color: #ffffff;
  }
`;

export const StyledButton = styled(Button)`
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
