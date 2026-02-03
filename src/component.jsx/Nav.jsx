import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState({
    Home: false,
    About: false,
    Services: false,
    Portfolio: false,
    Blog: false,
    Contact: false,
    FAQ: false,
    Support: false,
  });

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const toggleSubmenu = (item) => {
    setSubmenuOpen((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <nav className="bg-orange-600 text-white relative z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold z-50 relative">MyLogo</div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex justify-center gap-6 z-50 relative">
            {["Home","About","Services","Portfolio","Blog","Contact","FAQ","Support"].map((item) => (
              <li key={item} className="relative group">
                <span className="cursor-pointer px-4 py-2 hover:bg-orange-500 rounded transition-colors duration-200">
                  {item}
                </span>
                <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-orange-500 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                  <li className="p-2 hover:bg-orange-400 border-b border-orange-400">Sub 1</li>
                  <li className="p-2 hover:bg-orange-400">Sub 2</li>
                </ul>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center z-50 relative">
            <button onClick={toggleMobileMenu}>
              {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <ul className="md:hidden flex flex-col gap-2 bg-orange-600 pb-4 relative z-50">
            {["Home","About","Services","Portfolio","Blog","Contact","FAQ","Support"].map((item) => (
              <li key={item} className="flex flex-col relative z-50">
                <button
                  onClick={() => toggleSubmenu(item)}
                  className="w-full text-left px-4 py-2 hover:bg-orange-500 rounded flex justify-between items-center transition-colors duration-200"
                >
                  {item}
                  <span>{submenuOpen[item] ? "-" : "+"}</span>
                </button>
                {submenuOpen[item] && (
                  <ul className="bg-orange-500 ml-4 mt-1 rounded z-50 relative">
                    <li className="px-4 py-2 hover:bg-orange-400 border-b border-orange-400">Sub 1</li>
                    <li className="px-4 py-2 hover:bg-orange-400">Sub 2</li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
