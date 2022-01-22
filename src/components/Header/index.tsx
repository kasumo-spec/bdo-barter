import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useHeader } from "../../providers";
import Logomark from "../../assets/horizontal_on_white_by_logaster-_1_.svg";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
      <AppBar position="static">
        <Toolbar>
          <a href="/">
            <img sizes="155 54" src={Logomark} alt="Logomarca" />
          </a>
          <Typography variant="h6"> </Typography>
          {isAuthenticated && (
            <>
              <Button onClick={redirectFirst} color="inherit">
                {actualLocation === "/dashboard"
                  ? "Grupos"
                  : actualLocation === "/groups"
                  ? "Hábitos"
                  : "Grupos"}
              </Button>
            </>
          )}

          {isAuthenticated ? (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          ) : actualLocation === "/login" ? (
            <>
              <Button onClick={() => handlePath("/")} color="inherit">
                Home
              </Button>
              <Button onClick={() => handlePath("/register")} color="inherit">
                Register
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => handlePath("/")} color="inherit">
                Home
              </Button>
              <Button onClick={() => handlePath("/login")} color="inherit">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
