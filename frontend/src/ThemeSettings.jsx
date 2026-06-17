import { useNavigate } from "react-router-dom";

function ThemeSettings({ theme, setTheme }) {
  const navigate = useNavigate();
  const isLight = theme === "light";

  const changeTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

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
         Theme Settings
      </h1>

      <div
        style={{
          ...styles.previewBox,
          background: isLight ? "#ffffff" : "rgba(15,23,42,0.9)",
          color: isLight ? "#111827" : "#ffffff",
          border: isLight ? "1px solid #cbd5e1" : "1px solid #475569",
        }}
      >
        <h2 style={{ color: isLight ? "#111827" : "#ffffff" }}>
          Current Theme
        </h2>

        <p
          style={{
            color: isLight ? "#1e293b" : "#cbd5e1",
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          {isLight ? "☀️ Light Mode Enabled" : "🌙 Dark Mode Enabled"}
        </p>
      </div>

      <button style={styles.button} onClick={() => changeTheme("dark")}>
        🌙 Dark Mode
      </button>

      <button style={styles.button} onClick={() => changeTheme("light")}>
        ☀️ Light Mode
      </button>

      <button style={styles.back} onClick={() => navigate("/settings")}>
         Back
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
  },

  title: {
    marginBottom: "25px",
    fontSize: "36px",
    fontWeight: "bold",
  },

  previewBox: {
    padding: "28px",
    borderRadius: "18px",
    marginBottom: "25px",
    boxShadow: "0 0 20px rgba(99,102,241,0.18)",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginBottom: "12px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(90deg,#7c3aed,#2563eb)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
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
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default ThemeSettings;