import React, { useState } from "react";
import { PlacementStat } from "../types";
import { Award, CheckCircle, TrendingUp, Cpu, Flame, BarChart3, HelpCircle } from "lucide-react";

const STATS: PlacementStat[] = [
  { year: "2021", placedPercentage: 74, offersCount: 280, highestPackage: "7.5 LPA", averagePackage: "3.2 LPA" },
  { year: "2022", placedPercentage: 81, offersCount: 345, highestPackage: "9.0 LPA", averagePackage: "3.8 LPA" },
  { year: "2023", placedPercentage: 85, offersCount: 420, highestPackage: "10.0 LPA", averagePackage: "4.2 LPA" },
  { year: "2024", placedPercentage: 88, offersCount: 485, highestPackage: "12.0 LPA", averagePackage: "4.5 LPA" },
  { year: "2025", placedPercentage: 91, offersCount: 512, highestPackage: "12.5 LPA", averagePackage: "4.8 LPA" }
];

const RECRUITERS = [
  { name: "TCS", logo: "💻", description: "Tata Consultancy Services Ltd, elite recruitments" },
  { name: "Infosys", logo: "🔷", description: "Infosys Global Systems systems engineer intake" },
  { name: "Wipro", logo: "🟣", description: "Wipro Turbo & Elite development tracks" },
  { name: "Capgemini", logo: "🔵", description: "Capgemini India software associate pipelines" },
  { name: "Cognizant", logo: "🟧", description: "Cognizant GenC developer recruitment rounds" },
  { name: "DXC Technology", logo: "🟩", description: "DXC Enterprise service deployment engineering" },
  { name: "Tech Mahindra", logo: "🔴", description: "Tech Mahindra communication engineering profiles" }
];

const TESTIMONIALS = [
  {
    name: "G. Preethi",
    branch: "B.Tech (CSE), Class of 2025",
    company: "TCS (Digital Developer)",
    package: "7.0 LPA",
    quote: "The VREC Placement cell started coding bootcamps for us in the 2nd year itself. The mock interviews and quantitative training made crack the TCS Digital screening smooth!"
  },
  {
    name: "Mohammad Fahad",
    branch: "B.Tech (ECE), Class of 2024",
    company: "Capgemini (Software Analyst)",
    package: "4.2 LPA",
    quote: "Being from ECE, I was worried about software placements, but the customized full-stack developer workshops curated by our college filled the gaps perfectly."
  },
  {
    name: "T. Naresh",
    branch: "B.Tech (Mechanical), Class of 2025",
    company: "Jindal Steel & Power",
    package: "5.5 LPA",
    quote: "Superb alignment with core and computational manufacturing topics allowed me to score highly in my technical rounds. Truly thankful to VREC faculty!"
  }
];

