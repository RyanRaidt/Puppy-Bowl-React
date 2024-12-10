import React, { useState, useEffect } from "react";
import { fetchAllPlayers, deletePlayer } from "../API";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const AllPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllPlayers() {
      try {
        const APIResponse = await fetchAllPlayers();
        if (APIResponse.success) {
          setPlayers(APIResponse.data.players);
        } else {
          setError(APIResponse.error.message);
        }
      } catch (error) {
        console.error("Failed to fetch players:", error);
        setError("Failed to load players.");
      }
    }
    getAllPlayers();
  }, []);

  const handleDelete = async (playerId) => {
    const confirmation = confirm(
      "Are you sure you want to delete this player?"
    );
    if (!confirmation) return;

    try {
      const deleteResponse = await deletePlayer(playerId);
      if (deleteResponse.success) {
        setPlayers((prevPlayers) =>
          prevPlayers.filter((player) => player.id !== playerId)
        );
        alert("Player deleted successfully!");
      } else {
        alert("Failed to delete player.");
      }
    } catch (error) {
      console.error(`Failed to delete player ${playerId}:`, error);
      alert("An error occurred while trying to delete the player.");
    }
  };

  const playersToDisplay = searchParam
    ? players.filter((player) =>
        player.name.toLowerCase().includes(searchParam.toLowerCase())
      )
    : players;

  return (
    <>
      <div className="container">
        <input
          type="text"
          placeholder="Search players..."
          onChange={(e) => setSearchParam(e.target.value)}
        />
        <button className="create" onClick={() => navigate("/new-player")}>
          Create New Player
        </button>

        <div>
          {error ? (
            <p>{error}</p>
          ) : (
            playersToDisplay.map((player) => (
              <div key={player.id} className="player-card">
                <h4>{player.name}</h4>
                <div>
                  <Link to={`/players/${player.id}`} className="details-button">
                    See Details
                  </Link>
                  <button
                    onClick={() => handleDelete(player.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AllPlayers;
