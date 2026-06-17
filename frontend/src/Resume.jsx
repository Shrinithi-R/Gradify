import { useState, useContext } from "react";
import { ScoreContext } from "./ScoreContext";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function Resume({ theme }) {
  const { setResumeScore } = useContext(ScoreContext);
  const isLight = theme === "light";

  const [fileName, setFileName] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [skillsFound, setSkillsFound] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload PDF file only");
      return;
    }

    setFileName(file.name);
    setUploaded(true);
    setLoading(true);
    setScore(0);
    setResumeScore(0);
    setMessage("");
    setSkillsFound([]);
    setMissingSkills([]);
    setSuggestions([]);
    setResumeText("");

    const reader = new FileReader();

    reader.onload = async function () {
      try {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => item.str).join(" ");
          text += pageText + " ";
        }

        setResumeText(text.toLowerCase());
      } catch (error) {
        alert("Unable to read this PDF. Please try another resume.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  }

  function analyzeResume() {
    if (!uploaded) {
      alert("Please upload your resume PDF first");
      return;
    }

    if (loading) {
      alert("Resume is still loading. Please wait.");
      return;
    }

    if (resumeText.trim() === "") {
      alert("Could not read resume text. Please try another PDF.");
      return;
    }

    const requiredSkills = [
      "java",
      "oops",
      "object oriented",
      "sql",
      "dsa",
      "data structures",
      "javascript",
      "react",
      "html",
      "css",
      "github",
    ];

    const found = requiredSkills.filter((skill) => resumeText.includes(skill));
    const missing = requiredSkills.filter(
      (skill) => !resumeText.includes(skill)
    );

    const foundCount = found.length;
    const missingCount = missing.length;
    const totalSkills = requiredSkills.length;

    let calculatedScore = (foundCount / totalSkills) * 80;

    if (resumeText.includes("project")) calculatedScore += 5;

    if (
      resumeText.includes("certificate") ||
      resumeText.includes("certification") ||
      resumeText.includes("certified")
    ) {
      calculatedScore += 5;
    }

    if (resumeText.includes("internship")) calculatedScore += 5;
    if (resumeText.includes("github")) calculatedScore += 3;
    if (resumeText.includes("leetcode")) calculatedScore += 2;

    calculatedScore -= missingCount * 2;

    if (calculatedScore < 0) calculatedScore = 0;
    if (calculatedScore > 100) calculatedScore = 100;

    calculatedScore = Math.round(calculatedScore);

    const tips = [];

    if (missing.includes("java")) {
      tips.push("Add Java clearly because Zoho focuses on programming basics.");
    }

    if (missing.includes("oops") && missing.includes("object oriented")) {
      tips.push("Mention OOPS concepts in your resume.");
    }

    if (missing.includes("dsa") && missing.includes("data structures")) {
      tips.push("Add DSA or problem-solving practice.");
    }

    if (missing.includes("sql")) {
      tips.push("Add SQL/database skills.");
    }

    if (!resumeText.includes("project")) {
      tips.push("Add 2–3 strong projects with GitHub links.");
    }

    if (
      !resumeText.includes("certificate") &&
      !resumeText.includes("certification") &&
      !resumeText.includes("certified")
    ) {
      tips.push("Add relevant certifications.");
    }

    if (tips.length === 0) {
      tips.push(
        "Your resume is well aligned with the dream company requirements."
      );
    }

    setScore(calculatedScore);
    setSkillsFound(found.map((skill) => skill.toUpperCase()));
    setMissingSkills(missing.map((skill) => skill.toUpperCase()));
    setSuggestions(tips);

    if (calculatedScore >= 85) {
      setMessage("🟢 Strong Resume for Zoho");
    } else if (calculatedScore >= 70) {
      setMessage("🟡 Placement Ready");
    } else if (calculatedScore >= 50) {
      setMessage("🟠 Needs Skill Improvement");
    } else {
      setMessage("🔴 Resume Needs Major Improvement");
    }
  }

  return (
    <div
      style={{
        ...styles.container,
        color: isLight ? "#111827" : "#ffffff",
      }}
    >
      <h1
        style={{
          ...styles.title,
          color: isLight ? "#111827" : "#ffffff",
        }}
      >
        Resume Analyzer
      </h1>
        <br></br>
      <p
        style={{
          ...styles.subtitle,
          color: isLight ? "#475569" : "#cbd5e1",
        }}
      >
        Upload your resume PDF
      </p>

      <div
        style={{
          ...styles.uploadBox,
          background: isLight
            ? "linear-gradient(145deg,#ffffff,#f1f5f9)"
            : "linear-gradient(145deg, rgba(30,41,59,0.85), rgba(15,23,42,0.9))",
          border: isLight ? "2px dashed #60a5fa" : "2px dashed #6366f1",
          boxShadow: isLight
            ? "0 8px 25px rgba(15,23,42,0.12)"
            : "0 0 25px rgba(99,102,241,0.2)",
        }}
      >
        <label style={styles.uploadButton}>
          Choose PDF
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            style={styles.hiddenInput}
          />
        </label>

        <p
          style={{
            ...styles.fileText,
            color: isLight ? "#475569" : "#cbd5e1",
          }}
        >
          {uploaded ? `✅ Uploaded: ${fileName}` : "No file uploaded yet"}
        </p>

        {loading && (
          <p
            style={{
              ...styles.fileText,
              color: isLight ? "#475569" : "#cbd5e1",
            }}
          >
            Reading resume...
          </p>
        )}
      </div>

      <button style={styles.button} onClick={analyzeResume}>
        Analyze Resume
      </button>

      <div
        style={{
          ...styles.card,
          background: isLight ? "#ffffff" : "rgba(30,41,59,0.7)",
          border: isLight ? "1px solid #cbd5e1" : "1px solid #334155",
          color: isLight ? "#111827" : "#ffffff",
          boxShadow: isLight ? "0 8px 25px rgba(15,23,42,0.1)" : "none",
        }}
      >
        <h2 style={{ color: isLight ? "#111827" : "#ffffff" }}>Score</h2>

        <h1 style={styles.score}>{score}/100</h1>
        <br></br>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${score}%` }}></div>
        </div>

        <h3 style={{ color: isLight ? "#334155" : "#ffffff" }}>
          {message || "Upload and analyze your resume to get feedback"}
        </h3>
      </div>

      {score > 0 && (
        <div style={styles.analysisGrid}>
          <div
            style={{
              ...styles.analysisCard,
              background: isLight ? "#ffffff" : "rgba(15,23,42,0.75)",
              border: isLight ? "1px solid #cbd5e1" : "1px solid #334155",
              color: isLight ? "#111827" : "#ffffff",
            }}
          >
            <h2>✅ Skills Found</h2>
            {skillsFound.map((skill, index) => (
              <span key={index} style={styles.skillBadge}>
                {skill}
              </span>
            ))}
          </div>

          <div
            style={{
              ...styles.analysisCard,
              background: isLight ? "#ffffff" : "rgba(15,23,42,0.75)",
              border: isLight ? "1px solid #cbd5e1" : "1px solid #334155",
              color: isLight ? "#111827" : "#ffffff",
            }}
          >
            <h2>❌ Missing Skills</h2>
            {missingSkills.map((skill, index) => (
              <span key={index} style={styles.missingBadge}>
                {skill}
              </span>
            ))}
          </div>

          <div
            style={{
              ...styles.suggestionBox,
              background: isLight ? "#ffffff" : "rgba(15,23,42,0.75)",
              border: isLight ? "1px solid #cbd5e1" : "1px solid #334155",
              color: isLight ? "#111827" : "#ffffff",
            }}
          >
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
    marginBottom: "25px",
  },

  uploadBox: {
    padding: "35px",
    borderRadius: "22px",
    marginBottom: "22px",
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
  },

  score: {
    fontSize: "48px",
    color: "#7c3aed",
    margin: "10px 0",
  },

  progressBar: {
    height: "12px",
    backgroundColor: "#cbd5e1",
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
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  analysisCard: {
    padding: "22px",
    borderRadius: "18px",
  },

  skillBadge: {
    display: "inline-block",
    margin: "6px",
    padding: "8px 14px",
    borderRadius: "20px",
    background: "rgba(34,197,94,0.2)",
    color: "#15803d",
    fontWeight: "bold",
  },

  missingBadge: {
    display: "inline-block",
    margin: "6px",
    padding: "8px 14px",
    borderRadius: "20px",
    background: "rgba(239,68,68,0.2)",
    color: "#dc2626",
    fontWeight: "bold",
  },

  suggestionBox: {
    gridColumn: "1 / -1",
    padding: "22px",
    borderRadius: "18px",
    textAlign: "left",
  },
};

export default Resume;