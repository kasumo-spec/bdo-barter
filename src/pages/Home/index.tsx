import {
  Container,
  DivButtons,
  LoginButton,
  RegisterButton,
  Apresentation,
} from "./style";
import logo from "../../assets/horizontal_on_white_by_logaster-_1_.svg";
import { Navigate, useNavigate } from "react-router-dom";
import ImagemYoga from "../../assets/undraw_yoga_248n 1.svg";
import { useHeader, useAuth } from "../../providers";

const Home = () => {
  const { setActualLocation } = useHeader();
  const { isAuthenticated } = useAuth();

  const history = useNavigate();

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <Container>
      <div className={"yoga"}>
        <img src={ImagemYoga} alt="yoga" />
      </div>
      <Apresentation>
        <img src={logo} alt="Ma'App" />
        <p>
          Mapeie seus hábitos com esta ferramenta, reúna-se em grupos, cresça,
          progrida e atinja seus objetivos
        </p>
        <DivButtons>
          <LoginButton
            onClick={() => {
              history("/login");
              setActualLocation("/login");
            }}
            variant="contained"
          >
            Login
          </LoginButton>
          <RegisterButton
            onClick={() => {
              history("/register");
              setActualLocation("/register");
            }}
            variant="contained"
          >
            Registre-se
          </RegisterButton>
        </DivButtons>
      </Apresentation>
    </Container>
  );
};

export default Home;
