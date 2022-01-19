import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    :root {
        --backgroundHomePage: #D6B1B1;
        --backgroundRegister: #DCE4ED;
        --backgroundLogin: #B2ACFA;
        --backgroundDashboard: #c2d6e8;
        --backgroundHeader: #A3848D;
        --backgroundProfile: #ebe6f1;
        --backgroundButton: #ffffff;
        --borderButton: #6b6af5;
        --colorButton: #6b6af5;
        --backgroundHoverButton: #C4D7D1;
        --backgroundPopUp: #DB9591;
        --backgroundInputPopUp: #ffffff;
        --backgroundGroupPage: #E9A2AD;
        --backgroundInfoGroups: #C4C4C4;
    }

    button {
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }

    body {
        font-family: 'Roboto', sans-serif;
    }

    .App-header {
      justify-content: flex-start;
    }

    .Dashboard {
      width: 100%;
      margin-top: 32px;

    }

    .Dashboard-habits {
      flex-grow: 12;
      justify-content: center;
      padding-left: 12px;
    }
    
    .Modal-buttons-habits {
      display: flex;
      justify-content: space-around;
    }

    @media (min-width: 600px){
          .Dashboard{
          display: flex;
        }
      }
`;
