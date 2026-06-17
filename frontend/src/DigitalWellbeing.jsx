import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DigitalWellbeing({ theme }) {
  const navigate = useNavigate();
  const isLight = theme === "light";

  const [dailySeconds, setDailySeconds] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const currentDate = currentTime.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentDay = currentTime.toLocaleDateString("en-IN", {
    weekday: "long",
  });

  function getTodayKey() {
    const today = new Date().toISOString().split("T")[0];
    return `gradifyUsage_${today}`;
  }

  function loadUsage() {
    const daily = Number(localStorage.getItem(getTodayKey())) || 0;
    setDailySeconds(daily);
  }

  useEffect(() => {
    loadUsage();

    const refresh = setInterval(() => {
      loadUsage();
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(refresh);
  }, []);

  function formatTime(seconds) {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  }

  function resetToday() {
    localStorage.setItem(getTodayKey(), 0);
    loadUsage();
  }

  const dailyLimit = 2 * 60 * 60;
  const dailyPercent = Math.min((dailySeconds / dailyLimit) * 100, 100);

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
        Digital Wellbeing
      </h1>

      <div
        style={{
          ...styles.dateCard,
          background: isLight
            ? "linear-gradient(145deg,#ffffff,#f1f5f9)"
            : "linear-gradient(145deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95))",
          border: isLight
            ? "1px solid #cbd5e1"
            : "1px solid rgba(99,102,241,0.45)",
          boxShadow: isLight
            ? "0 8px 25px rgba(15,23,42,0.12)"
            : "0 0 25px rgba(99,102,241,0.25)",
        }}
      >
        <h2 style={{ ...styles.day, color: isLight ? "#111827" : "#ffffff" }}>
          {currentDay}
        </h2>

        <p
          style={{
            ...styles.date,
            color: isLight ? "#475569" : "#cbd5e1",
          }}
        >
          {currentDate}
        </p>
      </div>

      <div style={styles.grid}>
        <div
          style={{
            ...styles.card,
            background: isLight
              ? "linear-gradient(145deg,#ffffff,#f8fafc)"
              : "linear-gradient(145deg, rgba(30,41,59,0.85), rgba(15,23,42,0.9))",
            border: isLight
              ? "1px solid #cbd5e1"
              : "1px solid rgba(99,102,241,0.45)",
            boxShadow: isLight
              ? "0 8px 25px rgba(15,23,42,0.12)"
              : "0 0 25px rgba(99,102,241,0.25)",
            color: isLight ? "#111827" : "#ffffff",
          }}
        >
          <h2>Today's Usage</h2>

          <h1 style={styles.time}>{formatTime(dailySeconds)}</h1>

          <div
            style={{
              ...styles.progressBar,
              backgroundColor: isLight ? "#e2e8f0" : "#334155",
            }}
          >
            <div
              style={{ ...styles.progressFill, width: `${dailyPercent}%` }}
            ></div>
          </div>

          <p
            style={{
              ...styles.text,
              color: isLight ? "#475569" : "#cbd5e1",
            }}
          >
            Daily recommended limit: 2 hours
          </p>

          <button style={styles.resetButton} onClick={resetToday}>
            Reset Today
          </button>
        </div>
      </div>

      <button style={styles.backButton} onClick={() => navigate("/settings")}>
         Back
      </button>
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

  dateCard: {
    maxWidth: "700px",
    margin: "0 auto 25px",
    padding: "24px",
    borderRadius: "22px",
  },

  day: {
    fontSize: "30px",
    marginBottom: "8px",
  },

  date: {
    fontSize: "18px",
  },

  grid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "320px",
    padding: "32px",
    borderRadius: "24px",
  },

  time: {
    fontSize: "42px",
    color: "#7c3aed",
    margin: "18px 0",
  },

  progressBar: {
    height: "13px",
    borderRadius: "20px",
    overflow: "hidden",
    margin: "18px 0",
  },

  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#8b5cf6,#3b82f6)",
  },

  text: {
    lineHeight: "1.6",
  },

  resetButton: {
    marginTop: "16px",
    padding: "12px 24px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(90deg,#ef4444,#dc2626)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  backButton: {
    marginTop: "30px",
    padding: "14px 30px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(90deg,#7c3aed,#2563eb)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default DigitalWellbeing;