import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useHeader } from "../../providers";
import Logomark from "../../assets/horizontal_on_white_by_logaster-_1_.svg";

const Header = () => {
  const history = useNavigate();
  const { firstButton, actualLocation, setActualLocation } = useHeader();
  const { signOut, removeTokenLocalStorage, isAuthenticated } = useAuth();

  const handleLogout = () => {
    removeTokenLocalStorage();
    signOut();
    setActualLocation("/login");
    toast.success("Volte logo!");
    history("/login");
  };

  const handlePath = (path: string) => {
    history(path);
    setActualLocation(path);
  };

  const redirectFirst = () => {
    history(firstButton);
    setActualLocation(firstButton);
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "var(--backgroundHeader)",
          height: "6,25rem",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <a style={{ height: "5,625rem" }} href="/">
            <img style={{ height: "5rem" }} src={Logomark} alt="Logomarca" />
          </a>
          <Typography variant="h6"> </Typography>

          {isAuthenticated ? (
            <div>
              <Button onClick={redirectFirst} color="inherit">
                Navios
              </Button>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </div>
          ) : actualLocation === "/login" ? (
            <div>
              <Button onClick={() => handlePath("/")} color="inherit">
                Home
              </Button>
              <Button onClick={() => handlePath("/register")} color="inherit">
                Register
              </Button>
            </div>
          ) : actualLocation === "/register" ? (
            <div>
              <Button onClick={() => handlePath("/")} color="inherit">
                Home
              </Button>
              <Button onClick={() => handlePath("/login")} color="inherit">
                Login
              </Button>
            </div>
          ) : (
            <div>
              <Button onClick={() => handlePath("/")} color="inherit">
                Home
              </Button>
              <Button onClick={() => handlePath("/login")} color="inherit">
                Login
              </Button>
              <Button onClick={() => handlePath("/register")} color="inherit">
                Registre-se
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
