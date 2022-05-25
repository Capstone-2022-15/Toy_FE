import ShowMainPage from "../components/MainPage";
import Navbar from "../components/Navbar";
import AddBtn from "../components/PostBtn";

export default function MainPage() {
  return (
    <div>
      <Navbar name={"Computer-Engineering"}/>
      <ShowMainPage />
      <AddBtn />
    </div>
  );
}
