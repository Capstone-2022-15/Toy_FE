import Navbar from "../components/Navbar";
import AddBtn from "../components/PostBtn";
import ShowAnnounPage from "../components/ShowA";

export default function AnnouncePage() {
  return (
    <div>
      <Navbar name={"공지사항"} />
      <ShowAnnounPage />
      <AddBtn />
    </div>
  );
}
