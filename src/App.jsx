import { useState, useEffect, useRef } from "react";

// Simple AI-like responses for common queries
const aiResponses = {
  // Greetings
  "hi": "Hello! Welcome to my portfolio. I'm Sankalp, a Data Scientist and AI enthusiast. How can I help you today?",
  "hello": "Hi there! I'm Sankalp Mohanty, and this is my interactive portfolio terminal. Feel free to explore my projects and skills!",
  "hey": "Hey! Thanks for visiting my portfolio. I'm passionate about AI, ML, and Data Science. What would you like to know?",
  
  // About queries
  "who are you": "I'm Sankalp Mohanty, a Data Scientist and Analyst with expertise in Generative AI, Machine Learning, and Data Science. I love building scalable AI solutions!",
  "tell me about yourself": "I'm an engineering graduate specializing in AI/ML with hands-on experience in Python, TensorFlow, PyTorch, and various AI frameworks. I'm currently working as a Data Scientist and Analyst.",
  
  // Technical queries
  "what technologies do you use": "I work with Python, TensorFlow, PyTorch, Scikit-learn, SQL, R, and many AI/ML frameworks. I'm also experienced with cloud platforms like AWS.",
  "machine learning": "I have extensive experience in ML including traditional algorithms, deep learning, NLP, and computer vision. I've worked on projects ranging from sentiment analysis to threat detection systems.",
  "ai": "I'm passionate about AI! I work with Generative AI, LLMs, computer vision, and traditional ML. Check out my projects like Sentinel Secure for AI-powered threat detection.",
  
  // Project queries
  "sentinel secure": "Sentinel Secure is my AI-powered threat detection system using YOLO and MTCNN for real-time processing with 1.5s latency. It's designed for scalable surveillance applications.",
  "projects": "I've worked on several exciting projects including AI threat detection, sentiment analysis systems, traffic analytics, and CRM solutions. Type 'projects' to see the full list!",
  
  // General
  "experience": "I have hands-on experience in Data Science, AI/ML, and building scalable solutions. I've worked on projects involving computer vision, NLP, and system integration.",
  "skills": "My core skills include Python, AI/ML frameworks, data analysis, and system design. Type 'skills' for a detailed breakdown!",
  "contact": "You can reach me at sankalp6414@gmail.com or +91 9437754988. I'm based in Bhubaneswar, India.",
};

// Enhanced AI function with local responses
async function getAIResponse(prompt) {
  const lowerPrompt = prompt.toLowerCase().trim();
  
  // Check for exact matches first
  if (aiResponses[lowerPrompt]) {
    return aiResponses[lowerPrompt];
  }
  
  // Check for partial matches
  for (const [key, response] of Object.entries(aiResponses)) {
    if (lowerPrompt.includes(key) || key.includes(lowerPrompt)) {
      return response;
    }
  }
  
  // Try Gemini API as fallback (if available)
  try {
    const geminiResponse = await tryGeminiAPI(prompt);
    if (geminiResponse && !geminiResponse.includes("Error:") && !geminiResponse.includes("Hmm,")) {
      return geminiResponse;
    }
  } catch (error) {
    console.log("Gemini API unavailable, using local responses");
  }
  
  // Default response for unmatched queries
  return `I'd be happy to help! You can ask me about:
• My background and experience
• Technical skills and projects  
• AI/ML work and technologies
• Contact information
• Or use commands like 'about', 'projects', 'skills'

What would you like to know?`;
}

// Optional Gemini API call (as fallback)
async function tryGeminiAPI(prompt) {
  const API_KEY = "AIzaSyDVxXHjPqMxvvOlINllwdDF7LzcCVC5NRU";
  
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `You are Sankalp Mohanty, a Data Scientist and AI expert. Answer this question about yourself or your work: ${prompt}` }] }]
      }),
    });

    const data = await res.json();

    if (data?.candidates?.length > 0) {
      const aiReply = data.candidates[0]?.content?.parts?.[0]?.text;
      return aiReply?.trim() || null;
    }
    return null;

  } catch (error) {
    console.log("Gemini API Error:", error);
    return null;
  }
}

