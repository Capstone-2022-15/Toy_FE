import {
  Box,
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShowMainPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [board, setBoard] = useState([]);
  const getBoard = async () => {
    const json = await axios({
      method: "GET",
      url: "http://localhost:3030/api/showall",
    }).then((res) => {
      return res.data;
    });
    setBoard(json.data);
    setIsLoading(false);
  };

  const HeadClickHandler = (e) => {
    const key = e.target.innerText;
    switch (key) {
      case "공지사항":
        navigate("/announcement");
        break;
      case "학사정보":
        navigate("/degree");
        break;
      case "장학정보":
        navigate("/scholarship");
        break;
      case "커뮤니티":
        navigate("/community");
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    getBoard();
  }, []);
  return (
    <div>
      {isLoading ? (
        <Container maxWidth="sm" style={{ textalign: "center" }}>
          <Box sx={{ height: "100%", m: 5, textAlign: "center" }}>
            Loading . . .
          </Box>
        </Container>
      ) : (
        <div>
          <Grid container spacing={2} margin="0" width>
            <Grid item xs={6} sx={{ pr: 2 }}>
              <TableContainer>
                <Table
                  aria-label="simple table"
                  style={{ textalign: "center" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <Button
                          onClick={HeadClickHandler}
                          sx={{
                            width: "100%",
                            fontWeight: "bold",
                            color: "primary.main",
                          }}
                        >
                          공지사항
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {board &&
                      board[0].map((n) => (
                        <TableRow key={n.idx}>
                          <TableCell align="center">
                            <Button
                              onClick={HeadClickHandler}
                              sx={{
                                width: "100%",
                                color: "text.secondary",
                              }}
                            >
                              {n.subject}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={6} sx={{ pr: 2 }}>
              <TableContainer>
                <Table
                  aria-label="simple table"
                  style={{ textalign: "center" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        {" "}
                        <Button
                          onClick={HeadClickHandler}
                          sx={{
                            width: "100%",
                            fontWeight: "bold",
                            color: "primary.main",
                          }}
                        >
                          학사정보
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {board &&
                      board[1].map((n) => (
                        <TableRow key={n.idx}>
                          <TableCell align="center">
                            {" "}
                            <Button
                              onClick={HeadClickHandler}
                              sx={{
                                width: "100%",
                                color: "text.secondary",
                              }}
                            >
                              {n.subject}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={6} sx={{ pr: 2 }}>
              <TableContainer>
                <Table
                  aria-label="simple table"
                  style={{ textalign: "center" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        {" "}
                        <Button
                          onClick={HeadClickHandler}
                          sx={{
                            width: "100%",
                            fontWeight: "bold",
                            color: "primary.main",
                          }}
                        >
                          장학정보
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {board &&
                      board[2].map((n) => (
                        <TableRow key={n.idx}>
                          <TableCell align="center">
                            {" "}
                            <Button
                              onClick={HeadClickHandler}
                              sx={{
                                width: "100%",
                                color: "text.secondary",
                              }}
                            >
                              {n.subject}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={6} sx={{ pr: 2 }}>
              <TableContainer>
                <Table
                  aria-label="simple table"
                  style={{ textalign: "center" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <Button
                          onClick={HeadClickHandler}
                          sx={{
                            width: "100%",
                            fontWeight: "bold",
                            color: "primary.main",
                          }}
                        >
                          커뮤니티
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {board &&
                      board[3].map((n) => (
                        <TableRow key={n.idx}>
                          <TableCell align="center">
                            <Button
                              onClick={HeadClickHandler}
                              sx={{
                                width: "100%",
                                color: "text.secondary",
                              }}
                            >
                              {n.subject}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
