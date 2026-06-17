import { useNavigate } from "react-router-dom";

function Settings({ theme }) {
  const navigate = useNavigate();
  const isLight = theme === "light";

  const settings = [
    { title: "👤 Account Settings", path: "/settings/account" },
    { title: "🎨 Theme Settings", path: "/settings/theme" },
    { title: "🔔 Notification Settings", path: "/settings/notifications" },
    { title: "🔒 Security Settings", path: "/settings/security" },
    { title: "🛡️ Data & Privacy", path: "/settings/privacy" },
    { title: "📱 Digital Wellbeing", path: "/settings/digital-wellbeing" },
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
        ⚙️ Settings
      </h1>

      <div
        style={{
          ...styles.card,
          background: isLight
            ? "linear-gradient(145deg,#ffffff,#f1f5f9)"
            : "linear-gradient(145deg, rgba(30,41,59,0.85), rgba(15,23,42,0.9))",
          border: isLight
            ? "1px solid #cbd5e1"
            : "1px solid rgba(99,102,241,0.4)",
          boxShadow: isLight
            ? "0 8px 25px rgba(15,23,42,0.12)"
            : "0 0 20px rgba(99,102,241,0.18)",
        }}
      >
        {settings.map((item, index) => (
          <div
            key={index}
            style={{
              ...styles.row,
              background: isLight ? "#ffffff" : "rgba(15,23,42,0.75)",
              border: isLight ? "1px solid #cbd5e1" : "1px solid #334155",
              color: isLight ? "#111827" : "#ffffff",
            }}
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
  container: {
    textAlign: "center",
  },

  title: {
    fontSize: "38px",
    marginBottom: "25px",
  },

  card: {
    maxWidth: "650px",
    margin: "0 auto",
    padding: "25px",
    borderRadius: "22px",
  },

  row: {
    padding: "18px",
    marginBottom: "14px",
    borderRadius: "14px",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "left",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Settings;