// Parse URLs
const parseLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" style="color:#00ff88;text-decoration:underline;">${url}</a>`);
};

// 3D Avatar Component (Placeholder)
function Profile3D() {
  return (
    <div className="avatar-placeholder">
      <div className="avatar-circle">
        <div className="avatar-inner">
          <span>SM</span>
        </div>
      </div>
      <div className="scan-line"></div>
    </div>
  );
}

// Commands
const commands = {
  help: `Available commands:
- about
- projects
- skills
- contact
- clear
- theme
- whoami`,
  about: `# Sankalp Mohanty - Portfolio

## About Me
Engineering graduate with hands-on experience in Generative AI, Machine Learning, and Data Science.
Passionate about building scalable AI solutions and leveraging cutting-edge technologies to solve real-world problems.
Proficient in Python, TensorFlow, PyTorch, and various AI frameworks with a strong foundation in both traditional ML and modern GenAI approaches.
Current Role: **Data Scientist and Analyst**
`,
  projects: `## Featured Projects

### 🛡️ Sentinel Secure: AI-Powered Threat Detection System
Duration: February 2024 - Ongoing  
Tech Stack: Python, PyTorch, YOLO, MTCNN, Computer Vision, LLMs  
Key Features:
- Multi-Modal Detection with YOLO & MTCNN
- Real-Time Processing (1.5s latency)
- AI-Driven Emergency Response with LLMs
- Detection Accuracy: 55%
- Scalable for multiple surveillance points

---

### 📊 Alexa Product Review Intelligence System
Duration: March - April 2024  
Tech Stack: Python, TensorFlow, NLTK  
Key Features:
- Sentiment Analysis Pipeline with TF-IDF + Neural Network
- 70% classification accuracy
- Automated data pipeline with visualization
- 15% improvement in customer satisfaction

---

### 🚗 FleetIntel: Smart Traffic Analytics & Secure Communication
Duration: Jan - April 2025  
Tech Stack: Python, Django, PostgreSQL, MATLAB, MapMyIndia API, AES-256  
Key Features:
- Real-Time Traffic Monitoring with VANET Security
- AES-256 Encrypted Communication
- Dynamic Route Optimization with A*/Dijkstra
- 98% encryption success rate

---

### 💼 Contact Management System (CRM)
Duration: March - June 2025  
Tech Stack: Microsoft Dynamics 365 CRM, Power Apps, Power Automate  
Key Features:
- Advanced contact management dashboards
- Custom entity creation and integration
- Sales analytics and visualization
`,
  skills: `## Technical Skills

**Programming:** Python, R, SQL, C#, Bash  
**AI/ML:** TensorFlow, PyTorch, Scikit-learn, NLP, Computer Vision  
**Generative AI:** LangChain, RAG, GPT, Claude, Hugging Face  
**Databases:** MySQL, PostgreSQL, MongoDB  
**Visualization:** Power BI, Tableau, D3.js  
**DevOps & Cloud:** AWS (EC2, S3, Lambda), Docker, GitHub Actions  
**CRM Tools:** Dynamics 365 CRM, Power Apps, Power Automate  
`,
  contact: `## Contact Information
📧 sankalp6414@gmail.com  
📞 +91 9437754988  
📍 Bhubaneswar, India  
🔗 <a href="https://linkedin.com/in/sankalp" target="_blank">LinkedIn</a>  
🔗 <a href="https://github.com/yourgithub" target="_blank">GitHub</a>`,
  whoami: `sankalp
uid=1001(sankalp) gid=1001(sankalp) groups=1001(sankalp),27(sudo),998(developer)`,
  theme: "Theme toggled. Available themes: matrix, cyberpunk",
  clear: "",
};

