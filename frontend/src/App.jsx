import { useState, useEffect } from "react";
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
import DigitalWellbeing from "./DigitalWellbeing";

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const isLight = theme === "light";

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!user) return;

    const timer = setInterval(() => {
      const today = new Date().toISOString().split("T")[0];
      const dailyKey = `gradifyUsage_${today}`;
      const weeklyKey = "gradifyWeeklyUsage";

      const dailyUsage = Number(localStorage.getItem(dailyKey)) || 0;
      const weeklyUsage = Number(localStorage.getItem(weeklyKey)) || 0;

      localStorage.setItem(dailyKey, dailyUsage + 1);
      localStorage.setItem(weeklyKey, weeklyUsage + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [user]);

  if (showLanding) {
    return <Landing onStart={() => setShowLanding(false)} />;
  }

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <BrowserRouter>
      <div style={isLight ? styles.lightPage : styles.page}>
        <div style={isLight ? styles.lightTopbar : styles.topbar}>
          <button
            style={styles.menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <h2 style={isLight ? styles.lightLogo : styles.logo}>🎓 Gradify</h2>

          <button style={styles.logout} onClick={() => setUser(null)}>
            Logout
          </button>
        </div>

        {menuOpen && (
          <div style={isLight ? styles.lightMenuBox : styles.menuBox}>
            <NavLink to="/profile" style={linkStyle} onClick={() => setMenuOpen(false)}>Profile</NavLink>
            <NavLink to="/" style={linkStyle} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/github" style={linkStyle} onClick={() => setMenuOpen(false)}>GitHub</NavLink>
            <NavLink to="/leetcode" style={linkStyle} onClick={() => setMenuOpen(false)}>LeetCode</NavLink>
            <NavLink to="/challenge" style={linkStyle} onClick={() => setMenuOpen(false)}>Challenges</NavLink>
            <NavLink to="/leaderboard" style={linkStyle} onClick={() => setMenuOpen(false)}>Rank</NavLink>
            <NavLink to="/resume" style={linkStyle} onClick={() => setMenuOpen(false)}>Resume</NavLink>
            <NavLink to="/analytics" style={linkStyle} onClick={() => setMenuOpen(false)}>Analytics</NavLink>
            <NavLink to="/settings" style={linkStyle} onClick={() => setMenuOpen(false)}>Settings</NavLink>
          </div>
        )}

        <main style={isLight ? styles.lightMain : styles.main}>
          <Routes>
            <Route path="/" element={<Dashboard theme={theme} />} />
            <Route path="/profile" element={<Profile theme={theme} />} />
            <Route path="/github" element={<Github theme={theme} />} />
            <Route path="/leetcode" element={<Leetcode theme={theme} />} />
            <Route path="/challenge" element={<Challenge theme={theme} />} />
            <Route path="/leaderboard" element={<Leaderboard theme={theme} />} />
            <Route path="/resume" element={<Resume theme={theme} />} />
            <Route path="/analytics" element={<Analytics theme={theme} />} />
            <Route path="/settings" element={<Settings theme={theme} />} />
            <Route path="/settings/account" element={<AccountSettings theme={theme} />} />

            <Route
              path="/settings/theme"
              element={<ThemeSettings theme={theme} setTheme={setTheme} />}
            />

            <Route
              path="/settings/notifications"
              element={<NotificationSettings theme={theme} />}
            />

            <Route
              path="/settings/security"
              element={<SecuritySettings theme={theme} />}
            />

            <Route path="/settings/privacy" element={<PrivacySettings theme={theme} />} />

            <Route
              path="/settings/digital-wellbeing"
              element={<DigitalWellbeing theme={theme} />}
            />
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
    textAlign: "center",
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
    boxSizing: "border-box",
  },

  lightPage: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(59,130,246,0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(168,85,247,0.18), transparent 30%), linear-gradient(135deg, #f8fafc, #e0f2fe)",
    color: "#111827",
    fontFamily: "Arial, sans-serif",
    padding: "25px",
    boxSizing: "border-box",
  },

  topbar: {
  width: "95%",
  maxWidth: "1600px",
  margin: "0 auto 25px",
  padding: "12px",
  borderRadius: "22px",
  background: "rgba(15,23,42,0.9)",
  border: "1px solid rgba(99,102,241,0.45)",
  display: "grid",
  gridTemplateColumns: "55px 1fr 90px",
  alignItems: "center",
  gap: "10px",
  boxShadow: "0 0 30px rgba(99,102,241,0.25)",
  boxSizing: "border-box",
},

lightTopbar: {
  width: "95%",
  maxWidth: "1600px",
  margin: "0 auto 25px",
  padding: "12px",
  borderRadius: "22px",
  background: "rgba(255,255,255,0.9)",
  border: "1px solid rgba(59,130,246,0.25)",
  display: "grid",
  gridTemplateColumns: "55px 1fr 90px",
  alignItems: "center",
  gap: "10px",
  boxShadow: "0 0 25px rgba(59,130,246,0.18)",
  boxSizing: "border-box",
},

menuButton: {
  width: "55px",
  height: "45px",
  fontSize: "22px",
  background: "linear-gradient(90deg,#7c3aed,#2563eb)",
  color: "white",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
},

logo: {
  margin: 0,
  fontSize: "clamp(18px, 5vw, 26px)",
  color: "white",
  textAlign: "center",
  whiteSpace: "nowrap",
},

lightLogo: {
  margin: 0,
  fontSize: "clamp(18px, 5vw, 26px)",
  color: "#111827",
  textAlign: "center",
  whiteSpace: "nowrap",
},

logout: {
  width: "90px",
  height: "45px",
  border: "none",
  borderRadius: "12px",
  background: "linear-gradient(90deg,#ef4444,#dc2626)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "14px",
},

  menuBox: {
    width: "95%",
    maxWidth: "1600px",
    margin: "0 auto 25px",
    padding: "18px",
    borderRadius: "20px",
    background: "rgba(15,23,42,0.95)",
    border: "1px solid rgba(99,102,241,0.45)",
    boxShadow: "0 0 25px rgba(99,102,241,0.2)",
    boxSizing: "border-box",
  },

  lightMenuBox: {
    width: "95%",
    maxWidth: "1600px",
    margin: "0 auto 25px",
    padding: "18px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(59,130,246,0.25)",
    boxShadow: "0 0 25px rgba(59,130,246,0.18)",
    boxSizing: "border-box",
  },

  main: {
    width: "95%",
    maxWidth: "1600px",
    margin: "0 auto",
    padding: "40px",
    borderRadius: "32px",
    background:
      "radial-gradient(circle at top left, rgba(168,85,247,0.16), transparent 35%), radial-gradient(circle at bottom right, rgba(59,130,246,0.16), transparent 35%), linear-gradient(145deg, rgba(15,23,42,0.96), rgba(30,41,59,0.9))",
    border: "1px solid rgba(99,102,241,0.6)",
    boxShadow:
      "0 0 30px rgba(99,102,241,0.35), 0 0 90px rgba(59,130,246,0.18)",
    boxSizing: "border-box",
  },

  lightMain: {
    width: "95%",
    maxWidth: "1600px",
    margin: "0 auto",
    padding: "40px",
    borderRadius: "32px",
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(59,130,246,0.25)",
    boxShadow: "0 0 35px rgba(59,130,246,0.18)",
    boxSizing: "border-box",
    color: "#111827",
  },
};

export default App;