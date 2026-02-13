import React from "react";

const SchoolHeader = () => {
  return (
    <header className="w-full relative overflow-hidden bg-white text-slate-900">
      {/* Top info bar */}
      <div className="w-full bg-orange-100 text-orange-700 text-xs py-1 px-6 flex justify-end gap-4 font-medium">
        <span>📞 +91 12345 67890</span>
        <span>✉️ info@abcschool.com</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <div className="w-28 h-28 rounded-full bg-orange-100 text-orange-900 flex items-center justify-center text-4xl font-extrabold shadow-2xl ring-8 ring-orange-200 transition-transform duration-300 hover:scale-105">
          S
        </div>

        {/* School Name & Info */}
        <div className="ml-6 flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-orange-900">
            ABC Public School
          </h1>
          <div className="mt-2 px-4 py-1.5 bg-orange-50 rounded-full text-sm text-orange-700 inline-block font-semibold">
            Knowledge • Discipline • Character
          </div>

          {/* divider */}
          <div className="mt-4 w-32 h-1 bg-orange-300 rounded-full" />

          {/* Info badges */}
          <div className="mt-4 flex flex-wrap gap-3 text-xs md:text-sm">
            <span className="px-4 py-1.5 rounded-full bg-orange-50 border border-orange-300 hover:shadow-md transition text-orange-800 font-medium">CBSE Affiliated</span>
            <span className="px-4 py-1.5 rounded-full bg-orange-50 border border-orange-300 hover:shadow-md transition text-orange-800 font-medium">Established 1998</span>
            <span className="px-4 py-1.5 rounded-full bg-orange-50 border border-orange-300 hover:shadow-md transition text-orange-800 font-medium">Academic Session 2025–26</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SchoolHeader;
