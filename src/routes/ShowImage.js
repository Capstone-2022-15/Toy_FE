import { useLocation, useParams } from "react-router-dom";

export default function ShowImage() {
  const id = useParams();
  const state = useLocation();
  return (
    <img
      src={state.state}
      alt={id}
    />
  );
}
