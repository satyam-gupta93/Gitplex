// import React, { useState, useEffect } from "react";
// import Navbar from "../Navar";

// const Dashboard = () => {
//   const [repositories, setRepositories] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestedRepositories, setSuggestedRepositories] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");

//     const fetchRepositories = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/repo/user/${userId}`);
//         const data = await response.json();
//         setRepositories(data.repositories);
//       } catch (err) {
//         console.error("Error while fetching repositories: ", err);
//       }
//     };

//     const fetchSuggestedRepositories = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/repo/all`);
//         const data = await response.json();
//         setSuggestedRepositories(data);
//       } catch (err) {
//         console.error("Error while fetching repositories: ", err);
//       }
//     };

//     fetchRepositories();
//     fetchSuggestedRepositories();
//   }, []);

//   useEffect(() => {
//     if (searchQuery === "") {
//       setSearchResults(repositories);
//     } else {
//       const filteredRepo = repositories.filter((repo) =>
//         repo.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setSearchResults(filteredRepo);
//     }
//   }, [searchQuery, repositories]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">

//         {/* Left Aside — Suggested Repositories */}
//         <aside className="hidden lg:flex flex-col gap-3 w-64 shrink-0">
//           <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
//             Suggested Repositories
//           </h3>
//           {suggestedRepositories.map((repo) => (
//             <div
//               key={repo._id}
//               className="bg-gray-800 border border-gray-700 rounded-lg p-3 hover:border-gray-500 transition-colors"
//             >
//               <p className="text-sm font-medium text-blue-400 truncate">
//                 {repo.name}
//               </p>
//               <p className="text-xs text-gray-400 mt-1 line-clamp-2">
//                 {repo.description}
//               </p>
//             </div>
//           ))}
//         </aside>

//         {/* Main — Your Repositories */}
//         <main className="flex-1 flex flex-col gap-4">
//           <h2 className="text-lg font-semibold text-white">
//             Your Repositories
//           </h2>

//           {/* Search */}
//           <input
//             type="text"
//             value={searchQuery}
//             placeholder="Search repositories..."
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />

//           {/* Repository List */}
//           {searchResults.length > 0 ? (
//             searchResults.map((repo) => (
//               <div
//                 key={repo._id}
//                 className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-500 transition-colors cursor-pointer"
//               >
//                 <p className="text-sm font-medium text-blue-400">{repo.name}</p>
//                 <p className="text-xs text-gray-400 mt-1">{repo.description}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">No repositories found.</p>
//           )}
//         </main>

//         {/* Right Aside — Upcoming Events */}
//         <aside className="hidden lg:flex flex-col gap-3 w-56 shrink-0">
//           <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
//             Upcoming Events
//           </h3>
//           {[
//             { label: "Tech Conference", date: "Dec 15" },
//             { label: "Developer Meetup", date: "Dec 25" },
//             { label: "React Summit", date: "Jan 5" },
//           ].map((event) => (
//             <div
//               key={event.label}
//               className="bg-gray-800 border border-gray-700 rounded-lg p-3"
//             >
//               <p className="text-sm font-medium text-white">{event.label}</p>
//               <p className="text-xs text-gray-400 mt-0.5">{event.date}</p>
//             </div>
//           ))}
//         </aside>

