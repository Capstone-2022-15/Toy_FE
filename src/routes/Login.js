import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  let id = "";
  let password = "";
  let data = {};
  const getLogin = async (data) => {
    axios({
      method: "POST",
      url: "http://localhost:3030/api/login",
      data: data,
    })
      .then((res) => {
        if (res.data.token == null) {
          alert("ID나 비밀번호가 옳지 않습니다.");
          return;
        } else {
          window.localStorage.setItem("accessToken", res.data.token);
          window.localStorage.setItem("userName", res.data.name);
        }
      })
      .then(() => {
        navigate("/");
      });
  };
  const handlerSubmit = (e) => {
    data = { id: id, password: password };
    getLogin(data);
  };
  const handlerId = (e) => {
    id = e.target.value;
  };
  const handlerPassword = (e) => {
    password = e.target.value;
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 25,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" color="Primary">
          제주대학교 학과 게시판
        </Typography>

        <TextField
          margin="normal"
          label="아이디"
          required
          fullWidth
          name="id"
          autoComplete="email"
          onChange={handlerId}
          autoFocus
        />
        <TextField
          margin="normal"
          label="비밀번호"
          type="password"
          required
          fullWidth
          name="password"
          onChange={handlerPassword}
          autoComplete="current-password"
        />
        <Grid container>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              onClick={handlerSubmit}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  비밀번호 찾기
                </Link>
              </Grid>

              <Grid item>
                <Link href="#" variant="body2">
                  회원가입
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
