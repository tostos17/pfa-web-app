import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchPlayers } from "../redux/playerSlice";

export default function PlayerTable() {
  const dispatch = useAppDispatch();
  const { playerResponse } = useAppSelector((state) => state.players);

  useEffect(() => {
    dispatch(fetchPlayers());
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
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    </main>
  );
}