function App() {
  const [history, setHistory] = useState(["Welcome to Sankalp's Portfolio Terminal", "Type 'help' to get started."]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("matrix");
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const simulateTyping = (text = "", delay = 30) => {
    return new Promise((resolve) => {
      setIsTyping(true);
      const str = String(text);
      
      if (str.length === 0) {
        setIsTyping(false);
        resolve();
        return;
      }
      
      let index = 0;
      let currentLine = "";
      
      // Add a new line to history for typing
      setHistory((prev) => [...prev, ""]);
      
      const interval = setInterval(() => {
        // Replace \n with <br/> live during typing
        const nextChar = str[index] === "\n" ? "<br/>" : str[index];
        currentLine += nextChar;
        
        // Update the last line in history
        setHistory((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = currentLine;
          return updated;
        });
        
        index++;
        if (index >= str.length) {
          clearInterval(interval);
          setIsTyping(false);
          resolve();
        }
      }, delay);
    });
  };
  
  const handleCommand = async (cmd) => {
    const commandLine = `sankalp@portfolio:~$ ${cmd}`;
    setHistory((prev) => [...prev, commandLine]);
  
    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    if (cmd === "theme") {
      toggleTheme();
      setHistory((prev) => [...prev, "Theme toggled successfully!"]);
      return;
    }
  
    if (commands[cmd]) {
      const commandOutput = commands[cmd];
      if (commandOutput.trim() === "") {
        // For empty commands like 'clear', don't add anything
        return;
      }
      
      // Split by lines and process each line
      const lines = commandOutput.split("\n");
      
      for (const line of lines) {
        await simulateTyping(line);
      }
    } else {
      // Show thinking message
      setHistory((prev) => [...prev, "🤖 AI Assistant thinking..."]);
      
      try {
        const aiReply = await getAIResponse(cmd);
        
        // Remove the thinking message and add AI response
        setHistory((prev) => prev.slice(0, -1));
        await simulateTyping(aiReply);
  
      } catch (err) {
        setHistory((prev) => prev.slice(0, -1));
        await simulateTyping("I'd be happy to help! Try asking about my projects, skills, or experience.");
      }
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !isTyping) {
      const trimmed = input.trim();
      if (trimmed) {
        handleCommand(trimmed);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(input));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "matrix" ? "cyberpunk" : "matrix";
    setTheme(newTheme);
  };

  return (
    <div className={`container ${theme}`}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500&display=swap');

        * {
          box-sizing: border-box;
        }

        .container {
          display: flex;
          flex-direction: row;
          width: 100vw;
          height: 100vh;
          transition: all 0.3s ease;
          font-family: 'Fira Code', monospace;
        }

        .container.matrix {
          background: linear-gradient(135deg, #0a0f0d 0%, #1a1a1a 100%);
          color: #00ff88;
        }

        .container.cyberpunk {
          background: linear-gradient(135deg, #0d001a 0%, #2a0845 100%);
          color: #ff00ff;
        }

        .profile-card {
          background: rgba(17, 17, 17, 0.95);
          backdrop-filter: blur(10px);
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-right: 1px solid currentColor;
          position: relative;
        }

        .profile-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, currentColor 50%, transparent 70%);
          opacity: 0.05;
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .avatar-placeholder {
          width: 200px;
          height: 200px;
          position: relative;
          margin-bottom: 20px;
        }

        .avatar-circle {
          width: 100%;
          height: 100%;
          border: 2px solid currentColor;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .avatar-inner {
          width: 80%;
          height: 80%;
          border: 1px solid currentColor;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          font-weight: bold;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
        }

        .scan-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          animation: scan 2s infinite;
        }

        @keyframes scan {
          0% { top: 0; opacity: 1; }
          50% { opacity: 0.3; }
          100% { top: 100%; opacity: 1; }
        }

        .profile-card h1 {
          margin: 10px 0;
          font-size: 24px;
          text-align: center;
        }

        .profile-card p {
          margin: 5px 0;
          font-size: 14px;
          opacity: 0.8;
          text-align: center;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 10px 0;
          font-size: 12px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: currentColor;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .theme-toggle {
          background: rgba(17, 17, 17, 0.8);
          color: currentColor;
          border: 1px solid currentColor;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-family: inherit;
          font-size: 12px;
          transition: all 0.2s ease;
          margin-top: 15px;
        }

        .theme-toggle:hover {
          background: currentColor;
          color: #111;
        }

        .terminal {
          background: rgba(0, 0, 0, 0.9);
          flex: 2;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .terminal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          background: rgba(17, 17, 17, 0.8);
          border-bottom: 1px solid currentColor;
        }

        .terminal-buttons {
          display: flex;
          gap: 8px;
        }

        .terminal-button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .terminal-button.red { background: #ff5f57; }
        .terminal-button.yellow { background: #ffbd2e; }
        .terminal-button.green { background: #28ca42; }

        .terminal-title {
          font-size: 14px;
          font-weight: 500;
        }

        .terminal-output {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          white-space: pre-wrap;
          line-height: 1.6;
          scrollbar-width: thin;
          scrollbar-color: currentColor transparent;
        }

        .terminal-output::-webkit-scrollbar {
          width: 6px;
        }

        .terminal-output::-webkit-scrollbar-track {
          background: transparent;
        }

        .terminal-output::-webkit-scrollbar-thumb {
          background: currentColor;
          border-radius: 3px;
        }

        .typing {
          border-right: 2px solid currentColor;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          from, to { border-color: transparent; }
          50% { border-color: currentColor; }
        }

        .terminal-input {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 20px 10px;
        }

        .terminal-input span {
          color: currentColor;
          font-weight: 500;
        }

        .terminal-input input {
          background: transparent;
          border: none;
          color: currentColor;
          font-family: inherit;
          font-size: 16px;
          width: 100%;
          outline: none;
        }

        .terminal-input input::placeholder {
          color: currentColor;
          opacity: 0.5;
        }

        .terminal-input input:disabled {
          opacity: 0.5;
        }

        .command-buttons {
          padding: 10px 20px 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .command-buttons button {
          background: rgba(17, 17, 17, 0.8);
          color: currentColor;
          border: 1px solid currentColor;
          padding: 6px 12px;
          border-radius: 4px;
          font-family: inherit;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .command-buttons button:hover:not(:disabled) {
          background: currentColor;
          color: #111;
        }

        .command-buttons button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }

          .profile-card {
            flex: none;
            height: 40vh;
            border-right: none;
            border-bottom: 1px solid currentColor;
          }

          .avatar-placeholder {
            width: 120px;
            height: 120px;
          }

          .avatar-inner {
            font-size: 32px;
          }

          .profile-card h1 {
            font-size: 18px;
          }

          .terminal {
            flex: 1;
            height: 60vh;
          }

          .terminal-output {
            padding: 15px;
          }

          .terminal-input {
            padding: 0 15px 10px;
          }

          .command-buttons {
            padding: 10px 15px 15px;
          }
        }
      `}</style>

      <div className="profile-card">
        <Profile3D />
        <h1>Sankalp Mohanty</h1>
        <p>Data Scientist and Analyst</p>
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span>Online</span>
        </div>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "matrix" ? "🌈 Cyberpunk" : "🟢 Matrix"}
        </button>
      </div>

      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <div className="terminal-button red"></div>
            <div className="terminal-button yellow"></div>
            <div className="terminal-button green"></div>
          </div>
          <div className="terminal-title">sankalp@portfolio:~</div>
        </div>

        <div className="terminal-output" ref={terminalRef}>
          {history.map((line, idx) => {
            if (line === undefined || line === null) {
              return null;
            }
            
            return (
              <div
                key={idx}
                dangerouslySetInnerHTML={{ __html: parseLinks(String(line)) }}
                className={idx === history.length - 1 && isTyping ? "typing" : ""}
              />
            );
          })}
        </div>

        <div className="terminal-input">
          <span>sankalp@portfolio:~$</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={isTyping}
            autoFocus
            placeholder="Type a command or ask me anything..."
          />
        </div>

        <div className="command-buttons">
          {["help", "about", "projects", "skills", "contact", "clear"].map((cmd) => (
            <button key={cmd} onClick={() => handleCommand(cmd)} disabled={isTyping}>
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;