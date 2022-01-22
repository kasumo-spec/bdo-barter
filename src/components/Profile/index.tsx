import { Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ShipsModalAdd } from "../Ships/Popup";
import { useAuth } from "../../providers";

const Profile = () => {
  const { userName } = useAuth();

  return (
    <>
      <div>
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
