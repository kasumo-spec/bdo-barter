import { useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { RenderButton } from "../../.";
import { toast } from "react-toastify";
import { useAuth, useUserShips, useShips } from "../../../providers";
import { ShipDetails } from "../../../providers/useShipsProvider";

type itens = {
  [key: string]: number;
};

export default function HabitsModal({ action }: { action: string }) {
  const { userId } = useAuth();
  const { addUserShip } = useUserShips();
  const { ships } = useShips();
  const [open, setOpen] = useState(false);

  const addHabit = (ship: ShipDetails) => {
    const shipItens: itens = {};
    for (let [key] of Object.entries(ship.itens)) {
      shipItens[key] = 0;
    }
    const data = {
      userId: userId,
      shipId: ship.id,
      shipUserItens: {
        ...shipItens,
      },
    };
    try {
      addUserShip(data);
      toast.success("Navio adicionada com sucesso!");
    } catch (error) {
      toast.error("Não foi possível adicionar a Navio!");
    }
  };

  const onSubmit = (values: ShipDetails) => {
    addHabit(values);
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
              <Container maxWidth={"md"}>
                {ships.map((ship) => {
                  return (
                    <Card key={ship.id}>
                      <CardContent>
                        <Typography>{ship.name}</Typography>
                        <CardMedia
                          component="img"
                          alt={ship.name}
                          height="140"
                          image={ship.shipPhoto}
                        />
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => onSubmit(ship)}
                        >
                          {" "}
                          Adcionar{" "}
                        </Button>
                      </CardActions>
                    </Card>
                  );
                })}
              </Container>
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
