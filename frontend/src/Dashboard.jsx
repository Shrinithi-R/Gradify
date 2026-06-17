import { useNavigate } from "react-router-dom";

function Dashboard({ theme }) {
  const navigate = useNavigate();
  const isLight = theme === "light";

  const actions = [
    {
      
      title: "Profile",

      text: "Create and manage your student profile",
      path: "/profile",
      
    },
    {
      
      title: "GitHub Tracker",
      text: "Check your repositories and GitHub score",
      path: "/github",
    },
    {
      
      title: "LeetCode Tracker",
      text: "Track coding practice and problem solving",
      path: "/leetcode",
    },
    {
     
      title: "Resume Analyzer",
      text: "Upload resume and check ATS readiness",
      path: "/resume",
    },
    {
      
      title: "Challenges",
      text: "Complete weekly placement tasks",
      path: "/challenge",
    },
    {
      
      title: "Rank",
      text: "View your leaderboard position",
      path: "/leaderboard",
    },
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
        🎓 Gradify
      </h1>
      <br></br>
      <p
        style={{
          ...styles.subtitle,
          color: isLight ? "#475569" : "#cbd5e1",
        }}
      >
        Choose what you want to improve today
      </p>

      <div style={styles.grid}>
        {actions.map((item, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              background: isLight
                ? "linear-gradient(145deg,#ffffff,#f1f5f9)"
                : "linear-gradient(145deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95))",
              border: isLight
                ? "1px solid #cbd5e1"
                : "1px solid rgba(99,102,241,0.45)",
              boxShadow: isLight
                ? "0 8px 25px rgba(15,23,42,0.12)"
                : "0 0 25px rgba(99,102,241,0.2)",
              color: isLight ? "#111827" : "#ffffff",
            }}
            onClick={() => navigate(item.path)}
          >
            <div style={styles.icon}>{item.icon}</div>

            <h2
              style={{
                color: isLight ? "#111827" : "#ffffff",
              }}
            >
              {item.title}
            </h2>

            <p
              style={{
                ...styles.text,
                color: isLight ? "#475569" : "#cbd5e1",
              }}
            >
              {item.text}
            </p>
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
    fontSize: "52px",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "25px",
    marginBottom: "35px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
  },

  card: {
    padding: "28px",
    borderRadius: "24px", 
    cursor: "pointer",
    transition: "0.3s",
    minHeight: "190px",
  },

  icon: {
    fontSize: "45px",
  },

  text: {
    lineHeight: "2",
  },
};

export default Dashboard;