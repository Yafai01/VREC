import React, { useState, useEffect } from "react";
import { Notice } from "../types";
import { Megaphone, Calendar, FileText, PlusCircle, Trash2, Search, Filter, AlertTriangle } from "lucide-react";

const INITIAL_NOTICES: Notice[] = [
  {
    id: "notice-1",
    title: "TS-EAMCET Admissions Session & Document Submission Guidelines",
    category: "Admissions",
    date: "2026-06-12",
    content: "All candidates allotted seats in B.Tech 1st year under convener quota (Code: VJAY) are requested to report with original SSC, Intermediate certificates, Rank Card, Hall Ticket, and 3 passport size photos to the campus admission desk starting this morning.",
    author: "Admissions Convener, VREC",
    isImportant: true,
  },
  {
    id: "notice-2",
    title: "Capgemini Recruitment Drive for 2026 Graduating Batch",
    category: "Placement",
    date: "2026-06-15",
    content: "Capgemini is visiting VREC for a virtual pool drive. Eligible branches: CSE, CSE-AIML, CSE-DS, and ECE with a minimum CGPA of 6.2 and no active backlogs. Submit your updated resume and complete registration on the T&P Portal by this Friday.",
    author: "Prof. S. Mahesh (Training & Placement Head)",
    isImportant: true,
  },
  {
    id: "notice-3",
    title: "JNTUH Odd Semester End Exams & Practical Timetables",
    category: "Exam",
    date: "2026-06-10",
    content: "Schedules for B.Tech III-I and IV-I Regular/Supplementary examinations have been published on the board. Lab practical exams will take place between June 20 and June 25. View individual branch notice boards for physical batches.",
    author: "Controller of Examinations",
    isImportant: false,
  },
  {
    id: "notice-4",
    title: "National Level Tech-symposium - VIJAYA PRAGNYA 2026",
    category: "General",
    date: "2026-06-08",
    content: "We are proud to host VIJAYA PRAGNYA 2026 on July 10-11! Events include Paper Presentation, Coding Arena, CAD Combat, Robot War, and Technical Quiz. Exciting cash prizes of over INR 1.5 Lakhs to be won. Team registrations are open.",
    author: "Pragnya Coordinating Committee",
    isImportant: false,
  },
  {
    id: "notice-5",
    title: "Free Reimbursement Tuition Fee (RTF) Renewal Guidelines",
    category: "Academic",
    date: "2026-06-05",
    content: "Eligible SC, ST, BC, and EBC students applying for Government of Telangana RTF Renewals must submit copy of Caste Certificate, Income Certificate (issued after April 1, 2026), and bank passbook copies to the administrative office for authentication.",
    author: "VREC Administrative Section",
    isImportant: false,
  },
];

