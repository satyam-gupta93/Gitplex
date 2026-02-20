import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navar";
import HeatMapProfile from "./Heatmap";
import { useAuth } from "../../authContext";

const NAV_TABS = [
  { label: "Overview", icon: "", path: null },
  { label: "Starred Repositories", icon: "", path: "/repo" },
];

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [userDetails, setUserDetails] = useState({ username: "username" });
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/userProfile/${userId}`
         );
          setUserDetails(response.data);
        } catch (err) {
          console.error("Cannot fetch user details: ", err);
        }
      }
    };
    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
    window.location.href = "/auth";
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
      <Navbar />

      {/* Tab Bar */}
      <div className="border-b border-[#21262d] px-6">
        <div className="max-w-7xl mx-auto flex gap-1">
          {NAV_TABS.map((tab) => (
            <button
              key={tab.label}
              onClick={() => {
                setActiveTab(tab.label);
                if (tab.path) navigate(tab.path);
              }}
              className={`flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-colors ${
                activeTab === tab.label
                  ? "border-[#f78166] text-[#e6edf3] font-semibold"
                  : "border-transparent text-[#8b949e] hover:text-[#e6edf3] hover:border-[#30363d]"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Page Body */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">

        {/* Left — User Card */}
        <aside className="w-72 shrink-0 flex flex-col gap-4">
          {/* Avatar */}
          <div className="w-full aspect-square rounded-full bg-[#21262d] border-2 border-[#30363d] overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 16 16" fill="#8b949e" className="w-24 h-24">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            </svg>
          </div>

          {/* Username */}
          <div>
            <h2 className="text-xl font-bold text-white">
              {userDetails.username}
            </h2>
            {userDetails.bio && (
              <p className="text-sm text-[#8b949e] mt-1">{userDetails.bio}</p>
            )}
          </div>

          {/* Follow Button */}
          <button className="w-full py-1.5 text-sm font-semibold border border-[#30363d] rounded-md text-[#e6edf3] hover:bg-[#21262d] transition-colors">
            Follow
          </button>

          {/* Followers */}
          <div className="flex items-center gap-3 text-sm text-[#8b949e]">
            <span>
              <span className="font-semibold text-[#e6edf3]">10</span> followers
            </span>
            <span>·</span>
            <span>
              <span className="font-semibold text-[#e6edf3]">3</span> following
            </span>
          </div>

          <hr className="border-[#21262d]" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full py-1.5 text-sm font-semibold border border-[#f85149] rounded-md text-[#f85149] hover:bg-[#f8514920] transition-colors"
          >
            Logout
          </button>
        </aside>

        {/* Right — Heatmap */}
        <main className="flex-1 min-w-0">
          <HeatMapProfile />
        </main>

      </div>
    </div>
  );
};

export default Profile;