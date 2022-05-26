import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar(prop) {
  const navigate = useNavigate();
  let isLogin = "Login";
  if (window.localStorage.getItem("accessToken")) {
    isLogin = "Logout";
  }

  const OnClickLogout = async (e) => {
    if (e.target.innerText === "LOGOUT") {
      const sure = window.confirm("로그아웃 하시겠습니까?");
      if (sure) {
        await axios({
          method: "POST",
          url: "http://localhost:3030/api/signout",
          headers: {
            Authorization: window.localStorage.getItem("accessToken"),
          },
        }).then((res) => {
          try {
            window.localStorage.removeItem("accessToken");
            window.localStorage.removeItem("userName");
          } catch (error) {
            alert(error);
          }
          navigate("/login");
        });
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {prop.name}
          </Typography>
          <Button color="inherit" onClick={OnClickLogout}>
            {isLogin}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
