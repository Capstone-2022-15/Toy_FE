import Navbar from "../components/Navbar";
import AddBtn from "../components/PostBtn";
import ShowDegreePage from "../components/ShowD";

export default function DegreePage() {
  return (
    <div>
      <Navbar name={"학사정보"} />
      <ShowDegreePage />
      <AddBtn />
    </div>
  );
}
