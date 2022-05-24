import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShowAnnounPage = () => {
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
        url: "http://localhost:3030/api/announcement",
        headers: {
          Authorization: window.localStorage.getItem("accessToken"),
        },
      }).then((res) => {
        if (res.data.token) {
          window.localStorage.setItem("accessToken", res.data.token);
          axios({
            method: "GET",
            url: "http://localhost:3030/api/announcement",
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
      if (error.response.data.code === 419 || error.response.data.code === 401) {
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
        <div>
          <span>Loading. . .</span>
        </div>
      ) : (
        <div>
          <TableContainer>
            <Table aria-label="simple table" style={{ textalign: "center" }}>
              <TableHead>
                <TableRow>
                  <TableCell>번호</TableCell>
                  <TableCell>제목</TableCell>
                  <TableCell>작성자</TableCell>
                  <TableCell>조회수</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {board.map(
                  (n, index) =>
                    (page - 1) * 10 <= index &&
                    index < page * 10 && (
                      <TableRow key={n.idx}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{n.subject}</TableCell>
                        <TableCell>{n.writer}</TableCell>
                        <TableCell>{n.hit}</TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </TableContainer >
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
export default ShowAnnounPage;
