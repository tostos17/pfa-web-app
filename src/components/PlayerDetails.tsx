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
    <main className="box player-details">
      <h2>Player Record</h2>
        <div className="img-container">
            <img src={import.meta.env.VITE_BASE_URL + playerDetailsResponse.body.passportPhotoUrl} width={200} />
        </div>
        <div className="player-data">
          <p>Firstname: <span>{playerDetailsResponse.body.firstname}</span></p>
          <p>Middlename: <span>{playerDetailsResponse.body.middlename}</span></p>
          <p>Lastname: <span>{playerDetailsResponse.body.lastname}</span></p>
          <p>Date of Birth: <span>{playerDetailsResponse.body.dob}</span></p>
          <p>Height: <span>{playerDetailsResponse.body.playerHeight}</span></p>
          <p>Weight: <span>{playerDetailsResponse.body.playerWeight}</span></p>
          <p>State of Origin: <span>{playerDetailsResponse.body.originState}</span></p>
          <p>Nationality: <span>{playerDetailsResponse.body.nationality}</span></p>
          <p>Phone: <span>{playerDetailsResponse.body.playerPhone}</span></p>
          <p>Address: <span>{playerDetailsResponse.body.playerAddress}</span></p>
          <p>Jersey Number: <span>{playerDetailsResponse.body.squadNumber}</span></p>
          <p>Address: <span>{playerDetailsResponse.body.playerAddress}</span></p>
          <p>Special Health Concerns: <span>{playerDetailsResponse.body.healthConcernDescription ? playerDetailsResponse.body.healthConcernDescription : "None"}</span></p>
          <p>Status: <span>{playerDetailsResponse.body.membershipStatus}</span></p>
          
          <b>Parent Information</b>
          <p>Parent Title: <span>{playerDetailsResponse.body.parentTitle}</span></p>
          <p>Parent Firstname: <span>{playerDetailsResponse.body.parentFirstname}</span></p>
          <p>Parent Middlename: <span>{playerDetailsResponse.body.parentMiddlename}</span></p>
          <p>Parent Lastname: <span>{playerDetailsResponse.body.parentLastname}</span></p>
          <p>Parent Address: <span>{playerDetailsResponse.body.parentAddress}</span></p>
          <p>Parent Phone Number: <span>{playerDetailsResponse.body.parentPhone}</span></p>
          <p>Parent Address: <span>{playerDetailsResponse.body.parentEmail}</span></p>
          <p>Parent Address: <span>{playerDetailsResponse.body.parentAddress}</span></p>

          {
            playerDetailsResponse.body.sponsorFirstname && (
              <>
                <p>Sponsor Title: <span>{playerDetailsResponse.body.sponsorTitle}</span></p>
                <p>Sponsor Firstname: <span>{playerDetailsResponse.body.sponsorFirstname}</span></p>
                <p>Sponsor Lastname: <span>{playerDetailsResponse.body.sponsorLastname}</span></p>
                <p>Sponsor Occupation: <span>{playerDetailsResponse.body.sponsorOccupation}</span></p>
                <p>Sponsor Email: <span>{playerDetailsResponse.body.sponsorEmail}</span></p>
              </>
            )
          }
        </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  )
}

export default PlayerDetails
