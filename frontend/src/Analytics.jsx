import { useContext } from "react";
import { ScoreContext } from "./ScoreContext";

function Analytics({ theme }) {
  const { githubScore, leetcodeScore, resumeScore } = useContext(ScoreContext);
  const isLight = theme === "light";

  const overall = Math.round(
    ((githubScore || 0) + (leetcodeScore || 0) + (resumeScore || 0)) / 3
  );

  const scoreCards = [
    { title: "GitHub Score", value: githubScore || 0 },
    { title: "LeetCode Score", value: leetcodeScore || 0 },
    { title: "Resume Score", value: resumeScore || 0 },
  ];

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
        Analytics
      </h1>

      <div style={styles.grid}>
        {scoreCards.map((item, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              background: isLight ? "#ffffff" : "rgba(30,41,59,0.75)",
              border: isLight
                ? "1px solid #cbd5e1"
                : "1px solid rgba(99,102,241,0.4)",
              color: isLight ? "#111827" : "#ffffff",
              boxShadow: isLight
                ? "0 8px 25px rgba(15,23,42,0.12)"
                : "0 0 20px rgba(99,102,241,0.18)",
            }}
          >
            {item.title}
            <h2 style={styles.scoreText}>{item.value}/100</h2>
          </div>
        ))}
      </div>

      <div
        style={{
          ...styles.overallBox,
          background: isLight
            ? "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(241,245,249,0.95))"
            : "linear-gradient(90deg, rgba(124,58,237,0.3), rgba(37,99,235,0.3))",
          border: isLight
            ? "1px solid #cbd5e1"
            : "1px solid rgba(99,102,241,0.5)",
          color: isLight ? "#111827" : "#ffffff",
          boxShadow: isLight
            ? "0 8px 25px rgba(15,23,42,0.12)"
            : "0 0 20px rgba(99,102,241,0.18)",
        }}
      >
        <h2>🏆 Overall Progress</h2>
        <h1 style={styles.overallText}>{overall}%</h1>

        <div
          style={{
            ...styles.progressBar,
            backgroundColor: isLight ? "#e2e8f0" : "#334155",
          }}
        >
          <div style={{ ...styles.progressFill, width: `${overall}%` }}></div>
        </div>
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
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "25px",
  },

  card: {
    padding: "25px",
    borderRadius: "18px",
    fontWeight: "bold",
  },

  scoreText: {
    color: "#7c3aed",
    marginTop: "15px",
  },

  overallBox: {
    marginTop: "30px",
    padding: "30px",
    borderRadius: "22px",
  },

  overallText: {
    color: "#7c3aed",
    fontSize: "46px",
  },

  progressBar: {
    height: "14px",
    borderRadius: "20px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#8b5cf6,#3b82f6)",
  },
};

export default Analytics;