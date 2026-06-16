import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NoticeBoard from "./components/NoticeBoard";
import Departments from "./components/Departments";
import Admissions from "./components/Admissions";
import Placements from "./components/Placements";
import CampusLife from "./components/CampusLife";
import Chatbot from "./components/Chatbot";
import { 
  Award, BookOpen, Clock, ArrowRight, GraduationCap, Building2, 
  Flame, Landmark, HelpCircle, CheckSquare, Sparkles, LogIn 
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [tickerNotice, setTickerNotice] = useState("");

  // Load latest notification as marquee scroll ticker dynamically
  useEffect(() => {
    const stored = localStorage.getItem("vrec_notices");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) {
          setTickerNotice(`LATEST ALERTS: ${parsed[0].title} (${parsed[0].date}) • Code: VJAY`);
        }
      } catch (e) {
        setTickerNotice("ANNOUNCEMENT: TS-EAMCET/ECET Counseling for year 2026 reporting is live under code VJAY!");
      }
    } else {
      setTickerNotice("ANNOUNCEMENT: TS-EAMCET/ECET Counseling for year 2026 reporting is live under code VJAY!");
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* Dynamic Header Component */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Marquee Ticker Announcement Bar */}
      <div className="bg-slate-900 border-y border-slate-800 text-amber-400 py-1.5 px-4 overflow-hidden shrink-0">
        <div className="mx-auto max-w-7xl">
          <div className="relative flex items-center gap-4">
            <span className="shrink-0 bg-red-800 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider shadow">
              Live Feed
            </span>
            <div className="w-full overflow-hidden text-xs font-bold whitespace-nowrap selective-marquee select-none">
              <span className="inline-block animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
                {tickerNotice} — Visit Admissions Enquiry Form or consult Vijay, our AI Counselor chatbot for real-time guidance!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Application Routes / Pages */}
      <main className="flex-1">
        {/* HOME PORTAL TAB */}
        {activeTab === "home" && (
          <div className="animate-fade-in">
            
            {/* HERO LANDING SECTOR */}
            <section className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-24 px-4 sm:px-6">
              {/* Background ambient lighting accents */}
              <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-red-900/10 blur-[100px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none"></div>
              
              <div className="mx-auto max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Typography Part */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  <span className="inline-flex items-center gap-1.5 bg-red-950/40 border border-red-900/60 text-red-400 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    Celebrating 29 Years of Academic Excellence
                  </span>
                  
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                    Shape the Frontiers of{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                      Engineering & Technology
                    </span>
                  </h1>
                  
                  <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
                    Vijay Rural Engineering College (VREC) Nizamabad, promoted by the Vijay Rural Education Society, has engineered tech-talents since 1997. Built across 30+ lush acres, VREC combines JNTUH affiliation with robust coding, automation, and industry pipelines.
                  </p>

                  <div className="pt-4 flex flex-wrap gap-4 justify-center lg:justify-start">
                    <button
                      onClick={() => setActiveTab("departments")}
                      className="cursor-pointer bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 px-6 py-3 rounded-lg text-sm font-black tracking-wide uppercase transition shadow-lg select-none"
                    >
                      Explore B.Tech branches
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("chatbot")}
                      className="cursor-pointer bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white px-6 py-3 rounded-lg text-sm font-bold tracking-wide transition flex items-center gap-2 select-none"
                    >
                      Talk to VREC AI Assistant <ArrowRight className="h-4 w-4 text-amber-400" />
                    </button>
                  </div>
                </div>

                {/* Right Image/Feature Box Card */}
                <div className="lg:col-span-5 bg-gradient-to-tr from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
                  <h3 className="text-lg font-black text-amber-400 flex items-center gap-2">
                    <GraduationCap className="h-5.5 w-5.5" />
                    VJAY Counselling Code
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Your portal to state-registered B.Tech admissions and financial supports.
                  </p>

                  <ul className="mt-6 space-y-4 text-xs font-semibold text-slate-300">
                    <li className="flex gap-3 items-center">
                      <div className="h-6 w-6 rounded bg-red-950/60 flex items-center justify-center text-red-400 text-xs font-bold shrink-0">✓</div>
                      <span>TS-EAMCET Convener Counseling quota</span>
                    </li>
                    <li className="flex gap-3 items-center">
                      <div className="h-6 w-6 rounded bg-red-950/60 flex items-center justify-center text-red-400 text-xs font-bold shrink-0">✓</div>
                      <span>Affiliated to JNTUH & Approved by AICTE, New Delhi</span>
                    </li>
                    <li className="flex gap-3 items-center">
                      <div className="h-6 w-6 rounded bg-red-950/60 flex items-center justify-center text-red-400 text-xs font-bold shrink-0">✓</div>
                      <span>Telangana Government Full Fee Reimbursement Support</span>
                    </li>
                    <li className="flex gap-3 items-center">
                      <div className="h-6 w-6 rounded bg-red-950/60 flex items-center justify-center text-red-400 text-xs font-bold shrink-0">✓</div>
                      <span>85%+ Placements with TCS, Capgemini & Wipro</span>
                    </li>
                  </ul>

                  <div className="mt-8 border-t border-slate-800/80 pt-6">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Quick Link</p>
                    <button
                      onClick={() => setActiveTab("admissions")}
                      className="mt-2 w-full bg-slate-950 hover:bg-slate-900 border border-dashed border-slate-800 text-amber-400 py-2.5 rounded text-xs font-black transition text-center select-none cursor-pointer"
                    >
                      Fill Online Admissions Enquiry sheet
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* BENTO STATISTICS GRID */}
            <section className="bg-slate-100 py-12 px-4 sm:px-6">
              <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  
                  <div className="bg-white rounded-xl border border-slate-200 p-5 text-center shadow-xs">
                    <div className="text-3xl font-black text-slate-900">1997</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Established Year</div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-5 text-center shadow-xs">
                    <div className="text-3xl font-black text-red-800">12.5 LPA</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Highest Salary offer</div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-5 text-center shadow-xs">
                    <div className="text-3xl font-black text-slate-900">30+</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Lush Green Acres</div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-5 text-center shadow-xs">
                    <div className="text-3xl font-black text-red-800">45,000+</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Library volumes</div>
                  </div>

                </div>
              </div>
            </section>

            {/* MESSAGE FROM CHAIRPERSON & PRINCIPAL */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              
              {/* Profile Card Mock */}
              <div className="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
                <div className="relative h-28 w-28 bg-slate-200 rounded-full border-4 border-red-800 flex items-center justify-center text-3xl font-black text-red-800 mb-4 shadow-md">
                  V
                </div>
                <h3 className="text-lg font-black text-slate-900">Vijay Rural Education Society</h3>
                <p className="text-xs text-red-800 font-bold tracking-wide uppercase mt-0.5">Founding Trustees since 1997</p>
                <p className="text-xs text-slate-500 mt-4 leading-relaxed max-w-xs">
                  "Engineered with a sole, deep-rooted pledge to uplift the semi-urban and rural student capacities in Telangana, bridging local talent grids onto global corporate ladders."
                </p>
              </div>

              {/* Message Content */}
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs font-black text-red-800 tracking-wider uppercase">Our Governing Philosophy</span>
                <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Empowering rural talents with worldwide engineering exposure.
                </h2>
                
                <p className="text-sm text-slate-650 leading-relaxed">
                  Vijay Rural Engineering College is committed to molding analytical leaders through an intensive B.Tech syllabus under the affiliation of JNTUH. Traditional classroom teaching is constantly verified inside state-of-the-art computer networks, signal processing setups, and material testing workshops.
                </p>
                
                <p className="text-sm text-slate-650 leading-relaxed">
                  Our dedicated Departmental blocks host weekly guest seminars, coding contests, and soft skill assessment units. This holistic matrix has gained VREC a reputable position in Nizamabad, ensuring consistent placements inside prestigious organizations over years.
                </p>

                <div className="pt-4 flex gap-4">
                  <div className="border-l-2 border-slate-900 pl-4 py-1">
                    <p className="text-xs text-slate-400 font-bold">In-charge Counsel</p>
                    <p className="text-sm font-black text-slate-900 leading-normal">Dr. K. Srinivas Rao, Ph.D</p>
                  </div>
                  <div className="border-l-2 border-slate-900 pl-4 py-1">
                    <p className="text-xs text-slate-400 font-bold">Affiliated University</p>
                    <p className="text-sm font-black text-slate-900 leading-normal">JNTU Hyderabad (JNTUH)</p>
                  </div>
                </div>
              </div>

            </section>

            {/* ADMISISON CALL OUT POINTER */}
            <section className="bg-gradient-to-r from-red-950 to-slate-950 text-white py-12 px-4 sm:px-6 text-center selective-callout">
              <div className="mx-auto max-w-4xl space-y-5">
                <h3 className="text-2xl sm:text-3xl font-black text-amber-400">Join VREC Nizamabad Batch 2026</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
                  TS-EAMCET or TS-ECET lateral category allotments are now live under counseling code <strong>VJAY</strong>. Explore scholarship slots and secure your engineering career today!
                </p>
                <div className="pt-2 flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={() => setActiveTab("admissions")}
                    className="cursor-pointer bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-2.5 rounded font-black text-xs uppercase transition select-none"
                  >
                    Apply online
                  </button>
                  <button
                    onClick={() => setActiveTab("notice-board")}
                    className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-slate-300 px-5 py-2.5 rounded font-bold text-xs transition border border-slate-800 select-none"
                  >
                    View Academic notice board
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* OTHER PAGES SLOTS */}
        {activeTab === "departments" && <Departments />}
        {activeTab === "admissions" && <Admissions />}
        {activeTab === "placements" && <Placements />}
        {activeTab === "campus-life" && <CampusLife />}
        {activeTab === "notice-board" && <NoticeBoard />}
        {activeTab === "chatbot" && <Chatbot />}
      </main>

      {/* Floating Chatbot Overlay - visible globally regardless of selected tab to assist students instantly! */}
      {activeTab !== "chatbot" && <Chatbot isFloatingOnly={true} />}

      {/* FOOTER SECTOR */}
      <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs py-10 px-4 sm:px-6 shrink-0 mt-auto">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-red-800 p-0.5 flex items-center justify-center">
                <div className="h-full w-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Landmark className="h-4 w-4 text-amber-400" />
                </div>
              </div>
              <h4 className="font-extrabold text-white text-sm tracking-wide">VREC NIZAMABAD</h4>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Vijay Rural Engineering College (VREC) Rochis Valley, Manik Bhandar, Nizamabad, Telangana - 503003, India.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Quick Links</h4>
            <div className="flex flex-col gap-2 font-semibold">
              <span onClick={() => { setActiveTab("departments"); window.scrollTo(0,0); }} className="hover:text-amber-400 transition cursor-pointer">Departments</span>
              <span onClick={() => { setActiveTab("admissions"); window.scrollTo(0,0); }} className="hover:text-amber-400 transition cursor-pointer">Admissions Enquiry</span>
              <span onClick={() => { setActiveTab("placements"); window.scrollTo(0,0); }} className="hover:text-amber-400 transition cursor-pointer">Placements Record</span>
              <span onClick={() => { setActiveTab("notice-board"); window.scrollTo(0,0); }} className="hover:text-amber-400 transition cursor-pointer">Latest Notices</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">VREC Help Desk</h4>
            <div className="space-y-2">
              <p>📍 Rochis Valley, Manik Bhandar</p>
              <p>📞 Phone: +91 8462-223456</p>
              <p>✉️ Email: info@vrec.ac.in</p>
              <p>💼 Placements: placements@vrec.ac.in</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">TS-EAMCET Admission Code</h4>
            <div className="bg-red-950/40 p-4 border border-red-900/40 rounded-xl">
              <span className="block text-[10px] text-amber-400 font-extrabold uppercase tracking-wide">Counselling Code</span>
              <span className="block text-xl font-black text-white mt-1">VJAY</span>
              <span className="block text-[10px] text-slate-400 font-semibold mt-1.5 leading-normal">
                Approved by AICTE New Delhi, Recognized by Government of Telangana State.
              </span>
            </div>
          </div>

        </div>

        <div className="mx-auto max-w-7xl pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-[11px] font-semibold text-slate-500 gap-4">
          <p>© 2026 Vijay Rural Engineering College. All Indian Rights Reserved.</p>
          <p>Affiliated to JNTU Hyderabad • Promoted by VIJAY RURAL EDUCATION SOCIETY</p>
        </div>
      </footer>

    </div>
  );
}