//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import Navbar from "../Navar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3000/repo/user/${userId}`);
        const data = await response.json();
        setRepositories(data.repositories ?? []);
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3000/repo/all`);
        const data = await response.json();
        setSuggestedRepositories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      setSearchResults(
        repositories.filter((repo) =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, repositories]);

  // Language dot colors
  const langColors = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-400",
    Python: "bg-blue-600",
    HTML: "bg-orange-500",
    CSS: "bg-purple-500",
    default: "bg-gray-400",
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">

        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col gap-4 w-72 shrink-0">
          {/* Avatar + Username */}
          <div className="flex flex-col items-center gap-3">
            <img
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${userId}`}
              alt="avatar"
              className="w-64 h-64 rounded-full border-2 border-[#30363d]"
              onError={(e) => {
                e.target.src = "https://github.com/identicons/github.png";
              }}
            />
            <h2 className="text-xl font-bold text-white">
              {userId ?? "username"}
            </h2>
          </div>

          <hr className="border-[#21262d]" />

          {/* Suggested Repos */}
          <div>
            <h3 className="text-sm font-semibold text-[#e6edf3] mb-3">
              Suggested Repositories
            </h3>
            <div className="flex flex-col gap-2">
              {suggestedRepositories.length > 0 ? (
                suggestedRepositories.slice(0, 5).map((repo) => (
                  <div
                    key={repo._id}
                    className="flex items-center justify-between py-1"
                  >
                    <span className="text-sm text-[#58a6ff] hover:underline cursor-pointer truncate">
                      {repo.name}
                    </span>
                    <button className="text-xs border border-[#30363d] rounded-md px-2 py-0.5 text-[#e6edf3] hover:bg-[#21262d] transition-colors ml-2 shrink-0">
                      Star
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#8b949e]">No suggestions yet.</p>
              )}
            </div>
          </div>

          <hr className="border-[#21262d]" />

          {/* Upcoming Events */}
          <div>
            <h3 className="text-sm font-semibold text-[#e6edf3] mb-3">
              Upcoming Events
            </h3>
            {[
              { label: "Tech Conference", date: "Dec 15" },
              { label: "Developer Meetup", date: "Dec 25" },
              { label: "React Summit", date: "Jan 5" },
            ].map((event) => (
              <div key={event.label} className="flex justify-between items-center py-1.5">
                <span className="text-sm text-[#58a6ff] hover:underline cursor-pointer">
                  {event.label}
                </span>
                <span className="text-xs text-[#8b949e]">{event.date}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Search + Filter bar */}
          <div className="flex items-center gap-3 mb-4">
            <input
              type="text"
              value={searchQuery}
              placeholder="Find a repository..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-md bg-[#0d1117] border border-[#30363d] text-sm text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
            />
            <button className="text-sm border border-[#30363d] rounded-md px-3 py-1.5 text-[#e6edf3] hover:bg-[#21262d] transition-colors">
              Type ▾
            </button>
            <button className="text-sm border border-[#30363d] rounded-md px-3 py-1.5 text-[#e6edf3] hover:bg-[#21262d] transition-colors">
              Language ▾
            </button>
            <button className="text-sm border border-[#30363d] rounded-md px-3 py-1.5 text-[#e6edf3] hover:bg-[#21262d] transition-colors">
              Sort ▾
            </button>
          </div>

          {/* Repository List */}
          <div className="flex flex-col divide-y divide-[#21262d] border-t border-[#21262d]">
            {searchResults.length > 0 ? (
              searchResults.map((repo) => (
                <div key={repo._id} className="py-5 flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-1.5 min-w-0">
                    {/* Name + Visibility */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[#58a6ff] font-semibold text-lg hover:underline cursor-pointer">
                        {repo.name}
                      </span>
                      <span className="text-xs border border-[#30363d] rounded-full px-2 py-0.5 text-[#8b949e]">
                        {repo.isPrivate ? "Private" : "Public"}
                      </span>
                    </div>

                    {/* Description */}
                    {repo.description && (
                      <p className="text-sm text-[#8b949e] line-clamp-2">
                        {repo.description}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-4 mt-1 flex-wrap">
                      {repo.language && (
                        <span className="flex items-center gap-1.5 text-xs text-[#8b949e]">
                          <span
                            className={`w-3 h-3 rounded-full ${
                              langColors[repo.language] ?? langColors.default
                            }`}
                          />
                          {repo.language}
                        </span>
                      )}
                      {repo.stars !== undefined && (
                        <span className="text-xs text-[#8b949e]">
                          ⭐ {repo.stars}
                        </span>
                      )}
                      {repo.updatedAt && (
                        <span className="text-xs text-[#8b949e]">
                          Updated on{" "}
                          {new Date(repo.updatedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Star Button */}
                  <button className="shrink-0 flex items-center gap-1.5 text-sm border border-[#30363d] rounded-md px-3 py-1 text-[#e6edf3] hover:bg-[#21262d] transition-colors">
                    ☆ Star
                  </button>
                </div>
              ))
            ) : (
              <p className="py-8 text-sm text-[#8b949e] text-center">
                No repositories found.
              </p>
            )}
          </div>
        </main>

      </div>
    </div>
  );
};

export default Dashboard;