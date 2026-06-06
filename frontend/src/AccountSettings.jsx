import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AccountSettings() {
  const navigate = useNavigate();

  const [name, setName] = useState(localStorage.getItem("name") || "Shrinithi");
  const [college, setCollege] = useState(localStorage.getItem("college") || "Kumaraguru College of Technology");
  const [department, setDepartment] = useState(localStorage.getItem("department") || "Information Technology");

  function saveChanges() {
    localStorage.setItem("name", name);
    localStorage.setItem("college", college);
    localStorage.setItem("department", department);
    alert("Profile updated successfully");
  }

  return (
    <div style={styles.container}>
      <h1> Account Settings</h1>

      <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
      <input style={styles.input} value={college} onChange={(e) => setCollege(e.target.value)} />
      <input style={styles.input} value={department} onChange={(e) => setDepartment(e.target.value)} />

      <button style={styles.button} onClick={saveChanges}>Save Changes</button>

      <button style={styles.back} onClick={() => navigate("/settings")}>
        ⬅ Back
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

export default AccountSettings;