import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { useAuth } from "../context/UserContext";
import { useEffect } from "react";
import { fetchPlayerById } from "../redux/playerDetailsSlice";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const PlayerDetails = () => {
    
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const dispatch = useAppDispatch();
    const {playerDetailsResponse} = useAppSelector((state) => state.playerById);
    const { user } = useAuth();


    useEffect(() => {
        if(id === "" || id === null) {
            toast.error("Id is missing");
            return;
        }

        dispatch(fetchPlayerById({
            id: id ? id : "",
            token: user?.accessToken !== undefined ? user.accessToken : ""
        }));
      }, [dispatch]);

  return (
    <main className="box">
      <h2>Player Record</h2>
        <div className="img-container">
            <img src={import.meta.env.VITE_BASE_URL + playerDetailsResponse.body.passportPhotoUrl} width={200} />
        </div>
        <div>
          <p>Firstname: {playerDetailsResponse.body.firstname}</p>
          <p>Middlename: {playerDetailsResponse.body.middlename}</p>
          <p>Lastname: {playerDetailsResponse.body.lastname}</p>
          <p>Date of Birth: {playerDetailsResponse.body.dob}</p>
          <p>Height: {playerDetailsResponse.body.playerHeight}</p>
          <p>Weight: {playerDetailsResponse.body.playerWeight}</p>
          <p>State of Origin: {playerDetailsResponse.body.originState}</p>
          <p>Nationality: {playerDetailsResponse.body.nationality}</p>
          <p>Phone: {playerDetailsResponse.body.playerPhone}</p>
          <p>Address: {playerDetailsResponse.body.playerAddress}</p>
          <p>Jersey Number: {playerDetailsResponse.body.squadNumber}</p>
          <p>Address: {playerDetailsResponse.body.playerAddress}</p>
          <p>Special Health Concerns: {playerDetailsResponse.body.healthConcernDescription ? playerDetailsResponse.body.healthConcernDescription : "None"}</p>
          <p>Status: {playerDetailsResponse.body.membershipStatus}</p>
          <p>Parent Address: {playerDetailsResponse.body.parentAddress}</p>
        </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  )
}

export default PlayerDetails
