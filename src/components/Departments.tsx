import React, { useState } from "react";
import { Department } from "../types";
import { Cpu, Database, Laptop, Radio, Hammer, ShieldAlert, GraduationCap, Flame, Star, ClipboardList } from "lucide-react";

const DEPARTMENTS: Department[] = [
  {
    id: "cse",
    name: "Computer Science & Engineering",
    shortName: "CSE",
    intake: 180,
    hod: "Dr. Shanthi Kumar, M.Tech, Ph.D",
    hodContact: "+91 94412 34567",
    email: "cse.hod@vrec.ac.in",
    labs: [
      "High-Performance Programming Lab (Intel Core i7 Systems)",
      "Advanced Database Systems Laboratory (Oracle, MongoDB)",
      "Web Technologies and Cloud Computing Competency Lab",
      "Network Protocols and Security Simulation Base"
    ],
    description: "The Department of CSE at VREC, established in 1997, is the focal point of computer software excellence in the region. Guided by experienced research-oriented faculty, the branch is packed with coding sandboxes, hosting student hackathons and collaborative workshops regularly.",
    syllabusHighlights: ["Data Structures & Algorithms", "Full Stack Web Development", "Cloud Computing & DevOps", "Design and Analysis of Algorithms", "Cybersecurity & cryptography"]
  },
  {
    id: "aiml",
    name: "Artificial Intelligence & Machine Learning",
    shortName: "CSE (AI & ML)",
    intake: 60,
    hod: "Prof. G. Venkatesh, M.Tech, (Ph.D)",
    hodContact: "+91 94901 88776",
    email: "aiml.hod@vrec.ac.in",
    labs: [
      "GPU-Accelerated Neural Network Sandbox (NVIDIA GPUs)",
      "Python AI Research Center & AI Sandbox",
      "Machine Learning and Pattern Analysis Lab"
    ],
    description: "To meet the demands of Industry 4.0, our AI & ML department develops professionals specializing in intelligent systems. The labs are fitted with elite GPU processing power to carry out Deep Learning models and custom Computer Vision applications.",
    syllabusHighlights: ["Supervised & Unsupervised Learning", "Neural Networks & Deep Learning", "Natural Language Processing", "Computer Vision and Robotics", "Intelligent Agents & Experts"]
  },
  {
    id: "ds",
    name: "Computer Science (Data Science)",
    shortName: "CSE (DS)",
    intake: 60,
    hod: "Mrs. K. Sumalatha, M.Tech",
    hodContact: "+91 84620 11223",
    email: "ds.hod@vrec.ac.in",
    labs: [
      "SQL/NoSQL Enterprise Datastore Sandbox",
      "R Programming and Statistical Analysis Lab",
      "Big Data Frameworks Center (Hadoop & Apache Spark)"
    ],
    description: "Data Science acts as the engine of modern business analytics. Our curriculum integrates robust statistics and computation algorithms to mold students into data architects, mathematical modelers, and prediction specialists.",
    syllabusHighlights: ["Probability & Mathematical Statistics", "Exploratory Data Analysis", "Big Data Analytics with Spark", "Predictive Analytics Models", "Data Visualization Techniques"]
  },
  {
    id: "ece",
    name: "Electronics & Communication Engineering",
    shortName: "ECE",
    intake: 60,
    hod: "Dr. J. Rakesh, M.Tech, Ph.D",
    hodContact: "+91 94401 54321",
    email: "ece.hod@vrec.ac.in",
    labs: [
      "Microprocessor Interface & Embedded Systems Lab",
      "VLSI Design & Hardware Description Languages Lab",
      "Digital Signal Processing & MATLAB Suite",
      "Microwave and Optical Communication Lab"
    ],
    description: "The ECE branch focuses on bridging structural hardware with intelligent communication grids. Students undergo extensive lab experiments modeling chips, microcomputers, embedded boards (Raspberry Pi/Arduino), and cellular transceivers.",
    syllabusHighlights: ["Analog & Digital Communications", "VLSI Design & Verilog HDL", "Embedded Systems & IoT Basics", "Microcontrollers & Interfaces", "Antenna Design & Propagation"]
  },
  {
    id: "civil",
    name: "Civil Engineering",
    shortName: "CIVIL",
    intake: 60,
    hod: "Mr. Mohammad Ali, M.Tech, MIE",
    hodContact: "+91 90520 99887",
    email: "civil.hod@vrec.ac.in",
    labs: [
      "Geotechnical and Soil Testing Lab",
      "Concrete Technology & Compression testing setups",
      "Surveying & GPS Mapping Arena",
      "Fluid Mechanics and Hydraulic Machinery Center"
    ],
    description: "Civil Engineering is about designing strong, durable, of structural foundations. Our department prepares students with structural drafting softwares, concrete testing matrices, and real-time highway surveying projects.",
    syllabusHighlights: ["Structural Analysis & Design", "Geotechnical Engineering Methods", "Transportation & Highway Layouts", "CAD in Civil Drafting (AutoCAD/StaadPro)", "Concrete Testing & Tech"]
  },
  {
    id: "eee",
    name: "Electrical & Electronics Engineering",
    shortName: "EEE",
    intake: 30,
    hod: "Mr. B. Rajesh, M.Tech",
    hodContact: "+91 99080 33445",
    email: "eee.hod@vrec.ac.in",
    labs: [
      "Electrical Machines Lab (DC/AC Induction Machinery)",
      "Power Electronics & Control Systems Center",
      "Electrical Circuit Analysis Lab"
    ],
    description: "Powering the globe sustainably. EEE students inspect solid-state switches, solar arrays, grid stability systems, and motor speed control circuits using real power electronics boards and load simulators.",
    syllabusHighlights: ["Power Systems & Transmission", "AC/DC Rotating Electrical Machines", "Control Systems Engineering", "Power Electronics Drives", "Renewable Energy Integrations"]
  },
  {
    id: "mech",
    name: "Mechanical Engineering",
    shortName: "MECH",
    intake: 30,
    hod: "Dr. K. Srinivas, Ph.D, FIE",
    hodContact: "+91 94405 99221",
    email: "mech.hod@vrec.ac.in",
    labs: [
      "Thermal Engineering and Fuels Lab",
      "CAD/CAM Center (with CNC Trainer lathes)",
      "Strength of Materials & Metallurgy lab",
      "Machine Tools and Production Workshop"
    ],
    description: "Mechanical Engineering equips students with kinematics, fluid power, and energy conversions. From heavy machining to CNC code programming, our workshops foster traditional and modern fabrication proficiency.",
    syllabusHighlights: ["Thermodynamics & IC Engines", "CAD/CAM & CNC Manufacturing", "Kinematics & Machine Design", "Robotics and Automation Units", "Operations Research Models"]
  }
];

