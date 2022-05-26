import Navbar from "../components/Navbar";
import AddBtn from "../components/PostBtn";
import ShowCommunityPage from "../components/ShowC";

export default function CommunityPage() {
  return (
    <div>
      <Navbar name={"커뮤니티"}/>
      <ShowCommunityPage />
      <AddBtn />
    </div>
  );
}
