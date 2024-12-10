import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const NewPlayerForm = ({ addPlayer }) => {
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    team: "",
    owner: "",
  });

  const navigate = useNavigate(); // Allows programmatic navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.breed ||
      !formData.team ||
      !formData.owner
    ) {
      alert("Please fill out all fields before submitting.");
      return;
    }
    try {
      await addPlayer(formData);
      setFormData({ name: "", breed: "", team: "", owner: "" });
      alert("Player created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={formData.breed}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="team"
          placeholder="Team"
          value={formData.team}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="owner"
          placeholder="Owner"
          value={formData.owner}
          onChange={handleInputChange}
          required
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit"
          className="create">Create Player</button>
          {}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="back-button"
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPlayerForm;
