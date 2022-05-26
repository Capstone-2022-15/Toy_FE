import Navbar from "../components/Navbar";
import AddBtn from "../components/PostBtn";
import ShowScholarPage from "../components/ShowS";

export default function ScholarPage() {
  return (
    <div>
      <Navbar name={"장학정보"} />
      <ShowScholarPage />
      <AddBtn />
    </div>
  );
}