export default function Departments() {
  const [selectedDeptId, setSelectedDeptId] = useState("cse");

  const selectedDept = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];

  return (
    <section id="departments-section" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Academic B.Tech Branches
        </h2>
        <p className="mt-2 text-slate-500 max-w-2xl">
          Explore seven core and computer engineering specializations approved by AICTE, tailored to groom career-ready technological leaders.
        </p>
      </div>

      {/* Grid of Navigation Tab Menu & Display Card */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side Options Panel */}
        <div className="flex flex-row overflow-x-auto pb-4 gap-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {DEPARTMENTS.map((dept) => {
            const isSelected = dept.id === selectedDeptId;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDeptId(dept.id)}
                className={`flex-shrink-0 cursor-pointer text-left px-4 py-3 rounded-xl border text-sm font-bold transition-all flex items-center justify-between gap-3 w-44 md:w-56 lg:w-full ${
                  isSelected
                    ? "bg-slate-900 border-slate-900 text-amber-400 shadow-lg scale-[1.02]"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {dept.id === "cse" && <Laptop className="h-5 w-5 text-amber-500" />}
                  {dept.id === "aiml" && <Cpu className="h-5 w-5 text-yellow-500" />}
                  {dept.id === "ds" && <Database className="h-5 w-5 text-indigo-500" />}
                  {dept.id === "ece" && <Radio className="h-5 w-5 text-red-500" />}
                  {dept.id === "civil" && <Hammer className="h-5 w-5 text-emerald-500" />}
                  {dept.id === "eee" && <Flame className="h-5 w-5 text-orange-500" />}
                  {dept.id === "mech" && <Hammer className="h-5 w-5 text-rose-500" />}
                  <span>{dept.shortName}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isSelected ? "bg-amber-400/20 text-amber-400" : "bg-slate-100 text-slate-500"
                }`}>
                  Intake: {dept.intake}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Side Complex Detail Display Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 animate-fade-in">
            {/* Header part */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-6 mb-6 gap-4">
              <div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Department Focus</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1 leading-snug">
                  {selectedDept.name}
                </h3>
              </div>
              <div className="bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-red-800" />
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Approved Intake</div>
                  <div className="text-lg font-bold text-slate-900">{selectedDept.intake} Students / Year</div>
                </div>
              </div>
            </div>

            {/* Description text */}
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              {selectedDept.description}
            </p>

            {/* Subgrid of Highlights and Laboratories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Laboratories List */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Star className="h-4.5 w-4.5 text-red-800" />
                  State-of-the-Art Laboratories
                </h4>
                <ul className="space-y-3">
                  {selectedDept.labs.map((lab, index) => (
                    <li key={index} className="flex gap-2.5 items-start text-sm text-slate-600">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-amber-400 text-xs font-bold">
                        {index + 1}
                      </span>
                      <span>{lab}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Syllabus Highlights */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ClipboardList className="h-4.5 w-4.5 text-red-800" />
                  Core Curriculum Focus
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDept.syllabusHighlights.map((topic, index) => (
                    <span
                      key={index}
                      className="bg-white border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm hover:border-amber-400 hover:text-amber-500 transition-colors"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="mt-8 pt-4 border-t border-slate-200 text-xs text-slate-400 font-bold leading-normal">
                  📌 Curriculum is strictly aligned with Jawahar Lal Nehru Technological University Hyderabad (JNTUH) Choice-Based Credit System (CBCS).
                </div>
              </div>
            </div>

            {/* HOD / Faculty Authority Details Box */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-5 text-white flex flex-col sm:flex-row gap-5 items-center justify-between shadow-inner">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-slate-700 border-2 border-amber-400 flex items-center justify-center text-lg font-black text-amber-400 shadow-md">
                  {selectedDept.hod.split(" ")[1]?.charAt(0) || "H"}
                </div>
                <div>
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Head of Department</div>
                  <div className="text-base font-bold text-white">{selectedDept.hod}</div>
                  <div className="text-xs text-slate-300">Department of {selectedDept.shortName}</div>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-xs text-right w-full sm:w-auto">
                <p className="text-slate-300">
                  📞 Contact: <span className="text-white hover:text-amber-300 transition-colors">{selectedDept.hodContact}</span>
                </p>
                <p className="text-slate-300">
                  ✉️ Email: <span className="text-white hover:text-amber-300 transition-colors">{selectedDept.email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
