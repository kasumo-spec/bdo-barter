import { FormEvent, useState } from "react";
import {
  Modal,
  Fade,
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
import { useUserShips, useShips } from "../../../providers";

export default function HabitsModalEdit({
  action,
  ship,
}: {
  action: string;
  ship: UserShipsDetails;
}) {
  const [open, setOpen] = useState(false);
  const { editUserShip } = useUserShips();
  const { ships } = useShips();
  const thisShip = ships.find((shiper) => shiper.id === ship.shipId);
  const [shipItens, setShipItens] = useState(ship.shipUserItens);

  const modifyShipItens = ({ value, id }: any) => {
    setShipItens({ ...shipItens, [id]: Number(value) });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      editUserShip({
        ...ship,
        shipUserItens: shipItens,
      });
      handleClose();
      toast.success("Ship updated successfully");
    } catch (error) {
      toast.error("Ship not updated");
    }
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
      >
        <Fade in={open}>
          <div>
            <Container
              maxWidth="sm"
              sx={{ backgroundColor: "white", marginTop: "1rem" }}
            >
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
                          id={item}
                          name={item}
                          label={
                            thisShip?.itens[item].name
                              ? thisShip.itens[item].name
                              : item
                          }
                          onChange={({ target }) => {
                            modifyShipItens({
                              value: (target as HTMLInputElement).value,
                              id: item,
                            });
                          }}
                          type="number"
                          fullWidth
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
