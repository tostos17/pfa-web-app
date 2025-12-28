import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchPlayers } from "../redux/playerSlice";
import { useAuth } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function PlayerTable() {
  const dispatch = useAppDispatch();
  const { playerResponse } = useAppSelector((state) => state.players);
  const { user } = useAuth();

  useEffect(() => {
    dispatch(fetchPlayers(user?.accessToken !== undefined ? user.accessToken : ""));
  }, [dispatch]);

  return (
    <main>
      <h2>players</h2>
      <div className="table-wrapper">
        <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Firstname</th>
          <th>Middlename</th>
          <th>Lastname</th>
          <th>Date of Birth</th>
          <th>Nationality</th>
          <th>Origin</th>
          <th>Extra</th>
          <th>Photo</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {playerResponse.body.content.map((player, index) => (
          <tr key={player.playerId}>
            <td>{index + 1}</td>
            <td>{player.firstname}</td>
            <td>{player.middlename}</td>
            <td>{player.lastname}</td>
            <td>{player.dob}</td>
            <td>{player.nationality}</td>
            <td>{player.originState}</td>
            <td>{player.dob}</td>
            <td>
              <img src={import.meta.env.VITE_BASE_URL + player.passportPhotoUrl} width={60} />
            </td>
            <td><Link to={`/player?id=${player.playerId}`}>more...</Link> </td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    </main>
  );
}
