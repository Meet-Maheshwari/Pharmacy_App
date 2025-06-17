import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Menu, X, Search } from "lucide-react"; // optional icons for hamburger and close

const Navbar = () => {
  const { userData, logout } = useAuthStore();
  const [searchInput, setSearchInput] = useState("");
  const [showMenu, setShowMenu] = useState(false); // for mobile nav toggle
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const isClick = e === "click";

    if ((e.key === "Enter" || isClick) && searchInput.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput("");
      setShowMenu(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-white flex flex-col md:flex-row md:justify-between md:items-center h-auto md:h-14 py-3 px-4 sticky top-0 z-50">
      {/* Top Row: Brand + Hamburger + Search */}
      <div className="flex w-full items-center justify-between md:w-auto">
        <h1 className="text-2xl font-bold text-green-400 px-2">MyPharma</h1>

        {/* Hamburger Button (only on small screens) */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden focus:outline-none"
        >
          {showMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Search Input (always visible, above nav in mobile) */}
      <div className="w-full md:w-auto mt-2 mb-2 md:mt-0 md:mb-0 relative">
        <button
          type="button"
          onClick={() => handleSearch("click")}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500"
        >
          <Search size={18} />
        </button>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearch}
          className="w-full md:w-80 h-8 pl-10 border focus:ring-green-400 border-b-emerald-400 border-b-2 text-base rounded-md text-center"
          placeholder="Search medicines by name, brand, etc"
        />
      </div>

      {/* Navigation Links */}
      <ul
        className={`flex flex-col items-end md:flex-row md:items-center md:justify-evenly w-full md:w-96 mt-4 md:mt-0 transition-all duration-300 ease-in-out ${
          showMenu ? "block" : "hidden"
        } md:flex`}
      >
        <li className="text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "underline decoration-emerald-400" : ""
            }
            onClick={() => setShowMenu(false)}
          >
            Home
          </NavLink>
        </li>

        <li className="text-lg">
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? "underline decoration-emerald-400" : ""
            }
            onClick={() => setShowMenu(false)}
          >
            Orders
          </NavLink>
        </li>

        <li className="text-lg">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "underline decoration-emerald-400" : ""
            }
            onClick={() => setShowMenu(false)}
          >
            Cart
          </NavLink>
        </li>

        {userData ? (
          <div className="w-8 h-8 flex justify-center items-center rounded-full bg-green-400 text-white relative group mt-2 md:mt-0">
            {userData.username[0].toUpperCase()}
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-white rounded pt-10">
              <ul className="list-none m-0 p-2 bg-slate-700 text-sm">
                <li
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }}
                  className="py-1 px-2 hover:bg-slate-500 cursor-pointer pr-10"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <li className="text-lg mt-2 md:mt-0">
            <NavLink to="/login" onClick={() => setShowMenu(false)}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
