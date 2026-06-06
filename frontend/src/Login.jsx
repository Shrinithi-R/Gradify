import { useState } from "react";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (name.trim() === "" || password.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    const savedPassword = localStorage.getItem("password") || "gradify123";

    if (password !== savedPassword) {
      alert("Wrong Password");
      return;
    }

    onLogin(name);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎓 Gradify</h1>

        <input
          style={styles.input}
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(168,85,247,0.25), transparent 30%), radial-gradient(circle at bottom right, rgba(59,130,246,0.25), transparent 30%), linear-gradient(135deg, #020617, #0f172a, #111827)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "420px",
    padding: "40px",
    borderRadius: "28px",
    background:
      "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(30,41,59,0.9))",
    border: "1px solid rgba(99,102,241,0.6)",
    boxShadow: "0 0 40px rgba(99,102,241,0.35)",
    textAlign: "center",
  },
  title: {
    fontSize: "44px",
    marginBottom: "25px",
  },
  input: {
    width: "100%",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "1px solid #475569",
    backgroundColor: "#111827",
    color: "white",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "15px",
    marginTop: "8px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(90deg,#7c3aed,#2563eb)",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Login;