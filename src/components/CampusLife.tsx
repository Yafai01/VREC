import React, { useState } from "react";
import { Landmark, Library, Bus, Dumbbell, ShieldCheck, Heart, Coffee, BookOpen } from "lucide-react";

export default function CampusLife() {
  const [activeSegment, setActiveSegment] = useState<"hostels" | "library" | "transport" | "sports">("hostels");

  const segments = [
    { id: "hostels", label: "Residential Hostels", icon: Coffee },
    { id: "library", label: "Central Library", icon: Library },
    { id: "transport", label: "Bus fleet & Transport", icon: Bus },
    { id: "sports", label: "Sports & Recreation", icon: Dumbbell }
  ];

  return (
    <section id="campuslife-section" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12 animate-fade-in">
      
      {/* Sector Header */}
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Life @ VREC Campus
        </h2>
        <p className="mt-2 text-slate-500 max-w-3xl">
          More than classrooms, VREC Nizamabad offers a vibrant, green 30-acre residential eco-system designed to enrich personal and physical engineering talents.
        </p>
      </div>

      {/* Interactive Tabs Menu */}
      <div className="flex flex-wrap gap-2.5 mb-10 border-b border-slate-200 pb-4">
        {segments.map((seg) => {
          const IconComp = seg.icon;
          const isActive = activeSegment === seg.id;
          return (
            <button
              key={seg.id}
              onClick={() => setActiveSegment(seg.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl cursor-pointer text-sm font-bold transition ${
                isActive
                  ? "bg-red-800 text-white shadow-md scale-102"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <IconComp className="h-4.5 w-4.5" />
              <span>{seg.label}</span>
            </button>
          );
        })}
      </div>

      {/* Segment Dynamic Content Slots */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        
        {/* Hostels Segment */}
        {activeSegment === "hostels" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 mb-3">
                <Coffee className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-black text-slate-900 leading-snug">
                Separate Boys & Girls Hostels
              </h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                VREC provides dedicated, highly secured separate on-campus hostels for boys and girls. Formulated with a homely atmosphere, the blocks are supervised by resident faculty wardens.
              </p>

              <div className="mt-6 space-y-3.5">
                <div className="flex gap-3 items-start text-xs font-semibold text-slate-700">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="text-slate-900 block">Round-the-clock Security:</strong>
                    Armed checkpoints, active CC Camera networks, and strict outpass tracking systems.
                  </div>
                </div>

                <div className="flex gap-3 items-start text-xs font-semibold text-slate-700">
                  <BookOpen className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="text-slate-900 block">Study & Recreation Halls:</strong>
                    Equipped with print daily newspapers, high-speed WiFi modules, and dedicated study desks.
                  </div>
                </div>

                <div className="flex gap-3 items-start text-xs font-semibold text-slate-700">
                  <Heart className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="text-slate-900 block">Balanced Hygienic Mess:</strong>
                    Weekly dietitian-screened meal plans, fresh vegetable delivery, and continuous hot/solar water.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
                Hostel Administration & Timings
              </h4>
              
              <ul className="divide-y divide-slate-200 text-xs text-slate-700 font-semibold space-y-2.5">
                <li className="flex justify-between py-1.5">
                  <span className="text-slate-500">Mess Timings</span>
                  <span className="text-slate-900">Breakfast: 7:30 AM | Dinner: 7:30 PM</span>
                </li>
                <li className="flex justify-between py-1.5">
                  <span className="text-slate-500">Security Gate Curfew</span>
                  <span className="text-slate-900">Strictly 6:30 PM (No exceptions)</span>
                </li>
                <li className="flex justify-between py-1.5">
                  <span className="text-slate-500">Capacity Available</span>
                  <span className="text-slate-900">Boys Block: 150 | Girls Block: 150</span>
                </li>
                <li className="flex justify-between py-1.5">
                  <span className="text-slate-500">WIFI Allottments</span>
                  <span className="text-emerald-700">Free 100 Mbps (Subject to study filter)</span>
                </li>
              </ul>
              
              <div className="mt-6 text-[10px] text-slate-400 font-semibold italic text-center">
                * Outstation parents are provided temporary overnight dormitories during admissions weeks upon scheduling request.
              </div>
            </div>
          </div>
        )}

        {/* Central Library Segment */}
        {activeSegment === "library" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-3">
                <Library className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-black text-slate-900 leading-snug">
                Fully Digitalized Central Library
              </h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                As the academic nerve-center of VREC Manik Bhandar, our Central Library spreads across a gigantic floor space housing standard textbook racks, journal aisles, and computing research hubs.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                  <div className="text-xl font-black text-slate-900">45,000+</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Printed Volumes</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                  <div className="text-xl font-black text-slate-900">120+</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Print Journals</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                  <div className="text-xl font-black text-slate-900">DELNET</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">E-subscription</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                  <div className="text-xl font-black text-slate-900">200+</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Student Capacity</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Digital & Reference Facilities
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                The digital center is stacked with high-speed computation nodes connected over 100 Mbps fiber trunklines, letting research minds pull down JNTU research papers, IEEE directories, and NPTEL course repositories instantly.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs font-semibold text-blue-900">
                ⭐ VREC students are eligible for direct free card system, authorizing them to draft three text books concurrently for a continuous period of 15 days!
              </div>
            </div>
          </div>
        )}

        {/* Transport Routes */}
        {activeSegment === "transport" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 mb-3">
                <Bus className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-black text-slate-900 leading-snug">
                Connected Transport Fleets
              </h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Connecting students from far and wide. VREC operates an elegant transit network of 15+ premium college buses threading diverse nodes of Nizamabad, Armoor, Bodhan, and adjacent centers safely.
              </p>

              <div className="mt-5 bg-emerald-50 rounded-lg p-4 text-xs font-semibold text-emerald-900 border border-emerald-200">
                🚍 All vehicles are fitted with absolute Speed Limiters, GPS tracking devices and security staff to ensure safe transit grids.
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
                Operational Transport Routes & coverage
              </h4>

              <div className="space-y-3.5 text-xs font-semibold text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-204">
                  <span>Route A: Nizamabad City</span>
                  <span className="text-slate-900 text-right">Bus stand, Shivaji Nagar, Vinayak Nagar, Kanteshwar</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-204">
                  <span>Route B: Armoor Sector</span>
                  <span className="text-slate-900 text-right">Perkit, Mamidipally, Armoor Center</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-204">
                  <span>Route C: Bodhan Transit</span>
                  <span className="text-slate-900 text-right">Bodhan Bus Depot, Shakar Nagar</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-204">
                  <span>Route D: Kamareddy Hub</span>
                  <span className="text-slate-900 text-right">Deccan highway crossings, Kamareddy Outer Bypass</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sports and Recreation */}
        {activeSegment === "sports" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100 text-rose-600 mb-3">
                <Dumbbell className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-black text-slate-900 leading-snug">
                Elite Sports & Recreation Arenas
              </h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Health and study co-exist. The VREC Physical Education branch organizes annual JNTU Inter-college Tournaments, housing extensive playing zones to develop focus, posture, and sportsman traits.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3.5 text-xs font-bold text-slate-700">
                <div className="border border-slate-200 p-2.5 rounded-lg flex items-center gap-2 bg-slate-50">
                  <span className="text-base">🏏</span>
                  <span>Full-Turf Cricket Field</span>
                </div>
                <div className="border border-slate-200 p-2.5 rounded-lg flex items-center gap-2 bg-slate-50">
                  <span className="text-base">🏐</span>
                  <span>Volleyball Courts</span>
                </div>
                <div className="border border-slate-200 p-2.5 rounded-lg flex items-center gap-2 bg-slate-50">
                  <span className="text-base">🏓</span>
                  <span>Indoor Table Tennis Arena</span>
                </div>
                <div className="border border-slate-200 p-2.5 rounded-lg flex items-center gap-2 bg-slate-50">
                  <span className="text-base">♟️</span>
                  <span>Chess & Carrom Lounge</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                Annual Achievements
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Our college Cricket Team has secured runnerups in the Zone-A JNTUH cricket tournament. Annual VREC Athletic Meet is conducted during sports week, encouraging track and field sprint races, shot put, and high jumps.
              </p>
              
              <div className="text-xs text-rose-800 font-bold border-l-4 border-rose-600 pl-3">
                ⛹️ Gym facility with standard weight plates, benches, and dumbbells is available under the guidance of Physical Directress Mrs. G. Kavitha.
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
