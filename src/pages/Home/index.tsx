import {
  Container,
  DivButtons,
  LoginButton,
  RegisterButton,
  Apresentation,
} from "./style";
import logo from "../../assets/horizontal_on_white_by_logaster-_1_.svg";
import { Navigate, useNavigate } from "react-router-dom";
import ImagemContainerShip from "../../assets/undraw_container_ship_re_alm4.svg";
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
        <img src={ImagemContainerShip} alt="yoga" />
      </div>
      <Apresentation>
        <img src={logo} alt="Ma'App" />
        <p>
          Projeto feito com o intuito de ajudar a mapear o andamento da
          construção e evolução dos barcos no Black Desert. Futuras
          implementações se referem a todo o tipo de acompanhamento necessário
          tanto para optimizar a permuta quanto para gerenciar os itens
          necessários para a construção, levando em conta a gestão de fluxo nos
          postos de controle mais atraentes como Porto Epheria, ilha de Illya,
          Porto Ancado, e para os mais agressivos, Velia.
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
