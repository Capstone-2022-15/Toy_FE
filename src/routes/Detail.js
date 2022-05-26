import { useParams } from "react-router-dom";
import ShowDetail from "../components/Datail";
import Navbar from "../components/Navbar";

export default function DetailPage() {
  const { category, id } = useParams();
  let categoryName = "";
  let categoryNav = "";
  switch (category) {
    case "1":
      categoryName = "announcement";
      categoryNav = "공지사항";
      break;
    case "2":
      categoryName = "degree";
      categoryNav = "학사정보";
      break;
    case "3":
      categoryName = "scholarship";
      categoryNav = "장학정보";
      break;
    case "4":
      categoryName = "community";
      categoryNav = "커뮤니티";
      break;
    default:
      break;
  }
  return (
    <div>
      <Navbar name={categoryNav} />
      <ShowDetail id={id} category={categoryName} />
    </div>
  );
}
