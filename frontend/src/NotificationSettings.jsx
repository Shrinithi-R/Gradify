import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NotificationSettings() {
  const navigate = useNavigate();
  const [notify, setNotify] = useState(false);

  return (
    <div style={styles.container}>
      <h1> Notification Settings</h1>

      <button style={styles.button} onClick={() => setNotify(!notify)}>
        {notify ? "Notifications ON ✅" : "Notifications OFF ❌"}
      </button>

      <button style={styles.back} onClick={() => navigate("/settings")}>
        ⬅ Back
      </button>
    </div>
  );
}

const styles = {
  container: { maxWidth: "600px", margin: "0 auto", textAlign: "center" },
  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(90deg,#7c3aed,#2563eb)",
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
    fontSize: "16px",
    cursor: "pointer",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 0 15px rgba(139,92,246,0.4)",
  },
};

export default NotificationSettings;