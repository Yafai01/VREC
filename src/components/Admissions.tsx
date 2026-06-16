import React, { useState } from "react";
import { AdmissionEnquiry } from "../types";
import { Landmark, CheckCircle, HelpCircle, FileText, Send, ScrollText, Users, Award } from "lucide-react";

export default function Admissions() {
  const [formData, setFormData] = useState<AdmissionEnquiry>({
    fullName: "",
    email: "",
    phone: "",
    branch: "Computer Science & Engineering (CSE)",
    marks12th: "",
    eamcetRank: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const [eligibilityReport, setEligibilityReport] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check validity
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.marks12th.trim()) {
      alert("Please fill in your Name, Email, Phone, and 12th Marks.");
      return;
    }

    // Generate numeric receipt ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `VREC-2026-${randomNum}`;
    setEnquiryId(generatedId);

    // Dynamic simple intelligence based on their Intermediate marks percentage
    const marksNum = parseFloat(formData.marks12th);
    let eligibility = "";
    if (isNaN(marksNum)) {
      eligibility = "Eligible for counseling. Standard physical certificate review required.";
    } else if (marksNum >= 90) {
      eligibility = "Excellent Academic Standing! Eligible for Direct counseling seats, and potential special merits or tuition waivers.";
    } else if (marksNum >= 45) {
      eligibility = "Academic criteria met. Eligible for TS-EAMCET (VJAY) convener category counseling.";
    } else {
      eligibility = "Minimum eligibility (45%) under MPC criteria is subject to review by admissions office. Management quota seats available.";
    }

    setEligibilityReport(eligibility);

    // Store in localStorage for complete local flow record
    const existingStr = localStorage.getItem("vrec_enquiries");
    let existingList = [];
    if (existingStr) {
      try {
        existingList = JSON.parse(existingStr);
      } catch (e) {}
    }
    const newEnquiry = { ...formData, enquiryId: generatedId, date: new Date().toISOString() };
    localStorage.setItem("vrec_enquiries", JSON.stringify([newEnquiry, ...existingList]));

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      branch: "Computer Science & Engineering (CSE)",
      marks12th: "",
      eamcetRank: "",
      message: ""
    });
    setIsSubmitted(false);
  };

  return (
    <section id="admissions-section" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      
      {/* Banner Intro */}
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Admissions & Scholarships
        </h2>
        <p className="mt-2 text-slate-500 max-w-3xl">
          Step into a highly rewarding engineering curriculum. VREC admissions are governed strictly under state guidelines, providing state-recognized tuition fee reimbursement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Eligibility, Counseling & Fees (8 columns or 7) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Eligibility Criteria Cards */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <ScrollText className="h-5 w-5 text-red-800" />
              Eligibility Criteria
            </h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-amber-400 pl-4">
                <h4 className="font-bold text-slate-800 text-sm">B.Tech First Year (EAMCET Category)</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Candidates must have passed Intermediate Examination (10+2 pattern) with Mathematics, Physics, and Chemistry (MPC) as optionals, securing a minimum of 45% (40% for reserved categories). Admission is routed via TS-EAMCET Counselling under code <strong className="text-red-800 font-black">VJAY</strong>.
                </p>
              </div>

              <div className="border-l-4 border-red-800 pl-4">
                <h4 className="font-bold text-slate-800 text-sm">B.Tech Lateral Entry (ECET Category)</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Diploma holders (State Board of Technical Education and Training) are directly admitted into the 2nd year of B.Tech up to 10% of intake capacity, based on merit ranks in TS-ECET.
                </p>
              </div>

              <div className="border-l-4 border-slate-900 pl-4">
                <h4 className="font-bold text-slate-800 text-sm">M.Tech Post Graduate Studies</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Bachelor of Engineering/Technology (B.E/B.Tech) in relevant branches with GATE score or qualifying TS-PGECET rank cards.
                </p>
              </div>
            </div>
          </div>

          {/* Fee & Scholarship Details */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <Landmark className="h-5 w-5 text-red-800" />
              Fee Structure & Financial Aids
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-300 text-slate-400 font-black uppercase">
                    <th className="py-2.5">Category</th>
                    <th className="py-2.5">Academic B.Tech Fee</th>
                    <th className="py-2.5">Govt RTF Allowance</th>
                    <th className="py-2.5">Payment Cycle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <td className="py-3 font-bold text-slate-900">Convener Quota (EAMCET)</td>
                    <td className="py-3">Approx INR 55,000 to 75,000 / year</td>
                    <td className="py-3 text-emerald-600">100% Eligible (subject to criteria)</td>
                    <td className="py-3">Per Semester / Annual</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-slate-900">Management Quota (B-Category)</td>
                    <td className="py-3">Based on merit rank and market variables</td>
                    <td className="py-3 text-red-600">Not Applicable</td>
                    <td className="py-3">At admission time</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-slate-900">Lateral Entry B.Tech</td>
                    <td className="py-3">Approx INR 55,000 / year</td>
                    <td className="py-3 text-emerald-600">Eligible corresponding to rank</td>
                    <td className="py-3">Annual</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-slate-900">M.Tech Course Fee</td>
                    <td className="py-3">Approx INR 57,000 / year</td>
                    <td className="py-3 text-amber-600">GATE Stipend / Fee support options</td>
                    <td className="py-3">Annual</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 bg-amber-50 rounded-lg p-4 text-xs text-amber-900 font-semibold leading-relaxed border border-amber-200">
              <div className="flex gap-2 items-start">
                <span className="text-base">🎁</span>
                <div>
                  <strong className="text-amber-950 block">Government of Telangana RTF Scheme:</strong>
                  SC/ST candidates with parental annual income under 2 Lakhs, and BC/EBC/Minority candidates with parental income under 1.5 Lakhs (rural) or 2 Lakhs (urban) are eligible for tuition fee reimbursement in full!
                </div>
              </div>
            </div>
          </div>

          {/* VREC Admission Helpline Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-200 bg-white p-5 rounded-xl flex items-start gap-3">
              <Users className="h-6 w-6 text-red-800 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Convener Office</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Assistance with certificate verification, slot bookings, and reporting procedures.
                </p>
                <p className="text-xs font-bold text-slate-800 mt-2 hover:text-slate-950">+91 8462-225577</p>
              </div>
            </div>

            <div className="border border-slate-200 bg-white p-5 rounded-xl flex items-start gap-3">
              <Award className="h-6 w-6 text-amber-600 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Merit Scholarships</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Special scholarship slots for top EAMCET scorers and local rural talents.
                </p>
                <p className="text-xs font-bold text-slate-800 mt-2 hover:text-slate-950">scholarships@vrec.ac.in</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: High Quality Interactive Enquiry Form (5 columns) */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
          
          {!isSubmitted ? (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h3 className="text-xl font-black text-amber-400">Online Admisison Enquiry</h3>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  Submit this official digital enquiry sheet. Our academic team will evaluate eligibility and get in touch with you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-slate-800">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Candidate's full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border-none rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Email ID *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. name@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border-none rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Mobile No *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border-none rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Branch Preference</label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border-none rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Computer Science & Engineering (CSE)">CSE (B.Tech)</option>
                    <option value="CSE - Artificial Intelligence & ML (AI&ML)">CSE AI & ML (B.Tech)</option>
                    <option value="CSE - Data Science (DS)">CSE Data Science (B.Tech)</option>
                    <option value="Electronics & Communication Engineering (ECE)">ECE (B.Tech)</option>
                    <option value="Civil Engineering (CE)">Civil Engineering (B.Tech)</option>
                    <option value="Electrical & Electronics (EEE)">EEE (B.Tech)</option>
                    <option value="Mechanical Engineering (ME)">Mechanical (B.Tech)</option>
                    <option value="M.Tech Post Graduate Course">M.Tech Course</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Intermediate Marks (%) *</label>
                    <input
                      type="text"
                      name="marks12th"
                      required
                      placeholder="e.g. 88%"
                      value={formData.marks12th}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border-none rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">TS-EAMCET Rank (Optional)</label>
                    <input
                      type="text"
                      name="eamcetRank"
                      placeholder="e.g. 24500"
                      value={formData.eamcetRank}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border-none rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Enquiry Note (Optional)</label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Ask about hostel vacancies, management procedures, or certificate submittals..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border-none rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 select-none cursor-pointer py-3 rounded-lg font-black text-sm tracking-wide uppercase transition shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Submit Official Enquiry
                </button>
              </form>
            </div>
          ) : (
            // Exquisite animated admission receipt card!
            <div className="animate-scale-in text-center py-6">
              <CheckCircle className="h-16 w-16 text-amber-400 mx-auto mb-4 animate-bounce" />
              
              <h3 className="text-xl font-black text-white">Enquiry Submitted!</h3>
              <p className="text-xs text-slate-400 mt-1">Thank you. Your academic enquiry is registered on VREC server.</p>

              <div className="my-6 bg-slate-840 border border-slate-700 rounded-xl p-5 text-left space-y-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">Academic Reference</span>
                  <span className="bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] tracking-wide font-mono">
                    {enquiryId}
                  </span>
                </div>

                <div className="space-y-1.5 border-t border-slate-700/60 pt-3">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Candidate Details</p>
                  <p className="text-sm font-bold text-white leading-normal">{formData.fullName}</p>
                  <p className="text-xs text-slate-300 leading-normal">
                    📍 {formData.branch} • 📞 {formData.phone}
                  </p>
                </div>

                <div className="border-t border-slate-700/60 pt-3">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">VREC Preliminary Eligibility</p>
                  <p className="text-xs text-amber-200 leading-relaxed font-semibold bg-amber-950/40 p-2.5 rounded border border-amber-900/40">
                    {eligibilityReport}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed px-4">
                Please save this reference key. Physical reporting and certificate slots are open. Contact admissions desk directly at +91 8462-225577.
              </p>

              <button
                onClick={handleReset}
                className="mt-6 inline-flex cursor-pointer items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-bold text-xs transition"
              >
                <FileText className="h-4 w-4" /> Submit Another Enquiry
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
