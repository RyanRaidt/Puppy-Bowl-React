import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllPlayers from "./components/AllPlayers";
import SinglePlayer from "./components/SinglePlayer";
import NewPlayerForm from "./components/NewPlayerForm";
import { createPlayer } from "./API";
import "./App.css";

const App = () => {
  const addPlayer = async (playerData) => {
    const newPlayer = await createPlayer(playerData);
    console.log("New Player Created:", newPlayer);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllPlayers />} />
        <Route path="/players/:id" element={<SinglePlayer />} />
        <Route
          path="/new-player"
          element={<NewPlayerForm addPlayer={addPlayer} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
