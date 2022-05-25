import {
  Button,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowCommunityPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [board, setBoard] = useState([]);
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const handleChange = (event, value) => {
    setPage(value);
  };
  const getBoard = async () => {
    try {
      const json = await axios({
        method: "GET",
        url: "http://localhost:3030/api/community",
        headers: {
          Authorization: window.localStorage.getItem("accessToken"),
        },
      }).then((res) => {
        if (res.data.token) {
          window.localStorage.setItem("accessToken", res.data.token);
          axios({
            method: "GET",
            url: "http://localhost:3030/api/community",
            headers: {
              Authorization: window.localStorage.getItem("accessToken"),
            },
          });
        }
        return res.data;
      });
      setBoard(json.data);
      setIsLoading(false);
    } catch (error) {
      if (
        error.response.data.code === 419 ||
        error.response.data.code === 401
      ) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/login");
      }
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
          <TableContainer>
            <Table aria-label="simple table" style={{ textalign: "center" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>번호</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>제목</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>작성자</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>조회수</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>댓글</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>작성일자</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {board &&
                  board.map(
                    (n, index) =>
                      (page - 1) * 10 <= index &&
                      index < page * 10 && (
                        <TableRow key={n.idx}>
                          <TableCell sx={{ textAlign: "center" }}>
                            {index + 1}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <Button
                              sx={{
                                width: "100%",
                                color: "text.secondary",
                              }}
                            >
                              {n.subject}
                            </Button>
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {n.writer}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {n.hit}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {n.reply}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {n.createDate.substr(0, 10)}
                          </TableCell>
                        </TableRow>
                      )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <Stack spacing={2} alignItems="center" mt={5}>
              <Pagination
                count={10}
                page={page}
                onChange={handleChange}
                color="primary"
              />
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
};
export default ShowCommunityPage;
