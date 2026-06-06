import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const actions = [
    {
      icon: "",
      title: "Profile",
      text: "Create and manage your student profile",
      path: "/profile",
    },
    {
      icon: "",
      title: "GitHub Tracker",
      text: "Check your repositories and GitHub score",
      path: "/github",
    },
    {
      icon: "",
      title: "LeetCode Tracker",
      text: "Track coding practice and problem solving",
      path: "/leetcode",
    },
    {
      icon: "",
      title: "Resume Analyzer",
      text: "Upload resume and check ATS readiness",
      path: "/resume",
    },
    {
      icon: "",
      title: "Challenges",
      text: "Complete weekly placement tasks",
      path: "/challenge",
    },
    {
      icon: "",
      title: "Rank",
      text: "View your leaderboard position",
      path: "/leaderboard",
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎓 Gradify</h1>
 <br></br>
      <p style={styles.subtitle}>
        Choose what you want to improve today
      </p>

      <div style={styles.grid}>
        {actions.map((item, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => navigate(item.path)}
          >
            <div style={styles.icon}>{item.icon}</div>
            <h2>{item.title}</h2>
            <p style={styles.text}>{item.text}</p>
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
    color: "#cbd5e1",
    fontSize: "20px",
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
    background:
      "linear-gradient(145deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95))",
    border: "1px solid rgba(99,102,241,0.45)",
    cursor: "pointer",
    transition: "0.3s",
    minHeight: "190px",
  },

  icon: {
    fontSize: "45px",
  },

  text: {
    color: "#cbd5e1",
    lineHeight: "1.6",
  },
};

export default Dashboard;