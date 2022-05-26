import {
  Button,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowDetail = ({ id, category }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [board, setBoard] = useState([]);
  const [images, setImages] = useState([]);
  const [comments, setCommnets] = useState([]);
  let content = "";
  // 게시물 불러오기
  const getBoard = async () => {
    try {
      const contentdata = await axios({
        method: "GET",
        url: `http://localhost:3030/api/${category}/${id}`,
        headers: {
          Authorization: window.localStorage.getItem("accessToken"),
        },
      }).then((res) => {
        if (res.data.token) {
          window.localStorage.setItem("accessToken", res.data.token);
          axios({
            method: "GET",
            url: `http://localhost:3030/api/${category}/${id}`,
            headers: {
              Authorization: window.localStorage.getItem("accessToken"),
            },
          });
        }
        return res.data;
      });
      setBoard(contentdata.data);
      setImages(contentdata.image);
      setIsLoading(false);
    } catch (error) {
      if (
        error.response.data.code === 419 ||
        error.response.data.code === 401
      ) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/login");
      } else {
        alert("데이터 불러오기 오류!");
      }
    }
  };
  //댓글 불러오기
  const getComment = async () => {
    try {
      const commentdata = await axios({
        method: "GET",
        url: `http://localhost:3030/api/${category}/${id}/comments`,
        headers: {
          Authorization: window.localStorage.getItem("accessToken"),
        },
      }).then((res) => {
        if (res.data.token) {
          window.localStorage.setItem("accessToken", res.data.token);
          axios({
            method: "GET",
            url: `http://localhost:3030/api/${category}/${id}/comments`,
            headers: {
              Authorization: window.localStorage.getItem("accessToken"),
            },
          });
        }
        return res.data;
      });
      setCommnets(commentdata.data);
    } catch (error) {
      if (
        error.response.data.code === 419 ||
        error.response.data.code === 401
      ) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/login");
      } else {
        alert("데이터 불러오기 오류!");
      }
    }
  };
  //댓글 작성 버튼
  const handlePostComments = (e) => {
    const name = window.localStorage.getItem("userName");
    const data = { member_id: name, content: content };
    getPostComments(data);
  };
  //댓글 입력창
  const handleChangeInput = (e) => {
    content = e.target.value;
  };
  //댓글 삭제 버튼
  const handleClickDelete = (e) => {
    const sure = window.confirm("정말로 삭제 하시겠습니까?");
    if (sure) {
      const idx = e.target.id;
      console.log(idx);
      deleteComment(idx);
    }
  };
  //댓글 삭제
  const deleteComment = async (idx) => {
    try {
      await axios({
        method: "DELETE",
        url: `http://localhost:3030/api/${category}/${id}/comments/${idx}`,
        headers: {
          Authorization: window.localStorage.getItem("accessToken"),
        },
      }).then((res) => {
        if (res.data.token) {
          window.localStorage.setItem("accessToken", res.data.token);
          axios({
            method: "DELETE",
            url: `http://localhost:3030/api/${category}/${id}/comments/${idx}`,
            headers: {
              Authorization: window.localStorage.getItem("accessToken"),
            },
          });
        }
        return res.data;
      });
      getComment();
    } catch (error) {
      if (
        error.response.data.code === 419 ||
        error.response.data.code === 401
      ) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/login");
      } else {
        alert("데이터 불러오기 오류!");
      }
    }
  };
  //댓글 작성
  const getPostComments = async (data) => {
    try {
      await axios({
        method: "POST",
        url: `http://localhost:3030/api/${category}/${id}/comments`,
        headers: {
          Authorization: window.localStorage.getItem("accessToken"),
        },
        data: data,
      }).then((res) => {
        if (res.data.token) {
          window.localStorage.setItem("accessToken", res.data.token);
          axios({
            method: "POST",
            url: `http://localhost:3030/api/${category}/${id}/comments`,
            headers: {
              Authorization: window.localStorage.getItem("accessToken"),
            },
            data: data,
          });
        }
        return res.data;
      });
      getComment();
    } catch (error) {
      if (
        error.response.data.code === 419 ||
        error.response.data.code === 401
      ) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/login");
      } else {
        alert("데이터 불러오기 오류!");
      }
    }
  };
  useEffect(() => {
    getBoard();
    getComment();
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
        <Grid container spacing={0} margin="0" width>
          <Grid item xs={12} sx={{ p: 2, bgcolor: "background.paper" }}>
            <Box
              sx={{
                textAlign: "center",
                m: 0,
                p: 0,
                fontWeight: "bold",
                fontSize: "large",
              }}
            >
              {board && board.subject}
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ p: 2, bgcolor: "info.light" }}>
            <Box sx={{ textAlign: "center", m: 0, p: 0, fontWeight: "bold" }}>
              작성자
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ p: 2, bgcolor: "text.main" }}>
            <Box sx={{ textAlign: "center", m: 0, p: 0 }}>
              {board && board.writer}
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ p: 2, bgcolor: "info.light" }}>
            <Box sx={{ textAlign: "center", m: 0, p: 0, fontWeight: "bold" }}>
              등록일
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ p: 2, bgcolor: "text.main" }}>
            <Box sx={{ textAlign: "center", m: 0, p: 0 }}>
              {board && board.createDate.substr(0, 10)}
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ p: 2, bgcolor: "info.light" }}>
            <Box sx={{ textAlign: "center", m: 0, p: 0, fontWeight: "bold" }}>
              조회수
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ p: 2, bgcolor: "text.main" }}>
            <Box sx={{ textAlign: "center", m: 0, p: 0 }}>
              {board && board.hit}
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ p: 2, bgcolor: "info.light" }}>
            <Box sx={{ textAlign: "center", m: 0, p: 0, fontWeight: "bold" }}>
              수정일
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ p: 2, bgcolor: "text.main" }}>
            <Box sx={{ textAlign: "center", m: 0, p: 0 }}>
              {board && board.updateDate.substr(0, 10)}
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ p: 2, bgcolor: "text.main" }}>
            <Box sx={{ textAlign: "left", m: 0, p: 3 }}>
              {board && board.content}
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ p: 2, bgcolor: "text.main" }}>
            <ImageList cols={5} rowHeight={300}>
              {images &&
                images.map((n) => (
                  <ImageListItem key={n.idx}>
                    <Button
                      sx={{ p: 0, m: 0 }}
                      onClick={() =>
                        window.open(
                          `http://localhost:3030/api/${category}/${id}/image/${n.saveName}`,
                          `_blank`
                        )
                      }
                    >
                      <img
                        src={`http://localhost:3030/api/${category}/${id}/image/${n.saveName}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`http://localhost:3030/api/${category}/${id}/image/${n.saveName}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={n.savaName}
                        loading="lazy"
                      />
                    </Button>
                  </ImageListItem>
                ))}
            </ImageList>
          </Grid>
          <Grid item xs={10} sx={{ p: 2, bgcolor: "text.main" }}>
            <TextField
              id="outlined-basic"
              label="댓글을 입력하세요"
              onChange={handleChangeInput}
              variant="standard"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2} sx={{ p: 2, bgcolor: "text.main" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handlePostComments}
              sx={{ mt: 3, mb: 2 }}
            >
              작성
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ p: 1, bgcolor: "background.paper" }}>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {comments &&
                comments.map((n) => (
                  <ListItem alignItems="flex-start" key={n.idx}>
                    <ListItemText
                      primary={n.member_id}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{
                              display: "inline",
                              fontSize: "large",
                              fontWeight: "bold",
                            }}
                            component="span"
                            variant="body2"
                            color="GrayText.primary"
                          >
                            {n.content}
                          </Typography>
                          - {n.updateDate.substr(0, 10)}
                          <Button
                            sx={{ p: 0, m: 0 }}
                            onClick={handleClickDelete}
                            id={n.idx}
                          >
                            삭제
                          </Button>
                          <Divider />
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
            </List>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
export default ShowDetail;