export default function Placements() {
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);

  return (
    <section id="placements-section" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      
      {/* Placement Header */}
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Promising Placements & Career Growth
        </h2>
        <p className="mt-2 text-slate-500 max-w-3xl">
          Vijay Rural Engineering College is a focal point of young software and mechanical minds in the district. Our active Training and Placement Cell works 365 days to ensure corporate-ready skills.
        </p>
      </div>

      {/* Grid of Placement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        <div className="bg-gradient-to-br from-red-900 to-red-800 text-white rounded-2xl p-6 shadow-md flex items-center gap-5">
          <div className="h-14 w-14 shrink-0 rounded-full bg-red-950 flex items-center justify-center text-amber-400 font-bold shadow-inner">
            <TrendingUp className="h-7 w-7" />
          </div>
          <div>
            <div className="text-xs uppercase font-bold text-red-200 tracking-wider">Placement Rate</div>
            <div className="text-3xl font-black mt-1">91%</div>
            <div className="text-xs text-red-100/80 mt-1">Highest among local Nizamabad colleges</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md flex items-center gap-5">
          <div className="h-14 w-14 shrink-0 rounded-full bg-slate-950 flex items-center justify-center text-amber-400 font-bold shadow-inner">
            <Award className="h-7 w-7" />
          </div>
          <div>
            <div className="text-xs uppercase font-bold text-slate-300 tracking-wider">Highest Package</div>
            <div className="text-3xl font-black mt-1 text-amber-400">12.5 LPA</div>
            <div className="text-xs text-slate-300 mt-1">Lakhs Per Annum • Capgemini Tech Drive</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-600 to-amber-500 text-slate-900 rounded-2xl p-6 shadow-md flex items-center gap-5">
          <div className="h-14 w-14 shrink-0 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold shadow-inner">
            <Cpu className="h-7 w-7" />
          </div>
          <div>
            <div className="text-xs uppercase font-black text-amber-950 tracking-wider">Average Package</div>
            <div className="text-3xl font-black mt-1">4.8 LPA</div>
            <div className="text-xs text-amber-950 mt-1">For B.Tech CSE & ECE branches</div>
          </div>
        </div>

      </div>

      {/* SVG Analytics Chart and Recruiter stream in grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Left: Custom SVG Bar Chart showing Placements Record over years (7 columns) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-red-800" />
              Annual Recruitments & Placements Growth
            </h3>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold uppercase">Dynamic Metric</span>
          </div>

          {/* SVG Custom Rendered Bar Chart */}
          <div className="relative w-full h-80 pt-6">
            <div className="absolute inset-0 flex flex-col justify-between">
              {/* Grid Lines */}
              {[100, 75, 50, 25, 0].map((val) => (
                <div key={val} className="w-full flex items-center text-[10px] text-slate-400 font-bold border-b border-slate-100 pb-1">
                  <span className="w-8 shrink-0">{val}%</span>
                  <div className="w-full h-px"></div>
                </div>
              ))}
            </div>

            {/* Bars wrapper */}
            <div className="relative z-10 h-full flex items-end justify-around pl-10 pr-4 pb-4">
              {STATS.map((stat) => {
                const heightPercent = stat.placedPercentage;
                const isHovered = hoveredYear === stat.year;
                return (
                  <div
                    key={stat.year}
                    className="flex flex-col items-center w-12 cursor-pointer group"
                    onMouseEnter={() => setHoveredYear(stat.year)}
                    onMouseLeave={() => setHoveredYear(null)}
                  >
                    {/* Tooltip on Hover */}
                    <div className={`absolute bottom-full mb-2 bg-slate-900 text-white text-[10px] font-black rounded-lg px-2.5 py-1.5 shadow-md flex flex-col items-center transition-all duration-200 pointer-events-none ${
                        isHovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-1 scale-95"
                    }`}>
                      <span className="text-amber-400 font-bold">{stat.offersCount} total offers</span>
                      <span className="text-[9px] text-slate-300">Highest: {stat.highestPackage}</span>
                    </div>

                    {/* Bar visual representation */}
                    <div
                      style={{ height: `${heightPercent * 2}px` }}
                      className={`w-10 rounded-t-lg transition-all duration-300 relative overflow-hidden ${
                        isHovered 
                          ? "bg-amber-400 shadow-lg" 
                          : "bg-red-800 hover:bg-red-700"
                      }`}
                    >
                      <div className="absolute top-0 inset-x-0 h-1 bg-white/20"></div>
                      <div className="absolute inset-y-0 right-0 w-1.5 bg-black/10"></div>
                    </div>

                    <span className="text-xs font-bold text-slate-600 mt-2">{stat.year}</span>
                    <span className="text-[10px] font-black text-slate-400 group-hover:text-slate-900">
                      {stat.placedPercentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center font-semibold mt-4">
            💡 Hover over the college placement bars to view specific recruitment quantities and packages!
          </p>
        </div>

        {/* Right: Cooperating Recruiters (5 columns) */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Flame className="h-4.5 w-4.5 text-amber-500" />
            VREC Recruiting Partners
          </h3>

          <div className="space-y-3.5">
            {RECRUITERS.map((rec) => (
              <div
                key={rec.name}
                className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-4 hover:border-amber-400 hover:shadow-xs transition"
              >
                <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl shadow-xs">
                  {rec.logo}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-normal">{rec.name}</h4>
                  <p className="text-xs text-slate-500 leading-normal font-medium">{rec.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Testimonials */}
      <div>
        <h3 className="text-xl font-black text-slate-900 mb-6 text-center md:text-left">
          Alumni Success Stories
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-slate-300 transition"
            >
              <div>
                <p className="text-base text-slate-400 font-serif leading-none mb-2">“</p>
                <p className="text-sm text-slate-600 leading-relaxed italic mb-4">
                  {test.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2.5">
                <div>
                  <h4 className="text-xs font-black text-slate-900 leading-normal">{test.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold leading-none mt-0.5">{test.branch}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded">
                    {test.company}
                  </span>
                  <p className="text-[9px] text-slate-400 font-black mt-0.5">{test.package} Offer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
