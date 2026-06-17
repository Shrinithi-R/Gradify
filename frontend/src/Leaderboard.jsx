import { useContext, useEffect, useState } from "react";
import { ScoreContext } from "./ScoreContext";

function Leaderboard({ theme }) {
  const { githubScore, leetcodeScore } = useContext(ScoreContext);
  const isLight = theme === "light";

  const [name, setName] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  const overallScore = Math.round(
    ((githubScore || 0) + (leetcodeScore || 0)) / 2
  );

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("gradifyLeaderboard")) || [];
    setLeaderboard(saved);
  }, []);

  function saveRank() {
    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    }

    const newUser = {
      name,
      githubScore: githubScore || 0,
      leetcodeScore: leetcodeScore || 0,
      overallScore,
    };

    const updated = [...leaderboard, newUser].sort(
      (a, b) => b.overallScore - a.overallScore
    );

    localStorage.setItem("gradifyLeaderboard", JSON.stringify(updated));
    setLeaderboard(updated);
    setName("");
  }

  function clearLeaderboard() {
    localStorage.removeItem("gradifyLeaderboard");
    setLeaderboard([]);
  }

  return (
    <div style={{ ...styles.container, color: isLight ? "#111827" : "white" }}>
      <h1 style={styles.title}>🏆 Leaderboard</h1>

      <input
        style={{
          ...styles.input,
          background: isLight ? "#ffffff" : "#111827",
          color: isLight ? "#111827" : "white",
          border: isLight ? "1px solid #cbd5e1" : "1px solid #475569",
        }}
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div
        style={{
          ...styles.myScoreBox,
          background: isLight ? "#ffffff" : "rgba(30,41,59,0.75)",
          border: isLight ? "1px solid #cbd5e1" : "1px solid #334155",
        }}
      >
        <h2>Your Current Score</h2>
        <p>GitHub Score: {githubScore || 0}/100</p>
        <p>LeetCode Score: {leetcodeScore || 0}/100</p>
        <h2 style={styles.score}>Overall: {overallScore}/100</h2>
      </div>

      <button style={styles.button} onClick={saveRank}>
        Save My Rank
      </button>

      <button style={styles.clearButton} onClick={clearLeaderboard}>
        Clear Leaderboard
      </button>

      <div style={styles.list}>
        {leaderboard.length === 0 ? (
          <p>No rankings saved yet.</p>
        ) : (
          leaderboard.map((user, index) => (
            <div
              key={index}
              style={{
                ...styles.card,
                background: isLight ? "#ffffff" : "rgba(30,41,59,0.75)",
                border: isLight ? "1px solid #cbd5e1" : "1px solid #334155",
              }}
            >
              <h2>
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🏅"}{" "}
                Rank #{index + 1}
              </h2>
              <h3>{user.name}</h3>
              <p>Overall Score: {user.overallScore}/100</p>
              <p>GitHub Score: {user.githubScore}/100</p>
              <p>LeetCode Score: {user.leetcodeScore}/100</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
  },

  title: {
    fontSize: "36px",
    marginBottom: "25px",
  },

  input: {
    width: "80%",
    padding: "15px",
    borderRadius: "12px",
    fontSize: "16px",
    marginBottom: "20px",
    boxSizing: "border-box",
  },

  myScoreBox: {
    padding: "25px",
    borderRadius: "18px",
    marginBottom: "20px",
  },

  score: {
    color: "#7c3aed",
  },

  button: {
    width: "80%",
    padding: "15px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(90deg,#7c3aed,#2563eb)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "12px",
  },

  clearButton: {
    width: "80%",
    padding: "15px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(90deg,#ef4444,#dc2626)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  list: {
    marginTop: "25px",
  },

  card: {
    padding: "20px",
    borderRadius: "18px",
    marginBottom: "20px",
  },
};

export default Leaderboard;