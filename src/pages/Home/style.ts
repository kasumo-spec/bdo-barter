import styled from "styled-components";
import { Button } from "@mui/material";

export const Container = styled.div`
  background-color: var(--backgroundHomePage);
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);

  .yoga {
    display: none;
  }

  img {
    display: block;
    width: 260px;
    height: 300px;
    object-fit: contain;
    text-align: center;
    margin: 0 auto;
  }
  p {
    width: 85%;
    max-width: 500px;
    font-size: 1.5rem;
    margin: auto;
    padding: 0px 0 50px 10px;
    color: wheat;
  }

  @media (min-width: 700px) {
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;

    .yoga {
      display: initial;

      img {
        object-fit: contain;
        height: 380px;
        width: 300px;
      }
    }

    p {
      font-weight: 700;
      font-size: 24px;
    }
  }
`;

export const DivButtons = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin: auto;
  @media screen and (min-width: 700px) {
    flex-direction: row;
    justify-content: space-between;
    margin: 10px auto;
    max-width: 500px;
    gap: 20px;
  }
`;

export const LoginButton = styled(Button)`
  margin-bottom: 20px;
  font-weight: 700;
  width: 100%;
  height: 50px;
  background-color: var(--backgroundButton);
  border: 1px solid var(--colorButton);
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%), 0px 4px 4px rgb(0 0 0 / 25%);
  border-radius: 20px;
  color: #6b6af5;
  max-width: 260px;
  transition: all 0.5s;
  &:hover {
    background-color: #c4d7d1;
  }
  @media (min-width: 700px) {
    width: 45%;
  }
`;

export const RegisterButton = styled(LoginButton)`
  width: 60%;
`;

export const Apresentation = styled.div`
  display: flex;
  flex-direction: column;
  height: 754px;
`;
