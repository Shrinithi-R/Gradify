import { useState, useContext } from "react";
import { ScoreContext } from "./ScoreContext";

function Github({ theme }) {
  const { setGithubScore } = useContext(ScoreContext);
  const isLight = theme === "light";

  const [githubUsername, setGithubUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  async function fetchGithubData() {
    if (githubUsername.trim() === "") {
      alert("Please enter a GitHub username");
      return;
    }

    try {
      setLoading(true);
      setProfile(null);
      setScore(0);

      const response = await fetch(
        `https://api.github.com/users/${githubUsername.trim()}`
      );

      if (!response.ok) {
        alert("GitHub user not found. Please check the username.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      const repos = data.public_repos || 0;
      const followers = data.followers || 0;

      let finalScore = 20;
      finalScore += repos >= 10 ? 50 : repos * 5;
      finalScore += followers >= 10 ? 30 : followers * 3;

      if (finalScore > 100) finalScore = 100;

      setProfile(data);
      setScore(finalScore);
      setGithubScore(finalScore);
    } catch (error) {
      alert("Unable to fetch GitHub data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        ...styles.container,
        color: isLight ? "#111827" : "#ffffff",
      }}
    >
      <h1
        style={{
          ...styles.title,
          color: isLight ? "#111827" : "#ffffff",
        }}
      >
        GitHub Tracker
      </h1>

      <p
        style={{
          ...styles.subtitle,
          color: isLight ? "#475569" : "#cbd5e1",
        }}
      >
        
      </p>

      <input
        style={{
          ...styles.input,
          backgroundColor: isLight ? "#ffffff" : "#111827",
          color: isLight ? "#111827" : "#ffffff",
          border: isLight ? "1px solid #cbd5e1" : "1px solid #475569",
        }}
        type="text"
        placeholder="GitHub Username"
        value={githubUsername}
        onChange={(e) => setGithubUsername(e.target.value)}
      />

      <button style={styles.button} onClick={fetchGithubData}>
        {loading ? "Fetching..." : "Fetch GitHub Data"}
      </button>

      <div
        style={{
          ...styles.profileBox,
          background: isLight
            ? "linear-gradient(145deg,#ffffff,#f1f5f9)"
            : "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(30,41,59,0.96))",
          border: isLight
            ? "1px solid #cbd5e1"
            : "1px solid rgba(99,102,241,0.5)",
          boxShadow: isLight
            ? "0 8px 25px rgba(15,23,42,0.12)"
            : "0 0 20px rgba(99,102,241,0.3), 0 0 50px rgba(59,130,246,0.15)",
          color: isLight ? "#111827" : "#ffffff",
        }}
      >
        {!profile && !loading && (
          <p
            style={{
              ...styles.subtitle,
              color: isLight ? "#475569" : "#cbd5e1",
            }}
          >
            Search and analyze GitHub profiles.
          </p>
        )}

        {profile && (
          <>
            <img
              src={profile.avatar_url}
              style={styles.avatar}
              alt="GitHub Avatar"
            />

            <h2
              style={{
                ...styles.name,
                color: isLight ? "#111827" : "#ffffff",
              }}
            >
              {profile.name || profile.login}
            </h2>

            <p style={styles.username}>@{profile.login}</p>

            {profile.bio && (
              <p
                style={{
                  ...styles.bio,
                  color: isLight ? "#475569" : "#cbd5e1",
                }}
              >
                {profile.bio}
              </p>
            )}

            <div style={styles.statsGrid}>
              <div
                style={{
                  ...styles.statCard,
                  background: isLight ? "#ffffff" : "rgba(15,23,42,0.85)",
                  border: isLight
                    ? "1px solid #cbd5e1"
                    : "1px solid rgba(99,102,241,0.35)",
                  color: isLight ? "#111827" : "#ffffff",
                }}
              >
                <h3>{profile.public_repos}</h3>
                <p>Repositories</p>
              </div>

              <div
                style={{
                  ...styles.statCard,
                  background: isLight ? "#ffffff" : "rgba(15,23,42,0.85)",
                  border: isLight
                    ? "1px solid #cbd5e1"
                    : "1px solid rgba(99,102,241,0.35)",
                  color: isLight ? "#111827" : "#ffffff",
                }}
              >
                <h3>{profile.followers}</h3>
                <p>Followers</p>
              </div>

              <div
                style={{
                  ...styles.statCard,
                  background: isLight ? "#ffffff" : "rgba(15,23,42,0.85)",
                  border: isLight
                    ? "1px solid #cbd5e1"
                    : "1px solid rgba(99,102,241,0.35)",
                  color: isLight ? "#111827" : "#ffffff",
                }}
              >
                <h3>{profile.following}</h3>
                <p>Following</p>
              </div>
            </div>

            <h1 style={styles.score}>GitHub Score: {score}/100</h1>

            <a
              href={profile.html_url}
              target="_blank"
              rel="noreferrer"
              style={styles.link}
            >
              View GitHub Profile
            </a>
          </>
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
    marginBottom: "8px",
  },

  subtitle: {
    marginBottom: "25px",
  },

  input: {
    width: "80%",
    padding: "15px",
    borderRadius: "12px",
    fontSize: "16px",
    boxSizing: "border-box",
    outline: "none",
  },

  button: {
    width: "84%",
    padding: "15px",
    marginTop: "18px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(90deg,#7c3aed,#2563eb)",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },

  profileBox: {
    marginTop: "30px",
    padding: "35px",
    borderRadius: "24px",
  },

  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "4px solid #6366f1",
    boxShadow: "0 0 25px rgba(99,102,241,0.6)",
  },

  name: {
    fontSize: "28px",
    marginTop: "18px",
    marginBottom: "5px",
  },

  username: {
    color: "#2563eb",
    marginBottom: "14px",
    fontWeight: "bold",
  },

  bio: {
    maxWidth: "650px",
    margin: "0 auto 22px",
    lineHeight: "1.6",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "18px",
    marginTop: "25px",
  },

  statCard: {
    padding: "20px",
    borderRadius: "18px",
  },

  score: {
    color: "#7c3aed",
    fontSize: "32px",
    marginTop: "25px",
  },

  link: {
    display: "inline-block",
    marginTop: "12px",
    color: "#2563eb",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

export default Github;