function Landing({ onStart }) {
  return (
    <div style={styles.page}>
      <div style={styles.content}>
        <h1 style={styles.title}>Gradify</h1>

        <h2 style={styles.heading}>Transform Learning Into Opportunities</h2>

        <p style={styles.subtitle}>
          Track your  Growth all in one place.
        </p>

        <button style={styles.button} onClick={onStart}>
           Start Your Journey
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #020617, #0f172a, #111827)",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },

  content: {
    textAlign: "center",
    maxWidth: "850px",
    padding: "40px 20px",
  },

  title: {
    fontSize: "90px",
    lineHeight: "1.2",
    margin: "0 0 25px",
    fontWeight: "900",
    letterSpacing: "2px",
    background: "linear-gradient(90deg,#a855f7,#3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  heading: {
    fontSize: "32px",
    margin: "0 0 18px",
  },

  subtitle: {
    color: "#cbd5e1",
    fontSize: "20px",
    lineHeight: "1.7",
    marginBottom: "35px",
  },

  button: {
    padding: "18px 42px",
    border: "none",
    borderRadius: "16px",
    background: "linear-gradient(90deg,#7c3aed,#2563eb)",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 0 28px rgba(99,102,241,0.45)",
  },
};

export default Landing;