import { useEffect } from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Navigate } from "react-router-dom";
import {
  Container,
  FormDiv,
  ImageDiv,
  StyledTextField,
  StyledButton,
} from "./style";
import Image from "../../assets/undraw_authentication_re_svpt.svg";
import { toast } from "react-toastify";
import { useHeader, useAuth } from "../../providers";

const useStyle = makeStyles({
  text: {
    margin: "35px",
  },
});

const Login = () => {
  const classes = useStyle();
  const { setActualLocation } = useHeader();

  const { isAuthenticated, signIn, loginError } = useAuth();

  const schema = yup.object().shape({
    email: yup.string(),
    password: yup.string().min(6, "Mínimo de 6 digitos"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (loginError) {
      toast.error(loginError);
    }
  }, [loginError]);

  const handleForm = (data: any) => {
    const { email, password } = data;
    signIn({ email, password });
  };

  if (isAuthenticated) {
    setActualLocation("/dashboard");
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <Container>
      <FormDiv>
        <div className={classes.text}>
          <Typography variant="h3">Login</Typography>
        </div>
        <form onSubmit={handleSubmit(handleForm)}>
          <div>
            <StyledTextField
              required
              variant="outlined"
              label="E-mail"
              margin="normal"
              size="small"
              color="primary"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </div>

          <div>
            <StyledTextField
              required
              variant="outlined"
              label="Senha"
              margin="normal"
              size="small"
              type="password"
              color="primary"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </div>
          <div>
            <StyledButton
              variant="contained"
              color="primary"
              value="Cadastar"
              type="submit"
            >
              Entrar
            </StyledButton>
          </div>
        </form>
      </FormDiv>

      <ImageDiv>
        <img src={Image} alt="login" />
      </ImageDiv>
    </Container>
  );
};

export default Login;
