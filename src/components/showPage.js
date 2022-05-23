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

export const ShowPage = () => {
  const [isLoadnig, setIsLoading] = useState(true);
  const [board, setBoard] = useState([]);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const getBoard = async () => {
    const json = await axios({
      method: "GET",
      url: "http://localhost:3030/api/community",
      headers: {
        Authorization: window.localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
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
      })
    setBoard(json.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div>
      {isLoadnig ? (
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
                  <TableCell>댓글</TableCell>
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
                        <TableCell>{n.reply}</TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <Stack spacing={2}>
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
export default ShowPage;
