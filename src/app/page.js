"use client";

import Layout from "@/components/Layout";

import {
  CalendarDays,
  Users,
  Wallet,
  Boxes,
  Clock3,
  CheckCircle2,
  AlertCircle,
  Package,
  Briefcase,
  MapPin,
} from "lucide-react";

export default function Dashboard() {

  const stats = [
    {
      title: "Total Employees",
      value: "124",
      icon: Users,
      growth: "+12 this month",
    },
    {
      title: "Upcoming Events",
      value: "08",
      icon: CalendarDays,
      growth: "3 scheduled this week",
    },
    {
      title: "Payroll Processed",
      value: "$42,500",
      icon: Wallet,
      growth: "April payroll synced",
    },
    {
      title: "Inventory Assets",
      value: "856",
      icon: Boxes,
      growth: "12 low stock alerts",
    },
  ];

  const liveEvents = [
    {
      title: "PEPSI RAMADAN TVC",
      location: "Lahore Studio",
      crew: "14 Crew Assigned",
      status: "LIVE",
    },
    {
      title: "BRIDAL CAMPAIGN",
      location: "Karachi Set B",
      crew: "08 Crew Assigned",
      status: "READY",
    },
    {
      title: "CORPORATE PODCAST",
      location: "Islamabad Workspace",
      crew: "05 Crew Assigned",
      status: "SETUP",
    },
  ];

  const modules = [
    {
      title: "HR Management",
      status: "Operational",
      icon: Users,
    },
    {
      title: "Inventory Tracking",
      status: "Stable",
      icon: Package,
    },
    {
      title: "Event Operations",
      status: "Running",
      icon: CalendarDays,
    },
    {
      title: "Payroll System",
      status: "Synced",
      icon: Wallet,
    },
  ];

  const recentActivities = [
    "Ahmed submitted leave request",
    "Sony FX3 assigned to Pepsi TVC",
    "Payroll generated for April",
    "Inventory checked into warehouse",
    "Crew attendance synced successfully",
  ];

  return (

    <Layout>

      <div className="min-h-screen rounded-[40px] bg-[#f4f8ff] p-4 md:p-6 overflow-hidden relative">

        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-[-160px] left-[-120px] w-[420px] h-[420px] rounded-full bg-blue-300/20 blur-3xl" />

          <div className="absolute bottom-[-220px] right-[-120px] w-[520px] h-[520px] rounded-full bg-cyan-300/20 blur-3xl" />

        </div>

        <div className="relative z-10 space-y-6">

          {/* HERO */}
          <div className="relative overflow-hidden rounded-[38px] bg-gradient-to-br from-[#0b1324] via-[#123b89] to-[#2563eb] p-8 md:p-10 shadow-[0_30px_120px_rgba(37,99,235,0.28)]">

            {/* GRID */}
            <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:40px_40px]" />

            {/* GLOW */}
            <div className="absolute top-[-100px] right-[-60px] w-[320px] h-[320px] rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-10 items-center">

              {/* LEFT */}
              <div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-xl text-white text-[11px] uppercase tracking-[0.22em]">

                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />

                  NIZAAMO Workforce OS

                </div>

                <h1 className="mt-7 text-5xl md:text-6xl font-black leading-[0.98] tracking-[-0.06em] text-white max-w-4xl">

                  Production operations.
                  <br />
                  Workforce control.
                  <br />
                  Inventory visibility.

                </h1>

                <p className="mt-6 text-blue-100/80 max-w-2xl leading-relaxed text-base">

                  Centralized management system for events, crew, employees,
                  payroll and production inventory workflows.

                </p>

                {/* TAGS */}
                <div className="mt-8 flex flex-wrap gap-3">

                  <HeroTag label="Event Management" />

                  <HeroTag label="Crew Operations" />

                  <HeroTag label="Payroll System" />

                  <HeroTag label="Inventory Tracking" />

                </div>

                {/* BUTTONS */}
                <div className="mt-10 flex flex-wrap gap-4">

                  <button className="
                    rounded-2xl
                    bg-white
                    px-6
                    py-4
                    text-sm
                    font-semibold
                    text-blue-700
                    shadow-lg
                    hover:scale-[1.02]
                    transition-all
                  ">
                    Open Workspace
                  </button>

                  <button className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/10
                    px-6
                    py-4
                    text-sm
                    font-medium
                    text-white
                    backdrop-blur-xl
                    hover:bg-white/15
                    transition-all
                  ">
                    Operations Stable
                  </button>

                </div>

              </div>

              {/* RIGHT */}
              <div className="rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-2xl p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs uppercase tracking-[0.2em] text-blue-100">
                      Live Operations
                    </p>

                    <h2 className="mt-2 text-4xl font-black text-white tracking-tight">
                      12 Active Events
                    </h2>

                  </div>

                  <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center text-white">

                    <CalendarDays size={30} />

                  </div>

                </div>

                {/* MINI CARDS */}
                <div className="mt-8 grid grid-cols-2 gap-4">

                  <HeroMiniCard
                    label="Crew Online"
                    value="48"
                  />

                  <HeroMiniCard
                    label="Employees"
                    value="124"
                  />

                  <HeroMiniCard
                    label="Inventory Ready"
                    value="856"
                  />

                  <HeroMiniCard
                    label="Payroll"
                    value="$42K"
                  />

                </div>

                {/* STATUS */}
                <div className="
                  mt-6
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/10
                  px-4
                  py-3
                  flex
                  items-center
                  justify-between
                ">

                  <div className="flex items-center gap-3">

                    <div className="
                      w-2.5
                      h-2.5
                      rounded-full
                      bg-emerald-400
                      shadow-[0_0_12px_rgba(74,222,128,0.8)]
                    " />

                    <span className="text-sm text-white/80 font-medium">
                      All systems operational
                    </span>

                  </div>

                  <span className="
                    text-[10px]
                    uppercase
                    tracking-[0.18em]
                    text-cyan-200
                  ">
                    LIVE
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

            {stats.map((item, index) => {

              const Icon = item.icon;

              return (

                <div
                  key={index}
                  className="relative overflow-hidden rounded-[30px] border border-white/70 bg-white/80 backdrop-blur-xl p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)]"
                >

                  <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full bg-blue-100 blur-3xl opacity-70" />

                  <div className="relative z-10 flex items-start justify-between">

                    <div>

                      <p className="text-sm font-medium text-slate-500">
                        {item.title}
                      </p>

                      <h3 className="mt-4 text-4xl font-black text-slate-900 tracking-tight">
                        {item.value}
                      </h3>

                      <p className="mt-4 text-xs text-blue-600 font-medium">
                        {item.growth}
                      </p>

                    </div>

                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-200">

                      <Icon size={28} />

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">

            {/* LIVE EVENTS */}
            <div className="rounded-[34px] bg-white/80 backdrop-blur-xl border border-white/70 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)]">

              <div className="flex items-center justify-between border-b border-blue-50 pb-5">

                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-blue-600">
                    Event Operations
                  </p>

                  <h2 className="mt-2 text-3xl font-black text-slate-900">
                    Live Events
                  </h2>

                </div>

                <div className="w-14 h-14 rounded-3xl bg-blue-100 text-blue-700 flex items-center justify-center">

                  <Briefcase size={24} />

                </div>

              </div>

              <div className="mt-6 space-y-4">

                {liveEvents.map((event, index) => (

                  <div
                    key={index}
                    className="rounded-3xl bg-blue-50/70 border border-blue-100 p-5"
                  >

                    <div className="flex items-start justify-between gap-4 flex-wrap">

                      <div>

                        <p className="text-xs uppercase tracking-[0.2em] text-blue-500">
                          Active Production
                        </p>

                        <h3 className="mt-2 text-xl font-black text-slate-900">
                          {event.title}
                        </h3>

                      </div>

                      <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100">

                        <CheckCircle2 size={12} />

                        {event.status}

                      </div>

                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">

                      <div className="flex items-center gap-2">

                        <MapPin size={15} className="text-blue-600" />

                        {event.location}

                      </div>

                      <div className="flex items-center gap-2">

                        <Users size={15} className="text-blue-600" />

                        {event.crew}

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">

              {/* MODULES */}
              <div className="rounded-[34px] bg-white/80 backdrop-blur-xl border border-white/70 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)]">

                <div className="flex items-center justify-between mb-6">

                  <div>

                    <p className="text-xs uppercase tracking-[0.2em] text-blue-600">
                      System Modules
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-slate-900">
                      Operational Status
                    </h2>

                  </div>

                  <div className="w-14 h-14 rounded-3xl bg-blue-100 text-blue-700 flex items-center justify-center">

                    <Package size={24} />

                  </div>

                </div>

                <div className="space-y-4">

                  {modules.map((module, index) => {

                    const Icon = module.icon;

                    return (

                      <div
                        key={index}
                        className="rounded-2xl bg-blue-50/70 border border-blue-100 p-4 flex items-center justify-between"
                      >

                        <div className="flex items-center gap-4">

                          <div className="w-11 h-11 rounded-2xl bg-white text-blue-700 flex items-center justify-center shadow-sm">

                            <Icon size={18} />

                          </div>

                          <div>

                            <h3 className="text-sm font-semibold text-slate-900">
                              {module.title}
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                              Module operational
                            </p>

                          </div>

                        </div>

                        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
                          {module.status}
                        </div>

                      </div>
                    );
                  })}

                </div>

              </div>

              {/* ACTIVITY */}
              <div className="rounded-[34px] bg-white/80 backdrop-blur-xl border border-white/70 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)]">

                <div className="flex items-center justify-between mb-6">

                  <div>

                    <p className="text-xs uppercase tracking-[0.2em] text-blue-600">
                      Activity Feed
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-slate-900">
                      Recent Updates
                    </h2>

                  </div>

                  <div className="w-14 h-14 rounded-3xl bg-blue-100 text-blue-700 flex items-center justify-center">

                    <AlertCircle size={24} />

                  </div>

                </div>

                <div className="space-y-4">

                  {recentActivities.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-2xl bg-blue-50/70 border border-blue-100 p-4"
                    >

                      <div className="w-10 h-10 rounded-2xl bg-white text-blue-700 flex items-center justify-center shadow-sm">

                        <Clock3 size={18} />

                      </div>

                      <div className="flex-1">

                        <h4 className="text-sm font-semibold text-slate-800">
                          {item}
                        </h4>

                        <p className="mt-1 text-xs text-slate-500">
                          Synced recently in workspace.
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
}

function HeroTag({ label }) {

  return (

    <div className="
      inline-flex
      items-center
      rounded-2xl
      border
      border-white/10
      bg-white/10
      px-4
      py-3
      text-sm
      font-medium
      text-white
      backdrop-blur-xl
    ">
      {label}
    </div>

  );
}

function HeroMiniCard({
  label,
  value,
}) {

  return (

    <div className="
      rounded-2xl
      border
      border-white/10
      bg-black/10
      p-4
    ">

      <p className="
        text-[10px]
        uppercase
        tracking-[0.16em]
        text-white/55
      ">
        {label}
      </p>

      <h3 className="
        mt-2
        text-3xl
        font-black
        tracking-tight
        text-white
      ">
        {value}
      </h3>

    </div>

  );
}