// import React, { useState } from "react";
// import { ShieldCheckIcon } from "@heroicons/react/24/outline";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function VerifyOtp() {
//   const [otp, setOtp] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email || "";

//   const handleVerify = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp }),
//       });

//       // Always read as text first (Spring Boot may return plain string)
//       const text = await response.text();
//       let data;
//       try {
//         data = JSON.parse(text); // if JSON
//       } catch {
//         data = text; // otherwise plain string
//       }

//       if (response.ok) {
//         setMessage("✅ " + data);
//         // ⬅️ Navigate directly to dashboard
//         setTimeout(() => navigate("/dashboard"), 2000);
//       } else {
//         setMessage("❌ " + (data.error || data.message || data));
//       }
//     } catch (error) {
//       setMessage("❌ Server error, please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
//       <main className="flex-1 flex flex-col justify-center items-center p-8">
//         <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6">
//           Verify OTP
//         </h1>

//         <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
//           <input
//             type="text"
//             placeholder="Enter 6-digit OTP"
//             className="w-full p-3 mb-4 rounded-md"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />
//           <button
//             onClick={handleVerify}
//             className="w-full px-6 py-3 bg-gradient-to-r from-green-400 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition"
//           >
//             <ShieldCheckIcon className="w-5 h-5 inline mr-2" />
//             Verify OTP
//           </button>
//           {message && <p className="mt-4 text-center text-white">{message}</p>}
//         </div>
//       </main>
//     </div>
//   );
// }



import React, { useState } from "react";
import { ShieldCheckIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [isResending, setIsResending] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem("email") || "";

  const handleVerify = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      if (response.ok) {
        setMessage("✅ " + data);
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setMessage("❌ " + (data.error || data.message || data));
      }
    } catch (error) {
      setMessage("❌ Server error, please try again.");
    }
  };

  // 🆕 Resend OTP
  const handleResendOtp = async () => {
    if (!email) return setResendMessage("❌ Email not found.");

    setIsResending(true);
    setResendMessage("");
    try {
      const response = await fetch("http://localhost:8080/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      if (response.ok) {
        setResendMessage("✅ OTP resent successfully. Check your email.");
      } else {
        setResendMessage("❌ " + (data.error || data.message || data));
      }
    } catch (error) {
      setResendMessage("❌ Failed to resend OTP.");
    }
    setIsResending(false);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <main className="flex-1 flex flex-col justify-center items-center p-8">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6">
          Verify OTP
        </h1>

        <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            className="w-full p-3 mb-4 rounded-md"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={handleVerify}
            className="w-full px-6 py-3 mb-4 bg-gradient-to-r from-green-400 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition"
          >
            <ShieldCheckIcon className="w-5 h-5 inline mr-2" />
            Verify OTP
          </button>

          <button
            onClick={handleResendOtp}
            disabled={isResending}
            className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
          >
            <ArrowPathIcon className="w-5 h-5 inline mr-2" />
            {isResending ? "Resending..." : "Resend OTP"}
          </button>

          {message && <p className="mt-4 text-center text-white">{message}</p>}
          {resendMessage && (
            <p className="mt-2 text-center text-yellow-200">{resendMessage}</p>
          )}
        </div>
      </main>
    </div>
  );
}
