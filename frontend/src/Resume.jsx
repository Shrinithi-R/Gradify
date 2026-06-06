import { useState } from "react";

function Resume() {
  const [fileName, setFileName] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [skillsFound, setSkillsFound] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  function handleFileUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload PDF file only");
      return;
    }

    setFileName(file.name);
    setUploaded(true);
    setScore(0);
    setMessage("");
    setSkillsFound([]);
    setMissingSkills([]);
    setSuggestions([]);
  }

  function analyzeResume() {
    if (!uploaded) {
      alert("Please upload your resume PDF first");
      return;
    }

    const found = ["HTML", "CSS", "JavaScript", "GitHub"];
    const missing = ["React", "DSA", "SQL"];
    const tips = [
      "Add 2–3 strong projects with GitHub links.",
      "Mention tools and technologies clearly.",
      "Add measurable outcomes in project descriptions.",
    ];

    const calculatedScore = 82;

    setScore(calculatedScore);
    setSkillsFound(found);
    setMissingSkills(missing);
    setSuggestions(tips);

    if (calculatedScore >= 80) {
      setMessage("🟢 Strong Resume");
    } else if (calculatedScore >= 60) {
      setMessage("🟡 Good Resume, Need Improvement");
    } else {
      setMessage("🔴 Improve Skills and Projects");
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Resume Analyzer</h1>

      <p style={styles.subtitle}>
        Upload your resume PDF and get smart improvement suggestions.
      </p>

      <div style={styles.uploadBox}>
        <div style={styles.icon}></div>

        <label style={styles.uploadButton}>
          Choose PDF
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            style={styles.hiddenInput}
          />
        </label>

        <p style={styles.fileText}>
          {uploaded ? `✅ Uploaded: ${fileName}` : "No file uploaded yet"}
        </p>
      </div>

      <button style={styles.button} onClick={analyzeResume}>
        Analyze Resume
      </button>

      <div style={styles.card}>
        <h2>ATS Score</h2>

        <h1 style={styles.score}>{score}/100</h1>

        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${score}%` }}></div>
        </div>

        <h3>{message || "Upload and analyze your resume to get feedback."}</h3>
      </div>

      {score > 0 && (
        <div style={styles.analysisGrid}>
          <div style={styles.analysisCard}>
            <h2>✅ Skills Found</h2>
            {skillsFound.map((skill, index) => (
              <span key={index} style={styles.skillBadge}>
                {skill}
              </span>
            ))}
          </div>

          <div style={styles.analysisCard}>
            <h2>❌ Missing Skills</h2>
            {missingSkills.map((skill, index) => (
              <span key={index} style={styles.missingBadge}>
                {skill}
              </span>
            ))}
          </div>

          <div style={styles.suggestionBox}>
            <h2>💡 Suggestions</h2>
            {suggestions.map((tip, index) => (
              <p key={index}>• {tip}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
  },

  title: {
    fontSize: "36px",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#cbd5e1",
    marginBottom: "25px",
  },

  uploadBox: {
    padding: "35px",
    borderRadius: "22px",
    border: "2px dashed #6366f1",
    background:
      "linear-gradient(145deg, rgba(30,41,59,0.85), rgba(15,23,42,0.9))",
    marginBottom: "22px",
  },

  icon: {
    fontSize: "45px",
    marginBottom: "15px",
  },

  hiddenInput: {
    display: "none",
  },

  uploadButton: {
    display: "inline-block",
    padding: "14px 28px",
    borderRadius: "14px",
    background: "linear-gradient(90deg,#8b5cf6,#3b82f6)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  fileText: {
    marginTop: "18px",
    color: "#cbd5e1",
  },

  button: {
    width: "88%",
    padding: "15px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(90deg,#7c3aed,#2563eb)",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },

  card: {
    marginTop: "25px",
    padding: "28px",
    borderRadius: "20px",
    background: "rgba(30,41,59,0.7)",
    border: "1px solid #334155",
  },

  score: {
    fontSize: "48px",
    color: "#a855f7",
    margin: "10px 0",
  },

  progressBar: {
    height: "12px",
    backgroundColor: "#334155",
    borderRadius: "20px",
    overflow: "hidden",
    marginBottom: "18px",
  },

  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#8b5cf6,#3b82f6)",
  },

  analysisGrid: {
    marginTop: "25px",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },

  analysisCard: {
    padding: "22px",
    borderRadius: "18px",
    background: "rgba(15,23,42,0.75)",
    border: "1px solid #334155",
  },

  skillBadge: {
    display: "inline-block",
    margin: "6px",
    padding: "8px 14px",
    borderRadius: "20px",
    background: "rgba(34,197,94,0.2)",
    color: "#86efac",
    fontWeight: "bold",
  },

  missingBadge: {
    display: "inline-block",
    margin: "6px",
    padding: "8px 14px",
    borderRadius: "20px",
    background: "rgba(239,68,68,0.2)",
    color: "#fca5a5",
    fontWeight: "bold",
  },

  suggestionBox: {
    gridColumn: "1 / -1",
    padding: "22px",
    borderRadius: "18px",
    background: "rgba(15,23,42,0.75)",
    border: "1px solid #334155",
    textAlign: "left",
  },
};

export default Resume;