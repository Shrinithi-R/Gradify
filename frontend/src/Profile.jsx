import { useState } from "react";

function Profile() {
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [dreamCompany, setDreamCompany] = useState("");
  const [github, setGithub] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [linkedin, setLinkedin] = useState("");

  function createAccount() {
    const newAccount = {
      name,
      college,
      department,
      year,
      dreamCompany,
      github,
      leetcode,
      linkedin,
    };

    setAccounts([...accounts, newAccount]);

    setName("");
    setCollege("");
    setDepartment("");
    setYear("");
    setDreamCompany("");
    setGithub("");
    setLeetcode("");
    setLinkedin("");
    setShowAccountForm(false);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}> My Profile</h1>

     <div style={styles.card}>
  <p>
    <strong>Name:</strong>{" "}
    {localStorage.getItem("name") || "Shrinithi"}
  </p>

  <p>
    <strong>College:</strong>{" "}
    {localStorage.getItem("college") ||
      "Kumaraguru College of Technology"}
  </p>

  <p>
    <strong>Department:</strong>{" "}
    {localStorage.getItem("department") ||
      "Information Technology"}
  </p>

  <p><strong>Year:</strong> 2nd Year</p>

  <p><strong>Dream Company:</strong> Zoho</p>
        <button
          style={styles.button}
          onClick={() => setShowAccountForm(!showAccountForm)}
        >
          ➕ Add Account
        </button>

        {showAccountForm && (
          <div style={styles.accountBox}>
            <h2 style={styles.sectionTitle}>Create New Account</h2>

            <input style={styles.input} placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input style={styles.input} placeholder="Enter College" value={college} onChange={(e) => setCollege(e.target.value)} />
            <input style={styles.input} placeholder="Enter Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
            <input style={styles.input} placeholder="Enter Year" value={year} onChange={(e) => setYear(e.target.value)} />
            <input style={styles.input} placeholder="Dream Company" value={dreamCompany} onChange={(e) => setDreamCompany(e.target.value)} />
            <input style={styles.input} placeholder="GitHub Username" value={github} onChange={(e) => setGithub(e.target.value)} />
            <input style={styles.input} placeholder="LeetCode Username" value={leetcode} onChange={(e) => setLeetcode(e.target.value)} />
            <input style={styles.input} placeholder="LinkedIn Profile Link" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />

            <button style={styles.button} onClick={createAccount}>
              Create Account
            </button>
          </div>
        )}
      </div>

      {accounts.length > 0 && (
        <div style={styles.preview}>
          <h2>✅ Added Accounts</h2>

          {accounts.map((account, index) => (
            <div key={index} style={styles.accountCard}>
              <h3>👤 {account.name}</h3>
              <p><strong>College:</strong> {account.college}</p>
              <p><strong>Department:</strong> {account.department}</p>
              <p><strong>Year:</strong> {account.year}</p>
              <p><strong>Dream Company:</strong> {account.dreamCompany}</p>
              <p><strong>GitHub:</strong> {account.github}</p>
              <p><strong>LeetCode:</strong> {account.leetcode}</p>
              <p><strong>LinkedIn:</strong> {account.linkedin}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { textAlign: "center" },
  title: { fontSize: "38px", marginBottom: "25px" },
  card: {
    maxWidth: "650px",
    margin: "0 auto",
    padding: "30px",
    borderRadius: "22px",
    background:
      "linear-gradient(145deg, rgba(30,41,59,0.85), rgba(15,23,42,0.9))",
    border: "1px solid rgba(99,102,241,0.4)",
    textAlign: "left",
    lineHeight: "2",
    fontSize: "18px",
  },
  accountBox: {
    marginTop: "25px",
    padding: "20px",
    borderRadius: "18px",
    background: "rgba(15,23,42,0.75)",
    border: "1px solid #334155",
  },
  sectionTitle: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "13px",
    marginBottom: "13px",
    borderRadius: "10px",
    border: "1px solid #475569",
    backgroundColor: "#111827",
    color: "white",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "14px",
    marginTop: "10px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(90deg,#7c3aed,#2563eb)",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
  preview: {
    maxWidth: "650px",
    margin: "25px auto 0",
    padding: "25px",
    borderRadius: "20px",
    background: "rgba(30,41,59,0.75)",
    border: "1px solid rgba(99,102,241,0.4)",
    textAlign: "left",
    lineHeight: "2",
  },
  accountCard: {
    marginTop: "20px",
    padding: "18px",
    borderRadius: "16px",
    background: "rgba(15,23,42,0.75)",
    border: "1px solid #334155",
  },
};

export default Profile;