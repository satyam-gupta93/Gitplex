// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="flex items-center justify-between px-6 py-3 border-b-2 border-white bg-gray-900">
      
      
//       <Link to="/" className="flex items-center gap-3 hover:underline">
//         <img
//           src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
//           alt="GitHub Logo"
//           className="h-10 w-10 rounded-full"
//         />
//         <h3 className="text-white font-semibold text-lg">GitHub</h3>
//       </Link>

//       {/* Nav Links */}
//       <div className="flex items-center gap-10">
//         <Link
//           to="/create"
//           className="text-white font-bold hover:underline"
//         >
//           Create a Repository
//         </Link>
//         <Link
//           to="/profile"
//           className="text-white font-bold hover:underline"
//         >
//           Profile
//         </Link>
//       </div>

//     </nav>
//   );
// };

// export default Navbar;import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-[#161b22] border-b border-[#21262d]">

      {/* Left — Logo */}
      <Link to="/" className="flex items-center gap-2">
        <svg height="32" viewBox="0 0 16 16" width="32" fill="white">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
            -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
            2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
            0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
            0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68
            0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44
            1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
            0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54
            1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38
            A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
      </Link>

      {/* Center — Search */}
      <div className="flex-1 max-w-sm mx-6">
        <div className="flex items-center gap-2 bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm text-[#8b949e] hover:border-[#58a6ff] transition-colors cursor-text">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
          </svg>
          <span>Type / to search</span>
        </div>
      </div>

      {/* Right — Nav Links */}
      <div className="flex items-center gap-1">
        <Link
          to="/create"
          className="flex items-center gap-1.5 text-sm text-[#e6edf3] px-3 py-1.5 rounded-md hover:bg-[#21262d] transition-colors"
        >
          {/* Plus icon */}
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2z"/>
          </svg>
          New
          <svg width="10" height="10" fill="currentColor" viewBox="0 0 16 16" className="text-[#8b949e]">
            <path d="M4.427 7.427l3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427z"/>
          </svg>
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-1.5 text-sm text-[#e6edf3] px-3 py-1.5 rounded-md hover:bg-[#21262d] transition-colors"
        >
          {/* Person icon */}
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
          </svg>
          Profile
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;