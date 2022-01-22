import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RenderButton } from "../../components";
import { toast } from "react-toastify";
import { ShipsModalEdit } from "./Popup";
import { ButtonDiv } from "./style";
import { useUserShips, useShips } from "../../providers";
import { UserShipsDetails } from "../../providers/useUserShipsProvider";
import { DataGrid } from "@mui/x-data-grid";

type itensCalculate = {
  [key: string]: number | string | undefined;
};

const Ships = () => {
  const { userShips, deleteUserShip } = useUserShips();
  const { ships } = useShips();

  const deleteShip = (ship: UserShipsDetails) => {
    try {
      deleteUserShip(ship);
      toast.success("Ship deleted");
    } catch (error) {
      toast.error("Error deleting ship");
    }
  };

  return (
    <>
      <div>
        <div>
          {userShips.length !== 0 ? (
            userShips.map((ship) => {
              const shipFullDetails = ships.find(
                (shiper) => shiper.id === ship.shipId
              );
              const itensCalculate: itensCalculate[] = [];
              Object.keys(ship.shipUserItens).forEach((key) => {
                const value = shipFullDetails?.itens[key].value
                  ? shipFullDetails.itens[key].value
                  : 0;
                const calc = value - ship.shipUserItens[key];
                const percent = Math.round(
                  (ship.shipUserItens[key] / value) * 100
                );

                itensCalculate.push({
                  id: key + ship.userId,
                  itemName: shipFullDetails?.itens[key].name,
                  value,
                  calc,
                  percent,
                  myQtd: ship.shipUserItens[key],
                });
              });

              return (
                <Accordion key={ship.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${ship.id}a-content`}
                    id={`panel${ship.id}a-header`}
                  >
                    <Typography>{shipFullDetails?.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <DataGrid
                      columns={[
                        {
                          headerName: "Item",
                          field: "itemName",
                        },
                        {
                          headerName: "Quantidade Necessária",
                          field: "value",
                        },
                        {
                          headerName: "Quantidade em Posse",
                          field: "myQtd",
                        },
                        {
                          headerName: "Quantidade que Falta",
                          field: "calc",
                        },
                        {
                          headerName: "Porcentagem de Completo",
                          field: "percent",
                        },
                      ]}
                      rows={itensCalculate}
                    />
                    <ButtonDiv>
                      <ShipsModalEdit ship={ship} action="editShip" />{" "}
                      <RenderButton
                        click={() => deleteShip(ship)}
                        action="deleteShip"
                      />
                    </ButtonDiv>
                  </AccordionDetails>
                </Accordion>
              );
            })
          ) : (
            <Typography>Você não tem Navios Registrados.</Typography>
          )}
        </div>
      </div>
    </>
  );
};
export default Ships;
