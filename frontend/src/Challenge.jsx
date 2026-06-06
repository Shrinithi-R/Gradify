import { useState } from "react";

function Challenge() {
  const [tasks, setTasks] = useState([
    { text: "Solve 5 LeetCode Problems", done: false },
    { text: "Push 3 GitHub Commits", done: false },
    { text: "Update Resume Project Section", done: false },
    { text: "Learn One React Concept", done: false },
    { text: "Complete One Mini Project", done: false },
  ]);

  function toggleTask(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  }

  const completed = tasks.filter((task) => task.done).length;
  const progress = Math.round((completed / tasks.length) * 100);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}> Weekly Challenges</h1>

      <div style={styles.card}>
        {tasks.map((task, index) => (
          <label key={index} style={styles.task}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(index)}
            />
            {task.text}
          </label>
        ))}
      </div>

      <div style={styles.card}>
        <h2>Progress: {progress}%</h2>

        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
        </div>

        <h3>
          {progress === 100
            ? "🏆 Gold Badge Unlocked"
            : progress >= 60
            ? "🥈 Silver Badge Progress"
            : "🥉 Bronze Badge Progress"}
        </h3>
      </div>
    </div>
  );
}

const styles = {
  container: { textAlign: "center" },
  title: { fontSize: "34px", marginBottom: "25px" },
  card: {
    background: "rgba(30, 41, 59, 0.7)",
    border: "1px solid #334155",
    borderRadius: "18px",
    padding: "25px",
    marginBottom: "20px",
  },
  task: {
    display: "block",
    textAlign: "left",
    fontSize: "18px",
    marginBottom: "15px",
  },
  progressBar: {
    height: "12px",
    backgroundColor: "#334155",
    borderRadius: "20px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#8b5cf6,#3b82f6)",
  },
};

export default Challenge;