export default function NoticeBoard() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  
  // Notice creation form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [adminKey, setAdminKey] = useState(""); // Simple security simulation
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<Notice["category"]>("General");
  const [formContent, setFormContent] = useState("");
  const [formAuthor, setFormAuthor] = useState("");
  const [formImportant, setFormImportant] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Load notices from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("vrec_notices");
    if (stored) {
      try {
        setNotices(JSON.parse(stored));
      } catch (e) {
        setNotices(INITIAL_NOTICES);
      }
    } else {
      setNotices(INITIAL_NOTICES);
      localStorage.setItem("vrec_notices", JSON.stringify(INITIAL_NOTICES));
    }
  }, []);

  // Save notices to localStorage helper
  const saveNotices = (updatedNotices: Notice[]) => {
    setNotices(updatedNotices);
    localStorage.setItem("vrec_notices", JSON.stringify(updatedNotices));
  };

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!formTitle.trim() || !formContent.trim() || !formAuthor.trim()) {
      setErrorMessage("All fields are strictly required.");
      return;
    }

    // Simulate basic verification. Easy keyword password so users can test it easily.
    if (adminKey !== "vrec" && adminKey !== "admin") {
      setErrorMessage("Authorization key incorrect. Use 'admin' or 'vrec' to simulate faculty publish.");
      return;
    }

    const newNotice: Notice = {
      id: "notice-" + Date.now(),
      title: formTitle,
      category: formCategory,
      date: new Date().toISOString().split("T")[0],
      content: formContent,
      author: formAuthor,
      isImportant: formImportant,
    };

    const updated = [newNotice, ...notices];
    saveNotices(updated);

    // Reset Form
    setFormTitle("");
    setFormContent("");
    setFormAuthor("");
    setFormImportant(false);
    setAdminKey("");
    setShowAddForm(false);
    setSuccessMessage("Notice posted successfully directly onto the live campus stream!");
  };

  const handleDeleteNotice = (id: string) => {
    const code = prompt("Enter Administration Key ('admin') to authorize removal of this official notice:");
    if (code === "admin" || code === "vrec") {
      const updated = notices.filter(n => n.id !== id);
      saveNotices(updated);
      setSuccessMessage("Notice deleted from campus portal.");
    } else if (code !== null) {
      alert("Invalid administration key.");
    }
  };

  const filteredNotices = notices.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          n.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || n.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="noticeboard-section" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            VREC Notice Board
          </h2>
          <p className="mt-2 text-slate-500">
            Official announcements, schedules, exam updates, and placement newsletters.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex cursor-pointer select-none items-center gap-2 rounded-lg bg-red-800 hover:bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all active:scale-95 duration-200"
        >
          <PlusCircle className="h-4 w-4" />
          {showAddForm ? "Hide Publish Form" : "Publish Campus Notice"}
        </button>
      </div>

      {successMessage && (
        <div className="mb-6 rounded-lg bg-emerald-50 border border-emerald-300 p-4 text-sm font-semibold text-emerald-800 flex items-center justify-between">
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage("")} className="text-emerald-500 hover:text-emerald-700 font-bold ml-2">×</button>
        </div>
      )}

      {/* Faculty Publisher Section (Expandable UI) */}
      {showAddForm && (
        <form onSubmit={handleAddNotice} className="mb-10 bg-slate-100 rounded-xl p-6 border border-slate-300 shadow-md">
          <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-red-800" />
            VREC Faculty Notice Publisher
          </h3>

          {errorMessage && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-800 font-medium px-4 py-3 rounded-md text-xs">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Notice Title</label>
              <input
                type="text"
                placeholder="e.g. Supplementary Exams registration window extended"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-800 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as Notice["category"])}
                className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-800 text-slate-900"
              >
                <option value="General">General</option>
                <option value="Academic">Academic</option>
                <option value="Placement">Placement</option>
                <option value="Admissions">Admissions</option>
                <option value="Exam">Exam</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Detailed Content</label>
            <textarea
              rows={4}
              placeholder="Provide a clear description of timelines, batches involved, physical venue, necessary documents etc."
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-800 text-slate-900"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Issuing Authority</label>
              <input
                type="text"
                placeholder="e.g. Principal's Office / HOD CSE"
                value={formAuthor}
                onChange={(e) => setFormAuthor(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-800 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Auth Key (Enter 'admin' or 'vrec')</label>
              <input
                type="password"
                placeholder="Simulate security code..."
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-800 text-slate-900"
              />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="importantCheckbox"
                checked={formImportant}
                onChange={(e) => setFormImportant(e.target.checked)}
                className="h-4 w-4 rounded text-red-800 focus:ring-red-600 focus:outline-none"
              />
              <label htmlFor="importantCheckbox" className="text-sm font-semibold text-slate-700 cursor-pointer">
                Mark as High Priority Alert
              </label>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-sm font-semibold border border-slate-300 rounded text-slate-600 hover:bg-slate-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-slate-900 text-amber-400 border border-slate-900 rounded font-bold hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition"
            >
              Post Notice
            </button>
          </div>
        </form>
      )}

      {/* Notice Board Search and Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50 border border-slate-200 p-4 rounded-xl">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search within titles or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:border-red-800 text-slate-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wide">
            <Filter className="h-3.5 w-3.5" />
            Filter categories:
          </span>
          {["All", "Academic", "Placement", "Admissions", "Exam", "General"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition ${
                categoryFilter === cat
                  ? "bg-red-800 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notice Cards Stream */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => {
            const isAlert = notice.isImportant;
            return (
              <div
                key={notice.id}
                id={`notice-card-${notice.id}`}
                className={`relative bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between ${
                  isAlert ? "border-amber-500 bg-amber-50/20" : "border-slate-200"
                }`}
              >
                <div>
                  {/* Category Badge & Status Indicators */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                        notice.category === "Placement"
                          ? "bg-blue-100 text-blue-800"
                          : notice.category === "Exam"
                          ? "bg-red-100 text-red-800"
                          : notice.category === "Admissions"
                          ? "bg-emerald-100 text-emerald-800"
                          : notice.category === "Academic"
                          ? "bg-violet-100 text-violet-800"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {notice.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{notice.date}</span>
                      </div>
                      
                      {isAlert && (
                        <span className="flex items-center gap-1 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow-sm animate-pulse uppercase">
                          <AlertTriangle className="h-3 w-3" /> Urgent
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Body */}
                  <h4 className="text-lg font-bold text-slate-900 leading-snug mb-3">
                    {notice.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {notice.content}
                  </p>
                </div>

                {/* Footer and Deleted State Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-400 font-bold">
                    Issued by: <span className="text-slate-700">{notice.author}</span>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteNotice(notice.id)}
                    className="p-1.5 rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
                    title="Remove this Notice"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-bold">No college notices matched your filters.</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting the custom search inquiry or select "All" from filtering categories.</p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center bg-amber-100/40 p-4 border border-amber-200 rounded-lg">
        <p className="text-xs text-amber-900 font-bold leading-normal flex items-center justify-center gap-2">
          💡 Faculty Members: Use the passkey <code className="bg-amber-200 px-1 rounded font-bold">vrec</code> to publish updates, schedules and alerts for student populations dynamically!
        </p>
      </div>
    </section>
  );
}
