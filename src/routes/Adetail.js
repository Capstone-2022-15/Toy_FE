import { useParams } from "react-router-dom";
import ShowDetailA from "../components/DatailA";
import Navbar from "../components/Navbar";

export default function AdetailPage() {
  const { id } = useParams();
  return (
    <div>
      <Navbar name={"공지사항"} />
      <ShowDetailA id={id}/>
    </div>
  );
}
