import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SecuritySettings() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function changePassword() {
    const savedPassword = localStorage.getItem("password") || "gradify123";

    if (currentPassword !== savedPassword) {
      alert("Current password is wrong");
      return;
    }

    if (newPassword === "" || confirmPassword === "") {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem("password", newPassword);
    alert("Password changed successfully");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <div style={styles.container}>
      <h1> Security Settings</h1>

      <input style={styles.input} type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
      <input style={styles.input} type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <input style={styles.input} type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

      <button style={styles.button} onClick={changePassword}>Change Password</button>

      <button style={styles.back} onClick={() => navigate("/settings")}>
         Back
      </button>
    </div>
  );
}

const styles = {
  container: { maxWidth: "600px", margin: "0 auto", textAlign: "center" },
  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #475569",
    background: "#111827",
    color: "white",
    boxSizing: "border-box",
  },
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

export default SecuritySettings;