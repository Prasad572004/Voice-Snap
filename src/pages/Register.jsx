// import React, { useState } from "react";
// import { UserPlusIcon } from "@heroicons/react/24/outline";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, email, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setMessage("✅ Registration successful! Verify OTP sent to email.");
//         navigate("/verify-otp", { state: { email } });
//       } else {
//         setMessage("❌ " + (data.error || "Registration failed"));
//       }
//     } catch (error) {
//       setMessage("❌ Server error");
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
//       <main className="flex-1 flex flex-col justify-center items-center p-8">
//         <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6">
//           Voicesnap Registration
//         </h1>

//         <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
//           <input
//             type="text"
//             placeholder="Username"
//             className="w-full p-3 mb-4 rounded-md"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
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
//             onClick={handleRegister}
//             className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition"
//           >
//             <UserPlusIcon className="w-5 h-5 inline mr-2" />
//             Register
//           </button>
//           {message && <p className="mt-4 text-center text-white">{message}</p>}
//         </div>
//       </main>
//     </div>
//   );
// }





// import React, { useState } from "react";
// import { UserPlusIcon } from "@heroicons/react/24/outline";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ fullName, email, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setMessage("✅ Registration successful! Verify OTP sent to email.");
//         setTimeout(() => navigate("/verify-otp", { state: { email } }), 1500);
//       } else {
//         setMessage("❌ " + (data.error || data.message || "Registration failed"));
//       }
//     } catch (error) {
//       setMessage("❌ Server error");
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
//       <main className="flex-1 flex flex-col justify-center items-center p-8">
//         <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6">
//           Voicesnap Registration
//         </h1>

//         <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="w-full p-3 mb-4 rounded-md"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//           />
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
//             onClick={handleRegister}
//             className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition"
//           >
//             <UserPlusIcon className="w-5 h-5 inline mr-2" />
//             Register
//           </button>
//           {message && <p className="mt-4 text-center text-white">{message}</p>}
//         </div>
//       </main>
//     </div>
//   );
// }



import React, { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      setMessage("❌ Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Registration successful! Verify OTP sent to email.");
        setTimeout(() => navigate("/verify-otp", { state: { email } }), 1500);
      } else {
        setMessage("❌ " + (data.error || data.message || "Registration failed"));
      }
    } catch (error) {
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <main className="flex-1 flex flex-col justify-center items-center p-8">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6">
          Voicesnap Registration
        </h1>

        <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mb-4 rounded-md"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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
            onClick={handleRegister}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition"
          >
            <UserPlusIcon className="w-5 h-5 inline mr-2" />
            Register
          </button>
          {message && <p className="mt-4 text-center text-white">{message}</p>}
        </div>
      </main>
    </div>
  );
}
