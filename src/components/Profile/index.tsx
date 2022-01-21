import { makeStyles } from "@mui/styles";
import { Avatar, Theme } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ShipsModalAdd } from "../Ships/Popup";
import { useAuth } from "../../providers";

const useStyles = makeStyles((theme: Theme) => ({
  large: {
    width: "100px", //theme.spacing(7),
    height: "100px", //theme.spacing(7),
  },
  imgSvg: {
    fontSize: "100px",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flexGrow: "2",
    "& > *": {
      margin: "8px", //theme.spacing(2),
    },
    margin: "40px",
    width: "70%",
    maxWidth: "270px",
    borderRadius: "10px",
    backgroundColor: "#5b6bbf",
    boxShadow: "0px 1px 5px 0px black",
    fontSize: "1.8em",
    fontWeight: "600",
    color: "aliceblue",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { userName } = useAuth();

  return (
    <>
      <div className={classes.root}>
        <Avatar alt="Avatar" className={classes.large}>
          <AccountCircleIcon className={classes.imgSvg} />
        </Avatar>
        <div>{userName?.toUpperCase()}</div>
        <ShipsModalAdd action="addShipPopup" />
      </div>
    </>
  );
};

export default Profile;
