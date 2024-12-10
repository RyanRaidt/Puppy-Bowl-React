const COHORT = "2410-FTB-ET-WEB-FT";
const baseUrl = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT}`;

export async function fetchAllPlayers() {
  try {
    const response = await fetch(`${baseUrl}/players`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
export async function fetchSinglePlayer(playerId) {
  try {
    const response = await fetch(`${baseUrl}/players/${playerId}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error fetching player ${playerId}:`, error);
  }
}
export async function createPlayer(newPlayer) {
  try {
    const response = await fetch(`${baseUrl}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating player:", error);
  }
}

export async function deletePlayer(playerId) {
  try {
    const response = await fetch(`${baseUrl}/players/${playerId}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error deleting player ${playerId}:`, error);
  }
}

