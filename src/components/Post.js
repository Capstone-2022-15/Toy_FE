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
import { useState } from "react";

const PostContent = () => {
  const [categoryState, setCategoryState] = useState("");
  let category = "";
  const [subjectState, setSubjectState] = useState("");
  let subject = "";
  const [contentState, setContentState] = useState("");
  let content = "";
  const [startDateState, setStartDateState] = useState(null);
  let startDate = "";
  const [finaldateState, setFinalDateState] = useState(null);
  let finalDate = "";
  const [imageUrl, setImageUrl] = useState([]);
  let files = [];

  const Dateconvert = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };
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
    category = e.target.value;
    console.log(category);
  };
  const handleChangeSubject = (e) => {
    setSubjectState(e.target.value);
    subject = e.target.value;
    console.log(subject);
  };
  const handleChangeContent = (e) => {
    setContentState(e.target.value);
    content = e.target.value;
    console.log(content);
  };
  const handleChangeStartDate = (e) => {
    setStartDateState(Dateconvert(e));
    startDate = Dateconvert(e);
    console.log(startDate);
  };
  const handleChangeFinalDate = (e) => {
    setFinalDateState(Dateconvert(e));
    finalDate = Dateconvert(e);
    console.log(finalDate);
  };
  const handleChangeFiles = (e) => {
    files = e.target.files;
    console.log(files);
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
            <Button variant="contained" fullWidth>
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
