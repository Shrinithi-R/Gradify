import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PrivacySettings({ theme }) {
  const navigate = useNavigate();
  const isLight = theme === "light";

  const [dataCount, setDataCount] = useState(0);

  useEffect(() => {
    setDataCount(localStorage.length);
  }, []);

  function downloadData() {
    const data = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      data[key] = localStorage.getItem(key);
    }

    const file = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(file);
    const a = document.createElement("a");

    a.href = url;
    a.download = "gradify-data.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  function clearLeaderboard() {
    const confirmClear = window.confirm(
      "Are you sure you want to clear leaderboard data?"
    );

    if (!confirmClear) return;

    localStorage.removeItem("gradifyLeaderboard");
    setDataCount(localStorage.length);
    alert("Leaderboard data cleared successfully");
  }

  function clearAllData() {
    const confirmClear = window.confirm(
      "This will clear all Gradify app data. Are you sure?"
    );

    if (!confirmClear) return;

    localStorage.clear();
    setDataCount(0);
    alert("All app data cleared successfully");
  }

  return (
    <div
      style={{
        ...styles.container,
        color: isLight ? "#111827" : "#ffffff",
      }}
    >
      <h1 style={styles.title}>🛡️ Data & Privacy</h1>

      <div
        style={{
          ...styles.infoBox,
          background: isLight ? "#ffffff" : "rgba(15,23,42,0.85)",
          border: isLight ? "1px solid #cbd5e1" : "1px solid #334155",
        }}
      >
        <h2>Stored App Data</h2>
        <p>{dataCount} saved data items found in this browser.</p>
      </div>

      <button style={styles.button} onClick={downloadData}>
        Download My Data
      </button>

      <button style={styles.warning} onClick={clearLeaderboard}>
        Clear Leaderboard Data
      </button>

      <button style={styles.danger} onClick={clearAllData}>
        Clear All App Data
      </button>

      <button style={styles.back} onClick={() => navigate("/settings")}>
         Back
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "650px",
    margin: "0 auto",
    textAlign: "center",
  },

  title: {
    fontSize: "36px",
    marginBottom: "25px",
  },

  infoBox: {
    padding: "24px",
    borderRadius: "18px",
    marginBottom: "24px",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginBottom: "12px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(90deg,#7c3aed,#2563eb)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  warning: {
    width: "100%",
    padding: "14px",
    marginBottom: "12px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(90deg,#f59e0b,#f97316)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  danger: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(90deg,#ef4444,#dc2626)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  back: {
    width: "180px",
    padding: "14px",
    marginTop: "30px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(90deg,#8b5cf6,#3b82f6)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default PrivacySettings;