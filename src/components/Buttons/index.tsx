import { Button, Theme } from "@mui/material";
import { withStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

type RenderButtonProps = {
  action?: string;
  click?: () => void;
};

const MappButton = withStyles((theme: Theme) => ({
  root: {
    width: "180px",
    height: "50px",
    color: "#6B6AF5",
    fontSize: "14px",
    background: "#FFFFFF",
    mixBlendMode: "normal",
    border: "2px solid #6B6AF5",
    boxSizing: "border-box",
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "20px",
    "&:hover": {
      backgroundColor: "#C4D7D1",
      borderColor: "#0062cc",
      color: "#6B6AF5",
      boxShadow: "none",
    },
  },
}))(Button);

const MappButtonIcon = withStyles((theme: Theme) => ({
  root: {
    color: "#6B6AF5",
    fontSize: "36px",
    background: "#FFFFFF",
    mixBlendMode: "normal",
    border: "2px solid #6B6AF5",
    boxSizing: "border-box",
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "20px",
    "&:hover": {
      backgroundColor: "#C4D7D1",
      borderColor: "#0062cc",
      color: "#6B6AF5",
      boxShadow: "none",
    },
  },
}))(Button);

const RenderButton = ({ action, click }: RenderButtonProps) => {
  if (action === "addHabitPopup") {
    return (
      <MappButton onClick={click} variant="contained">
        Adicionar Hábito
      </MappButton>
    );
  } else if (action === "confirmButton") {
    return (
      <MappButton type="submit" variant="contained">
        Confirmar
      </MappButton>
    );
  } else if (action === "editHabit") {
    return (
      <MappButtonIcon onClick={click} variant="contained">
        <CreateIcon />
      </MappButtonIcon>
    );
  } else {
    return (
      <MappButtonIcon onClick={click} variant="contained">
        <DeleteIcon />
      </MappButtonIcon>
    );
  }
};

export default RenderButton;
