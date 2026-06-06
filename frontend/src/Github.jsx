import { useState, useContext } from "react";
import { ScoreContext } from "./ScoreContext";

function Github() {
  const { setGithubScore } = useContext(ScoreContext);

  const [githubUsername, setGithubUsername] = useState("");
  const [repoCount, setRepoCount] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [score, setScore] = useState(0);

  async function fetchGithubData() {
    const response = await fetch(
      `https://api.github.com/users/${githubUsername}`
    );
    const data = await response.json();

    setRepoCount(data.public_repos || 0);
    setFollowers(data.followers || 0);
    setAvatar(data.avatar_url || "");

    let finalScore = 0;

    if (data.public_repos >= 10) finalScore += 50;
    else finalScore += (data.public_repos || 0) * 5;

    if (data.followers >= 10) finalScore += 30;
    else finalScore += (data.followers || 0) * 3;

    finalScore += 20;

    setScore(finalScore);
    setGithubScore(finalScore);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>GitHub Tracker</h1>

      <input
        style={styles.input}
        type="text"
        placeholder="Enter GitHub Username"
        value={githubUsername}
        onChange={(e) => setGithubUsername(e.target.value)}
      />

      <button style={styles.button} onClick={fetchGithubData}>
        Fetch GitHub Data
      </button>

      <div style={styles.profileBox}>
        {avatar && (
          <img src={avatar} style={styles.avatar} alt="GitHub Avatar" />
        )}

        <h2>{githubUsername || "GitHub User"}</h2>
        <p> Public Repositories: {repoCount}</p>
        <p> Followers: {followers}</p>

        <h1 style={styles.score}> GitHub Score: {score}/100</h1>
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
    borderRadius: "12px",
    border: "1px solid #475569",
    backgroundColor: "#111827",
    color: "white",
    fontSize: "16px",
  },
  button: {
    width: "84%",
    padding: "15px",
    marginTop: "18px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(90deg,#7c3aed,#2563eb)",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
  },
  profileBox: {
    marginTop: "30px",
    padding: "35px",
    borderRadius: "24px",
    background:
      "linear-gradient(145deg, rgba(30,41,59,0.95), rgba(15,23,42,0.95))",
    border: "1px solid rgba(99,102,241,0.5)",
    boxShadow:
      "0 0 20px rgba(99,102,241,0.3), 0 0 50px rgba(59,130,246,0.15)",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "4px solid #6366f1",
    boxShadow: "0 0 25px rgba(99,102,241,0.6)",
  },
  score: {
    color: "#a855f7",
    fontSize: "32px",
    marginTop: "20px",
  },
};

export default Github;