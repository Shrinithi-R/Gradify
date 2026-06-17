import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NotificationSettings() {
  const navigate = useNavigate();

  const defaultSettings = {
    masterNotification: true,
    dailyChallenge: true,
    resumeAlerts: true,
    weeklyReport: true,
    placementTips: true,
    achievementAlerts: true,
    githubUpdates: true,
    leetcodeReminder: true,
    notificationTime: "08:00",
  };

  const [settings, setSettings] = useState(defaultSettings);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("gradifyNotifications");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);

      if (
        settings.masterNotification &&
        currentTime === settings.notificationTime &&
        Notification.permission === "granted"
      ) {
        new Notification("Gradify Reminder 🚀", {
          body: "Time to improve your GitHub, LeetCode, resume, and placement readiness!",
          icon: "/logo.png",
        });
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [settings]);

  const askPermission = async () => {
    if (!("Notification" in window)) {
      setMessage("This browser does not support notifications ❌");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      setMessage("Notifications permission allowed ✅");
      new Notification("Gradify Notifications Enabled 🔔", {
        body: "You will receive Gradify reminders at your selected time.",
      });
    } else {
      setMessage("Notification permission denied ❌");
    }
  };

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setMessage("");
  };

  const handleTimeChange = (e) => {
    setSettings((prev) => ({
      ...prev,
      notificationTime: e.target.value,
    }));
    setMessage("");
  };

  const saveSettings = () => {
    localStorage.setItem("gradifyNotifications", JSON.stringify(settings));
    setMessage("Settings saved successfully ✅");
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem("gradifyNotifications", JSON.stringify(defaultSettings));
    setMessage("Settings reset successfully 🔄");
  };

  const sendTestNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("Test Notification 🔔", {
        body: "This is a test notification from Gradify.",
      });
    } else {
      setMessage("Please allow notification permission first.");
    }
  };

  const notificationItems = [
    ["dailyChallenge", "Daily Challenge Reminder"],
    ["resumeAlerts", "Resume Improvement Alerts"],
    ["weeklyReport", "Weekly Progress Report"],
    ["placementTips", "Placement Readiness Tips"],
    ["achievementAlerts", "Achievement Alerts"],
    ["githubUpdates", "GitHub Activity Updates"],
    ["leetcodeReminder", "LeetCode Streak Reminder"],
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1> Notification Settings</h1>

        <br></br>

        <div style={styles.card}>
          <div style={styles.row}>
            <span>Main Notifications</span>
            <button
              style={settings.masterNotification ? styles.onBtn : styles.offBtn}
              onClick={() => handleToggle("masterNotification")}
            >
              {settings.masterNotification ? "ON ✅" : "OFF ❌"}
            </button>
          </div>

          <div style={styles.row}>
            <span>Notification Time</span>
            <input
              type="time"
              value={settings.notificationTime}
              onChange={handleTimeChange}
              style={styles.input}
              disabled={!settings.masterNotification}
            />
          </div>

          {notificationItems.map(([key, title]) => (
            <div style={styles.row} key={key}>
              <span>{title}</span>
              <button
                disabled={!settings.masterNotification}
                style={settings[key] ? styles.onBtn : styles.offBtn}
                onClick={() => handleToggle(key)}
              >
                {settings[key] ? "ON" : "OFF"}
              </button>
            </div>
          ))}
        </div>

        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.buttonGroup}>
          <button style={styles.permissionBtn} onClick={askPermission}>
            Allow Notifications
          </button>

          <button style={styles.testBtn} onClick={sendTestNotification}>
            Test Notification
          </button>

          <button style={styles.saveBtn} onClick={saveSettings}>
            Save
          </button>

          <button style={styles.resetBtn} onClick={resetSettings}>
            Reset
          </button>
        </div>

        <button style={styles.back} onClick={() => navigate("/settings")}>
           Back
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 20px",
    background: "linear-gradient(135deg,#020617,#0f172a,#111827)",
    color: "white",
  },

  container: {
    maxWidth: "850px",
    margin: "0 auto",
    textAlign: "center",
  },

  subtitle: {
    color: "#cbd5e1",
    marginBottom: "25px",
  },

  card: {
    background: "rgba(15,23,42,0.95)",
    padding: "25px",
    borderRadius: "22px",
    border: "1px solid rgba(99,102,241,0.5)",
    boxShadow: "0 0 25px rgba(99,102,241,0.25)",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    borderBottom: "1px solid #334155",
    gap: "20px",
  },

  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #475569",
    backgroundColor: "#020617",
    color: "white",
  },

  onBtn: {
    minWidth: "90px",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(90deg,#7c3aed,#2563eb)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  offBtn: {
    minWidth: "90px",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(90deg,#64748b,#475569)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  message: {
    color: "#86efac",
    fontWeight: "bold",
    marginTop: "18px",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    marginTop: "25px",
    flexWrap: "wrap",
  },

  permissionBtn: {
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(90deg,#06b6d4,#2563eb)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  testBtn: {
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(90deg,#a855f7,#6366f1)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  saveBtn: {
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(90deg,#22c55e,#16a34a)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  resetBtn: {
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(90deg,#f97316,#ef4444)",
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

export default NotificationSettings;