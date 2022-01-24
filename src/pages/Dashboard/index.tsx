import { Navigate } from "react-router-dom";
import { Ships, Profile } from "../../components";
import { useAuth } from "../../providers";
import { Container, ShipsContainer, ImageContent } from "./style";
import dashImage from "../../assets/undraw_yacht_re_kkai.svg";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Container>
        <h1>Pessoal Ships List</h1>
        <ShipsContainer>
          <Profile />
          <Ships />
        </ShipsContainer>
        <ImageContent>
          <img src={dashImage} alt="dashImage" />
        </ImageContent>
      </Container>
    </>
  );
};

export default Dashboard;
