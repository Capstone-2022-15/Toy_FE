import {
  Button,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostContent = () => {
  const [categoryState, setCategoryState] = useState("");
  const [subjectState, setSubjectState] = useState("");
  const [contentState, setContentState] = useState("");
  const [startDateState, setStartDateState] = useState(null);
  const [finaldateState, setFinalDateState] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);
  const [filesState, setFilesState] = useState([]);
  let files = [];
  const navigate = useNavigate();

  //이미지 올리기(게시물 올린 뒤에 실행)
  const postImage = async (id, formdata) => {
    try {
      await axios({
        method: "POST",
        url: `http://localhost:3030/api/${categoryState}/upload/multi/${id}`,
        headers: {
          Authorization: window.localStorage.getItem("accessToken"),
          "Content-Type": "multipart/form-data",
        },
        data: formdata,
      }).then((res) => {
        if (res.data.token) {
          window.localStorage.setItem("accessToken", res.data.token);
          axios({
            method: "POST",
            url: `http://localhost:3030/api/${categoryState}/upload/multi/${id}`,
            headers: {
              Authorization: window.localStorage.getItem("accessToken"),
              "Content-Type": "multipart/form-data",
            },
            data: formdata,
          });
        }
        return res;
      });
      navigate(-1);
    } catch (error) {
      if (
        error.response.data.code === 419 ||
        error.response.data.code === 401
      ) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/login");
      } else {
        alert("사진 제출 오류!(게시물은 제출 되었습니다.)");
      }
    }
  };

  //게시물 올리기
  const postContent = async (data, formdata) => {
    try {
      const Id = await axios({
        method: "POST",
        url: `http://localhost:3030/api/${categoryState}/`,
        headers: {
          Authorization: window.localStorage.getItem("accessToken"),
        },
        data: data,
      }).then((res) => {
        if (res.data.token) {
          window.localStorage.setItem("accessToken", res.data.token);
          axios({
            method: "POST",
            url: `http://localhost:3030/api/${categoryState}/`,
            headers: {
              Authorization: window.localStorage.getItem("accessToken"),
            },
            data: data,
          });
        }
        return res.data.contentId;
      });
      postImage(Id[Object.keys(Id)[0]], formdata);
    } catch (error) {
      if (
        error.response.code === 419 ||
        error.response.code === 401
      ) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/login");
      } else {
        alert("제출 오류!");
      }
    }
  };

  const handleSubmit = (e) => {
    const data = {
      subject: subjectState,
      content: contentState,
      writer: window.localStorage.getItem("userName"),
      writer_nick: null,
      startdate: startDateState,
      finaldate: finaldateState,
      password: null,
    };
    const formdata = new FormData();
    for (let i = 0; i < filesState.length; i++) {
      formdata.append("img", filesState[i]);
    }
    const sure = window.confirm("제출 하시겠습니까?");
    if (sure) {
      postContent(data, formdata);
    } else {
      return;
    }
  };
  //날짜 컨버터
  const Dateconvert = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };
  //사진 인코더
  const encodeFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageUrl((prevList) => [...prevList, reader.result]);
        resolve();
      };
    });
  };
  const handleChangeSelect = (e) => {
    setCategoryState(e.target.value);
  };
  const handleChangeSubject = (e) => {
    setSubjectState(e.target.value);
  };
  const handleChangeContent = (e) => {
    setContentState(e.target.value);
  };
  const handleChangeStartDate = (e) => {
    setStartDateState(Dateconvert(e));
  };
  const handleChangeFinalDate = (e) => {
    setFinalDateState(Dateconvert(e));
  };
  const handleChangeFiles = (e) => {
    setFilesState(e.target.files);
    files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      encodeFileToBase64(files[i]);
    }
  };

  return (
    <div>
      <FormControl fullWidth sx={{ mt: 1 }}>
        <InputLabel id="categoryState-label">카테고리</InputLabel>
        <Select
          labelId="categoryState-label"
          id="categoryState-select"
          value={categoryState}
          label="카테고리"
          onChange={handleChangeSelect}
          required
        >
          <MenuItem value={"announcement"}>공지사항</MenuItem>
          <MenuItem value={"degree"}>학사정보</MenuItem>
          <MenuItem value={"scholarship"}>장학정보</MenuItem>
          <MenuItem value={"community"}>커뮤니티</MenuItem>
        </Select>
        <TextField
          sx={{ mt: 1 }}
          id="subject-textfield"
          label="제목"
          value={subjectState}
          onChange={handleChangeSubject}
          required
        />
        <TextField
          sx={{ mt: 1 }}
          id="content-textfield"
          label="내용"
          required
          multiline
          value={contentState}
          onChange={handleChangeContent}
          rows={10}
        />
        <Grid container spacing={1} sx={{ overflow: "hidden", mt: 1 }}>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="시작일"
                value={startDateState}
                onChange={handleChangeStartDate}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="마감일"
                value={finaldateState}
                onChange={handleChangeFinalDate}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <Button variant="outlined" component="label" fullWidth>
              사진 업로드
              <input
                type="file"
                accept="image/png, image/jpeg"
                multiple
                hidden
                onChange={handleChangeFiles}
              />
            </Button>
          </Grid>
          <Grid item xs={9}>
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              제출
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ m: 0 }}>
            <ImageList cols={5} rowHeight={150}>
              {imageUrl &&
                imageUrl.map((n) => (
                  <ImageListItem key={n}>
                    <img src={n} alt="uploadedImage" loading="lazy" />
                  </ImageListItem>
                ))}
            </ImageList>
          </Grid>
        </Grid>
      </FormControl>
    </div>
  );
};
export default PostContent;
