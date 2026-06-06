function Analytics() {
  const githubScore = 40;
  const leetcodeScore = 75;
  const resumeScore = 82;
  const overall = Math.round((githubScore + leetcodeScore + resumeScore) / 3);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}> Analytics</h1>

      <div style={styles.grid}>
        <div style={styles.card}> GitHub Score <h2>{githubScore}/100</h2></div>
        <div style={styles.card}> LeetCode Score <h2>{leetcodeScore}/100</h2></div>
        <div style={styles.card}> Resume Score <h2>{resumeScore}/100</h2></div>
      </div>

      <div style={styles.overallBox}>
        <h2>🏆 Overall Progress</h2>
        <h1>{overall}%</h1>

        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${overall}%` }}></div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { textAlign: "center" },
  title: { fontSize: "36px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "25px",
  },
  card: {
    padding: "25px",
    borderRadius: "18px",
    background: "rgba(30,41,59,0.75)",
    border: "1px solid rgba(99,102,241,0.4)",
    fontWeight: "bold",
  },
  overallBox: {
    marginTop: "30px",
    padding: "30px",
    borderRadius: "22px",
    background: "linear-gradient(90deg, rgba(124,58,237,0.3), rgba(37,99,235,0.3))",
    border: "1px solid rgba(99,102,241,0.5)",
  },
  progressBar: {
    height: "14px",
    backgroundColor: "#334155",
    borderRadius: "20px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#8b5cf6,#3b82f6)",
  },
};

export default Analytics;