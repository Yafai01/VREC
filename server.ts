import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// System Instruction for VREC Admission & Academic Counselor
const SYSTEM_INSTRUCTION = `You are the Official Academic & Admission Assistant of Vijay Rural Engineering College (VREC), Nizamabad. 
Your goal is to assist students, parents, and visitors with accurate information about the college, departments, placements, admissions, syllabus, fee structures, and campus life with a warm, encouraging, collegiate, and professional tone.

College Profile & Context:
- Established: 1997.
- Promoted by: Vijay Rural Education Society.
- Location: Rochis Valley, Manik Bhandar, Nizamabad, Telangana, Pin: 503003, India.
- EAMCET Counseling Code: VJAY
- Affiliation: Jawahar Lal Nehru Technological University Hyderabad (JNTUH).
- Approvals: Approved by AICTE, New Delhi & Government of Telangana.

Academics & Specializations:
1. B.Tech Branches & Intakes:
   - Computer Science & Engineering (CSE) - 180 Seats (HOD: Dr. Shanthi Kumar)
   - CSE in Artificial Intelligence & Machine Learning (AI & ML) - 60 Seats (HOD: Prof. Venkatesh G.)
   - CSE in Data Science (DS) - 60 Seats
   - Electronics & Communication Engineering (ECE) - 60 Seats (HOD: Dr. J. Rakesh)
   - Civil Engineering (CE) - 60 Seats
   - Electrical & Electronics Engineering (EEE) - 30 Seats
   - Mechanical Engineering (ME) - 30 Seats

2. M.Tech Courses (Intake: 18 seats each):
   - Computer Science & Engineering
   - Electrical Power Systems
   - VLSI & Embedded Systems

3. Diploma (Polytechnic) Courses:
   - Mechanical, Civil, EEE courses are offered.

Admissions & Fees:
- Eligibility B.Tech: 10+2 with Physics, Mathematics, Chemistry (MPC) with aggregate 45% or above. Core entry via TS-EAMCET (Code: VJAY). Lateral Entry (2nd year B.Tech) is via TS-ECET.
- Fee Structure: Approx INR 55,000 to INR 75,000/year under Convener Quota (depending on latest state fee regulatory committee). Management quota fee details and seat availability queries should be directed to the Admissions Office.
- Scholarships: Full tuition fee reimbursement (RTF) as per Government of Telangana criteria for eligible SC/ST, BC, and EBC candidates.

Placements Achievements:
- Placement Cell provides soft skills, quantitative aptitude, and core coding boot camps from the 2nd year onwards.
- ~85% of eligible students placed annually.
- Top partners: TCS, Wipro, Infosys, Capgemini, Capgemini, Cognizant, DXC Technology, Tech Mahindra, Mindtree.
- Highest Package: 12 LPA. Average Package: 4.5 LPA.

Campus & Infrastructure:
- Hostels: Separate secured campus hostels for boys and girls with study halls, hygiene-focused dining, and round-the-clock wardens.
- Sports: Large grounds for Cricket and Football, active courts for Basketball, Volleyball, and Badminton, plus an indoor arena for Table Tennis, Carrom, and Chess.
- Transport: College operates 15+ buses covering Nizamabad city, Armoor, Bodhan, Kamareddy, and other nearby sectors.
- Library: Central library with 45,000+ volumes, 120 print journals, and e-learning resources.
- Computing: High-end Computer Centers with 100 Mbps fiber internet connectivity.

Guidelines for Chat:
- If asked custom/out of text questions, relate with engineering, student advice, study tips, or tech careers, keeping VREC at the center of excellence.
- Always be polite, structured, and use lists for readability.
- Never make up information. If unsure, tell the user to contact the general VREC Desk at info@vrec.ac.in or call +91-8462-223456.`;

// Lazy initialize Gemini client to avoid crashes if API key is not present
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    // Return null to signify mock mode or missing keys gracefully
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// REST API for College Chatbot Counselor
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid payload. Provide messages array." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Graceful fallback response when GEMINI_API_KEY is not configured
      const lastUserMsg = messages[messages.length - 1]?.content || "";
      const lowerMsg = lastUserMsg.toLowerCase();
      let reply = "Hello! Welcome to the Vijay Rural Engineering College (VREC) Portal. I am operating in preview demo mode. ";

      if (lowerMsg.includes("admission") || lowerMsg.includes("fee") || lowerMsg.includes("seat") || lowerMsg.includes("code")) {
        reply += "For B.Tech Admissions, the TS-EAMCET counseling code is **VJAY**. Candidates must have completed 10+2 (MPC) with 45% or above. The fees for the convener quota are approximately INR 55,000 to INR 75,000 per year, and scholarship options are available under govt reimbursement programs.";
      } else if (lowerMsg.includes("branch") || lowerMsg.includes("course") || lowerMsg.includes("cse") || lowerMsg.includes("department")) {
        reply += "We offer excellent B.Tech branches: CSE (180 seats), CSE in AI & ML (60 seats), CSE in Data Science (60 seats), ECE (60 seats), Civil Engineering (60 seats), EEE (30 seats), and Mechanical Engineering (30 seats). High-tech labs and digital infrastructure are provided for each department.";
      } else if (lowerMsg.includes("placement") || lowerMsg.includes("job") || lowerMsg.includes("salary") || lowerMsg.includes("recruiter")) {
        reply += "VREC placements are highly proactive! Over 85% of students secure placements in companies like TCS, Infosys, Wipro, Capgemini, and Tech Mahindra. The highest package is 12 LPA and average package is around 4.5 LPA.";
      } else if (lowerMsg.includes("hostel") || lowerMsg.includes("facility") || lowerMsg.includes("bus") || lowerMsg.includes("transport")) {
        reply += "VREC has secure separate hostels on campus for boys and girls with high security and balanced meals. We also run 15+ buses routing across Nizamabad, Armoor, Bodhan, and outskirts.";
      } else {
        reply += "How can I help you today regarding Vijay Rural Engineering College? Feel free to ask about admissions, placements, departments, hostels, and academic schedules!";
      }

      return res.json({ text: reply });
    }

    // Adapt messages format to what `@google/genai` expects
    const contents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const textReply = response.text || "I apologize, I didn't receive a clear answer. Please try again.";
    return res.json({ text: textReply });

  } catch (error: any) {
    console.error("VREC Gemini API error:", error);
    return res.status(500).json({ error: error.message || "Something went wrong in conversational engine." });
  }
});

// Setup Vite Development Server Middleware / Serve static files in production
async function run() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in DEVELOPMENT mode, embedding Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in PRODUCTION mode, serving static elements...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VREC Campus Portal Server listening on http://0.0.0.0:${PORT}`);
  });
}

run().catch((err) => {
  console.error("Failed to start VREC Express-Vite backend:", err);
});
