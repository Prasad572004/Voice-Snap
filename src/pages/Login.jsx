// import React, { useState, useEffect } from "react";
// import { ArrowRightOnRectangleIcon, LightBulbIcon } from "@heroicons/react/24/outline";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [quoteIndex, setQuoteIndex] = useState(0);
//   const [fade, setFade] = useState(true);
//   const navigate = useNavigate();

//   const quotes = [
//     "Authentication is the foundation of trust in digital systems.",
//     "Secure access ensures responsible AI-driven research.",
//     "Identity verification protects innovation and knowledge.",
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFade(false);
//       setTimeout(() => {
//         setQuoteIndex((prev) => (prev + 1) % quotes.length);
//         setFade(true);
//       }, 500);
//     }, 6000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleLogin = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         setMessage("✅ Login successful!");
//         navigate("/dashboard");
//       } else {
//         setMessage("❌ " + (data.error || "Login failed"));
//       }
//     } catch (error) {
//       setMessage("❌ Server error");
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
//       {/* Sidebar */}
//       <aside className="w-1/3 bg-white bg-opacity-10 p-6 flex flex-col justify-between">
//         <div className="text-white">
//           <h2 className="text-2xl font-bold mb-4">Quick Tips</h2>
//           <ul className="text-sm space-y-2 list-disc list-inside">
//             <li>Use registered email & password.</li>
//             <li>Complete OTP verification for secure login.</li>
//             <li>Stay logged in for faster access.</li>
//           </ul>
//         </div>
//         <p className="text-gray-300 text-sm italic">
//           "{quotes[quoteIndex]}"
//         </p>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 flex flex-col justify-center items-center p-8">
//         <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6">
//           Voicesnap Login
//         </h1>

//         <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-3 mb-4 rounded-md"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-3 mb-4 rounded-md"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button
//             onClick={handleLogin}
//             className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition"
//           >
//             <ArrowRightOnRectangleIcon className="w-5 h-5 inline mr-2" />
//             Login
//           </button>
//           {message && <p className="mt-4 text-center text-white">{message}</p>}
//           <p className="text-gray-300 mt-4 text-sm">
//             Don’t have an account?{" "}
//             <span
//               className="text-cyan-400 cursor-pointer underline"
//               onClick={() => navigate("/register")}
//             >
//               Register here
//             </span>
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  const quotes = [
    "Authentication is the foundation of trust in digital systems.",
    "Secure access ensures responsible AI-driven research.",
    "Identity verification protects innovation and knowledge.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setFade(true);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("❌ Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Login successful!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setMessage("❌ " + (data.error || data.message || "Login failed"));
      }
    } catch (error) {
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Sidebar */}
      <aside className="w-1/3 bg-white bg-opacity-10 p-6 flex flex-col justify-between">
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-4">Quick Tips</h2>
          <ul className="text-sm space-y-2 list-disc list-inside">
            <li>Use registered email & password.</li>
            <li>Complete OTP verification for secure login.</li>
            <li>Stay logged in for faster access.</li>
          </ul>
        </div>
        <p className={`text-gray-300 text-sm italic transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
          "{quotes[quoteIndex]}"
        </p>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col justify-center items-center p-8">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6">
          Voicesnap Login
        </h1>

        <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 inline mr-2" />
            Login
          </button>
          {message && <p className="mt-4 text-center text-white">{message}</p>}
          <p className="text-gray-300 mt-4 text-sm">
            Don’t have an account?{" "}
            <span
              className="text-cyan-400 cursor-pointer underline"
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}
