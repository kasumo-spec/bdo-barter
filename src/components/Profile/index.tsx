import { Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ShipsModalAdd } from "../Ships/Popup";
import { useAuth } from "../../providers";

const Profile = () => {
  const { userName } = useAuth();

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Avatar alt="Avatar">
          <AccountCircleIcon />
        </Avatar>
        <div>{userName?.toUpperCase()}</div>
        <>
          <ShipsModalAdd action="addShipPopup" />
        </>
      </div>
    </>
  );
};

export default Profile;
