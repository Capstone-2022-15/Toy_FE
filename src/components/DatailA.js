import { Box, Container } from "@mui/system";
import { useState } from "react";

const DetailA = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      {isLoading ? (
        <Container maxWidth="sm" style={{ textalign: "center" }}>
          <Box sx={{ height: "100%", m: 5, textAlign: "center" }}>
            Loading . . .
          </Box>
        </Container>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default DetailA;
