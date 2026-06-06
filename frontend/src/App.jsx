import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Landing from "./Landing";
import Login from "./Login";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import Github from "./Github";
import Leetcode from "./Leetcode";
import Challenge from "./Challenge";
import Leaderboard from "./Leaderboard";
import Resume from "./Resume";
import Analytics from "./Analytics";
import Settings from "./Settings";
import AccountSettings from "./AccountSettings";
import ThemeSettings from "./ThemeSettings";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";
import PrivacySettings from "./PrivacySettings";

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  if (showLanding) {
    return <Landing onStart={() => setShowLanding(false)} />;
  }

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <BrowserRouter>
      <div style={styles.page}>
        <div style={styles.topbar}>
          <button
            style={styles.menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <h2 style={styles.logo}>🎓 Gradify</h2>

          <button style={styles.logout} onClick={() => setUser(null)}>
            Logout
          </button>
        </div>

        {menuOpen && (
          <div style={styles.menuBox}>
            <NavLink to="/profile" style={linkStyle}>Profile</NavLink>
            <NavLink to="/" style={linkStyle}>Home</NavLink>
            <NavLink to="/github" style={linkStyle}>GitHub</NavLink>
            <NavLink to="/leetcode" style={linkStyle}>LeetCode</NavLink>
            <NavLink to="/challenge" style={linkStyle}>Challenges</NavLink>
            <NavLink to="/leaderboard" style={linkStyle}>Rank</NavLink>
            <NavLink to="/resume" style={linkStyle}>Resume</NavLink>
            <NavLink to="/analytics" style={linkStyle}>Analytics</NavLink>
            <NavLink to="/settings" style={linkStyle}>Settings</NavLink>
          </div>
        )}

        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/github" element={<Github />} />
            <Route path="/leetcode" element={<Leetcode />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/account" element={<AccountSettings />} />
            <Route path="/settings/theme" element={<ThemeSettings />} />
            <Route path="/settings/notifications" element={<NotificationSettings />} />
            <Route path="/settings/security" element={<SecuritySettings />} />
            <Route path="/settings/privacy" element={<PrivacySettings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function linkStyle({ isActive }) {
  return {
    display: "block",
    padding: "13px 16px",
    marginBottom: "10px",
    borderRadius: "12px",
    textDecoration: "none",
    color: isActive ? "white" : "#cbd5e1",
    background: isActive
      ? "linear-gradient(90deg,#7c3aed,#2563eb)"
      : "rgba(15,23,42,0.7)",
    fontWeight: "bold",
  };
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(168,85,247,0.25), transparent 30%), radial-gradient(circle at bottom right, rgba(59,130,246,0.25), transparent 30%), linear-gradient(135deg, #020617, #0f172a, #111827)",
    color: "white",
    fontFamily: "Arial, sans-serif",
    padding: "25px",
  },

  topbar: {
    maxWidth: "1100px",
    margin: "0 auto 25px",
    padding: "18px 22px",
    borderRadius: "22px",
    background: "rgba(15,23,42,0.9)",
    border: "1px solid rgba(99,102,241,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 0 30px rgba(99,102,241,0.25)",
  },

  menuButton: {
    fontSize: "26px",
    background: "linear-gradient(90deg,#7c3aed,#2563eb)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "8px 14px",
    cursor: "pointer",
  },

  logo: {
    margin: 0,
    fontSize: "26px",
  },

  logout: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(90deg,#ef4444,#dc2626)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  menuBox: {
    maxWidth: "1100px",
    margin: "0 auto 25px",
    padding: "18px",
    borderRadius: "20px",
    background: "rgba(15,23,42,0.95)",
    border: "1px solid rgba(99,102,241,0.45)",
    boxShadow: "0 0 25px rgba(99,102,241,0.2)",
  },

  main: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px",
    borderRadius: "32px",
    background:
      "radial-gradient(circle at top left, rgba(168,85,247,0.16), transparent 35%), radial-gradient(circle at bottom right, rgba(59,130,246,0.16), transparent 35%), linear-gradient(145deg, rgba(15,23,42,0.96), rgba(30,41,59,0.9))",
    border: "1px solid rgba(99,102,241,0.6)",
    boxShadow:
      "0 0 30px rgba(99,102,241,0.35), 0 0 90px rgba(59,130,246,0.18)",
  },
};

export default App;