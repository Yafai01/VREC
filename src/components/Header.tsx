import React, { useState } from "react";
import { Phone, Mail, Award, BookOpen, GraduationCap, Menu, X, Landmark, Compass } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "departments", label: "Departments" },
    { id: "admissions", label: "Admissions" },
    { id: "placements", label: "Placements" },
    { id: "campus-life", label: "Campus Life" },
    { id: "notice-board", label: "Notice Board" },
    { id: "chatbot", label: "AI Counselor" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 text-white shadow-xl">
      {/* Top Notification / Quick Contact Bar */}
      <div className="bg-gradient-to-r from-red-800 via-amber-700 to-amber-600 px-4 py-2 text-xs font-semibold sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-amber-200" />
              <span className="hover:text-amber-100 transition-colors">+91 8462-223456</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-amber-200" />
              <span className="hover:text-amber-100 transition-colors">info@vrec.ac.in</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 bg-amber-950/40 px-2 py-0.5 rounded text-amber-100 font-bold tracking-wider">
              <GraduationCap className="h-3.5 w-3.5 text-amber-300" />
              TS-EAMCET Code: VJAY
            </span>
            <span className="hidden sm:inline text-amber-100">| Approved by AICTE & Affiliated to JNTUH</span>
          </div>
        </div>
      </div>

      {/* Main Header / Brand Navigation */}
      <div className="bg-slate-950 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          {/* Logo / Crest Area */}
          <div 
            onClick={() => setActiveTab("home")} 
            className="flex cursor-pointer items-center gap-3 active:scale-95 transition-transform"
          >
            {/* Visual Crest */}
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-red-800 p-0.5 shadow-md">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <Landmark className="h-7 w-7 text-amber-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-black text-slate-950 shadow">
                V
              </div>
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight sm:text-xl text-amber-400">
                VIJAY RURAL
              </h1>
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                Engineering College • Nizamabad
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  id={`nav-tab-${item.id}`}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Action Icon */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800Focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay Slider */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 py-3 shadow-inner">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-amber-500 text-slate-950"
                        : "text-slate-300 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
