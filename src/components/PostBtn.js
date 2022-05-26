import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
const AddBtn = () => {
  const navigate = useNavigate();
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{ position: "absolute", bottom: 40, right: 32 }}
      onClick={() => {
        navigate("/post");
      }}
    >
      <AddIcon />
    </Fab>
  );
};
export default AddBtn;
