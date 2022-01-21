import { makeStyles, ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Theme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RenderButton from "../Button";
import { toast } from "react-toastify";
import { ShipsModalEdit } from "./Popup";
import { ButtonDiv } from "./style";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "95%",
    paddingRight: "12px",
    margin: "auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const accordionTheme = createTheme({
  components: {
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          display: "block",
        },
      },
    },
  },
});

const Ships = () => {
  const classes = useStyles();
  const { token } = useToken();

  const deleteShip = (ship) => {
    api
      .delete(`/ships/${ship.id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Hábito deletado com sucesso");
        setShips(ships.filter((hab) => hab.id !== ship.id));
      })
      .catch((_) => toast.error("Erro ao deletar hábito"));
  };

  return (
    <>
      <div className="Dashboard-ships">
        <div className={classes.root}>
          {ships.length !== 0 ? (
            ships.map((ship) => {
              return (
                <Accordion key={ship.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${ship.id}a-content`}
                    id={`panel${ship.id}a-header`}
                  >
                    <Typography className={classes.heading}>
                      {ship.title}
                    </Typography>
                  </AccordionSummary>
                  <ThemeProvider theme={accordionTheme}>
                    <AccordionDetails>
                      <Typography>Categoria: {ship.category}</Typography>
                      <Typography>Dificuldade: {ship.difficulty}</Typography>
                      <Typography>Frequência: {ship.frequency}</Typography>
                      <Typography>
                        Conquistado:{" "}
                        {ship.how_much_achieved !== 100
                          ? `${ship.how_much_achieved}%`
                          : "Completado!"}
                      </Typography>
                      <ButtonDiv>
                        <ShipsModalEdit ship={ship} action="editShip" />{" "}
                        <RenderButton
                          click={() => deleteShip(ship)}
                          action="deleteShip"
                        />
                      </ButtonDiv>
                    </AccordionDetails>
                  </ThemeProvider>
                </Accordion>
              );
            })
          ) : (
            <Typography>
              Você não tem nenhum hábito cadastrado. Clique no botão para
              cadastrar.
            </Typography>
          )}
        </div>
      </div>
    </>
  );
};
export default Ships;
