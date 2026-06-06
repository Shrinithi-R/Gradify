import { createContext, useState } from "react";

export const ScoreContext = createContext();

function ScoreProvider({ children }) {
  const [githubScore, setGithubScore] = useState(0);
  const [leetcodeScore, setLeetcodeScore] = useState(0);
  const [resumeScore, setResumeScore] = useState(0);

  return (
    <ScoreContext.Provider
      value={{
        githubScore,
        setGithubScore,
        leetcodeScore,
        setLeetcodeScore,
        resumeScore,
        setResumeScore,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
}

export default ScoreProvider;