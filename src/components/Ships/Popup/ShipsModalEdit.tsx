import { FormEvent, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Modal,
  Backdrop,
  Fade,
  Theme,
  Container,
  Avatar,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { RenderButton } from "../../../components";
import { toast } from "react-toastify";
import { UserShipsDetails } from "../../../providers/useUserShipsProvider";
import { useAuth, useUserShips, useShips } from "../../../providers";

export default function HabitsModalEdit({
  action,
  ship,
}: {
  action: string;
  ship: UserShipsDetails;
}) {
  const [open, setOpen] = useState(false);
  const { userId } = useAuth();
  const { editUserShip } = useUserShips();
  const { ships } = useShips();
  const thisShip = ships.find((shiper) => shiper.id === ship.shipId);

  const editHabit = (values: UserShipsDetails) => {};

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const shipUserItens: {
      [key: string]: number;
    } = {};
    const source = data.get("shipUserItens");
    console.log(source);
    // source?.forEach((item) => {
    //   shipUserItens[item.name] = item.value;
    // });
    // const values = {
    //   id: ship.id,
    //   userId,
    //   shipId: ship.shipId,
    //   shipUserItens: shipUserItens,
    // };
    // editHabit(values);
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <RenderButton click={() => handleOpen()} action={action} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div>
            <Container maxWidth="sm">
              <Avatar>
                <img src={thisShip?.shipPhoto} alt="Avatar of the Ship" />
              </Avatar>
              <Typography variant="h5" component="h2">
                {thisShip?.name}
              </Typography>
              <Box component="form" noValidate onSubmit={onSubmit}>
                <Grid container spacing={2}>
                  {Object.keys(ship.shipUserItens).map((item) => {
                    return (
                      <Grid item xs={12} key={item}>
                        <TextField
                          name="shipUserItens"
                          label={item}
                          type="number"
                          value={ship.shipUserItens[item]}
                          fullWidth
                          variant="outlined"
                        />
                      </Grid>
                    );
                  })}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Editar
                </Button>
              </Box>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
