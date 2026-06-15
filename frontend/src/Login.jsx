import { useState } from "react";

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  function handleLogin() {
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    onLogin(name);
  }

  function handleSignup() {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem("gradifyName", name);
    localStorage.setItem("gradifyEmail", email);
    localStorage.setItem("gradifyPassword", password);

    alert("Account created successfully");
    onLogin(name);
  }

  function forgotPassword() {
    alert("For demo purpose, you can enter any password and login.");
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎓 Gradify</h1>

        <br></br>
        <br></br>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          type="email"
          placeholder="Enter your email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isSignup && (
          <input
            style={styles.input}
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {!isSignup && (
          <p style={styles.forgot} onClick={forgotPassword}>
            Forgot Password?
          </p>
        )}

        <button
          style={styles.button}
          onClick={isSignup ? handleSignup : handleLogin}
        >
          {isSignup ? "Create Account" : "Login"}
        </button>

        <p style={styles.switchText}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span
            style={styles.switchLink}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>

        
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
    width: "430px",
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
    marginBottom: "8px",
  },

  subtitle: {
    color: "#cbd5e1",
    marginBottom: "22px",
  },

  input: {
    width: "100%",
    padding: "15px",
    marginBottom: "14px",
    borderRadius: "12px",
    border: "1px solid #475569",
    backgroundColor: "#111827",
    color: "white",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  forgot: {
    textAlign: "right",
    color: "#93c5fd",
    fontSize: "14px",
    marginTop: "-5px",
    marginBottom: "15px",
    cursor: "pointer",
  },

  button: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(90deg,#7c3aed,#2563eb)",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },

  switchText: {
    color: "#cbd5e1",
    marginTop: "18px",
  },

  switchLink: {
    color: "#93c5fd",
    fontWeight: "bold",
    cursor: "pointer",
  },

  demoText: {
    marginTop: "12px",
    fontSize: "13px",
    color: "#94a3b8",
  },
};

export default Login;