import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const settings = [
    { title: " Account Settings", path: "/settings/account" },
    { title: " Theme Settings", path: "/settings/theme" },
    { title: "Notification Settings", path: "/settings/notifications" },
    { title: "Security Settings", path: "/settings/security" },
    { title: " Data & Privacy", path: "/settings/privacy" },
    
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⚙️ Settings</h1>

      <div style={styles.card}>
        {settings.map((item, index) => (
          <div
            key={index}
            style={styles.row}
            onClick={() => navigate(item.path)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { textAlign: "center" },
  title: { fontSize: "38px", marginBottom: "25px" },
  card: {
    maxWidth: "650px",
    margin: "0 auto",
    padding: "25px",
    borderRadius: "22px",
    background:
      "linear-gradient(145deg, rgba(30,41,59,0.85), rgba(15,23,42,0.9))",
    border: "1px solid rgba(99,102,241,0.4)",
  },
  row: {
    padding: "18px",
    marginBottom: "14px",
    borderRadius: "14px",
    background: "rgba(15,23,42,0.75)",
    border: "1px solid #334155",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "left",
    cursor: "pointer",
  },
};

export default Settings;