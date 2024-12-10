import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchSinglePlayer } from "../API";
import "../App.css";

const SinglePlayer = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPlayer() {
      try {
        const result = await fetchSinglePlayer(id);
        if (result && result.success) {
          const fetchedPlayer = result.data.player;
          setPlayer(fetchedPlayer);
          
          if (fetchedPlayer.teamId) {
            const teamResult = await fetchTeamById(fetchedPlayer.teamId);
            if (teamResult && teamResult.success) {
              setTeamName(teamResult.data.team.name); 
            } else {
              setTeamName("Unknown Team");
            }
          } else {
            setTeamName("No Team");
          }
        } else {
          setError("Failed to load player details.");
        }
      } catch (error) {
        console.error(`Error fetching player ${id}:`, error);
        setError("An error occurred while fetching player details.");
      }
    }
    getPlayer();
  }, [id]);

  if (error) {
    return (
      <div className="container single-player-container">
        <p>{error}</p>
        <button onClick={() => navigate(-1)} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="container single-player-container">
        <p>Loading player details...</p>
        <button onClick={() => navigate(-1)} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container single-player-container">
      <h2>{player.name}</h2>
      <div className="player-details">
        <p>
          <strong>ID:</strong> {player.id}
        </p>
        <p>
          <strong>Breed:</strong> {player.breed}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {player.status === "field" ? "On the Field" : "On the Bench"}
        </p>
        {teamName && (
          <p>
            <strong>Team:</strong> {teamName}
          </p>
        )}
        {player.imageUrl && (
          <div>
            <img
              src={player.imageUrl}
              alt={player.name}
              style={{ maxWidth: "200px", borderRadius: "8px" }}
            />
          </div>
        )}
      </div>
      <button onClick={() => navigate(-1)} className="back-button">
        Go Back
      </button>
    </div>
  );
};

export default SinglePlayer;