function Leaderboard() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}> Leaderboard</h1>

      <div style={styles.card}>
        <h2>🥇 Rank #1</h2>
        <p> Overall Score: 92</p>
        <p> GitHub Score: 85</p>
        <p> LeetCode Score: 95</p>
      </div>

      <div style={styles.card}>
        <h2>🥈 Rank #2</h2>
        <p> Overall Score: 88</p>
        <p> GitHub Score: 80</p>
        <p> LeetCode Score: 90</p>
      </div>

      <div style={styles.card}>
        <h2>🥉 Rank #3</h2>
        <p> Overall Score: 84</p>
        <p> GitHub Score: 75</p>
        <p> LeetCode Score: 88</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
  },
  title: {
    fontSize: "36px",
    marginBottom: "25px",
  },
  card: {
    background: "rgba(30,41,59,0.7)",
    border: "1px solid #334155",
    borderRadius: "18px",
    padding: "20px",
    marginBottom: "20px",
  },
};

export default Leaderboard;