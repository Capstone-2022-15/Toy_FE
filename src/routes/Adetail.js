import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdetailPage() {
  const { id } = useParams();
  return (
    <div>
      <Navbar name={"공지사항"} />
      
    </div>
  );
}
