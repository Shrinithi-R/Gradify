import { useState, useContext } from "react";
import { ScoreContext } from "./ScoreContext";

function Leetcode() {
  const { setLeetcodeScore } = useContext(ScoreContext);

  const [username, setUsername] = useState("");
  const [easy, setEasy] = useState("");
  const [medium, setMedium] = useState("");
  const [hard, setHard] = useState("");
  const [score, setScore] = useState(0);

  function calculateLeetcodeScore() {
    const total =
      Number(easy || 0) * 1 +
      Number(medium || 0) * 3 +
      Number(hard || 0) * 5;

    const finalScore = Math.min(total, 100);

    setScore(finalScore);
    setLeetcodeScore(finalScore);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>LeetCode Tracker</h1>

      <input
        style={styles.input}
        type="text"
        placeholder="Enter LeetCode username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        style={styles.input}
        type="number"
        placeholder="Easy solved"
        value={easy}
        onChange={(e) => setEasy(e.target.value)}
      />

      <input
        style={styles.input}
        type="number"
        placeholder="Medium solved"
        value={medium}
        onChange={(e) => setMedium(e.target.value)}
      />

      <input
        style={styles.input}
        type="number"
        placeholder="Hard solved"
        value={hard}
        onChange={(e) => setHard(e.target.value)}
      />

      <button style={styles.button} onClick={calculateLeetcodeScore}>
        Calculate LeetCode Score
      </button>

      <div style={styles.card}>
        <h2>{username || "LeetCode User"}</h2>
        <h1 style={styles.score}>{score}/100</h1>
        <p>Easy × 1 | Medium × 3 | Hard × 5</p>
      </div>
    </div>
  );
}

const styles = {
  container: { textAlign: "center" },
  title: { fontSize: "34px" },
  input: {
    width: "80%",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "1px solid #475569",
    backgroundColor: "#111827",
    color: "white",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  button: {
    width: "84%",
    padding: "15px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(90deg,#7c3aed,#2563eb)",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
  card: {
    marginTop: "25px",
    padding: "25px",
    borderRadius: "18px",
    background: "rgba(30, 41, 59, 0.7)",
    border: "1px solid #334155",
  },
  score: {
    color: "#a855f7",
    fontSize: "42px",
  },
};

export default Leetcode;