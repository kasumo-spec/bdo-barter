import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackImage from "../../assets/undraw_click_here_re_y6uq.png";
import { ImageDiv } from "../Login/style";
import {
  RegisterButton,
  RegisterContainer,
  RegisterFormDiv,
  RegisterTextField,
} from "./style";
import { useAuth } from "../../providers";

const useStyle = makeStyles({
  text: {
    margin: "35px",
  },
});

const RegisterForm = () => {
  const classes = useStyle();
  const history = useNavigate();
  const { signUp, signUpError, isAuthenticated, signIn } = useAuth();

  const schema = yup.object().shape({
    username: yup.string(),
    email: yup.string().email("Email inválido, insira um email válido"),
    password: yup.string().min(6),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = async (data: any) => {
    try {
      const { username, email, password } = data;
      await signUp({ username, email, password });
      reset();
      toast.success("Cadastro realizado com sucesso!");
      await signIn({ email, password });
      history("/dashboard");
    } catch (e) {
      toast.error(signUpError);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <RegisterContainer>
      <RegisterFormDiv>
        <div className={classes.text}>
          <Typography variant="h3">Registre-se</Typography>
        </div>
        <form onSubmit={handleSubmit(handleForm)}>
          <div>
            <RegisterTextField
              required
              label="Nome de usuário"
              variant="outlined"
              color="primary"
              margin="normal"
              size="small"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          </div>

          <div>
            <RegisterTextField
              required
              label="Email"
              variant="outlined"
              color="primary"
              margin="normal"
              size="small"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </div>

          <div>
            <RegisterTextField
              required
              label="Senha"
              variant="outlined"
              color="primary"
              margin="normal"
              size="small"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </div>

          <div>
            <RegisterButton
              sx={{ margin: 1 }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Registrar
            </RegisterButton>
          </div>
        </form>
      </RegisterFormDiv>
      <ImageDiv>
        <img src={BackImage} alt="register" />
      </ImageDiv>
    </RegisterContainer>
  );
};

export default RegisterForm;
