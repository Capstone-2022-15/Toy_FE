import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const AddBtn = () => {
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{ position: "absolute", bottom: 40, right: 32 }}
    >
      <AddIcon />
    </Fab>
  );
};
export default AddBtn;
