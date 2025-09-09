

// import React, { useState, useEffect } from "react";
// import {
//   MicrophoneIcon,
//   SpeakerWaveIcon,
//   ArrowRightOnRectangleIcon,
//   LightBulbIcon,
// } from "@heroicons/react/24/outline";

// function App() {
//   const [textInput, setTextInput] = useState("");
//   const [audioFile, setAudioFile] = useState(null);
//   const [resultText, setResultText] = useState("");
//   const [activeTab, setActiveTab] = useState("tts");
//   const [quoteIndex, setQuoteIndex] = useState(0);
//   const [fade, setFade] = useState(true);
//   const [waveHeights, setWaveHeights] = useState(
//     Array.from({ length: 20 }, () => Math.random() * 60 + 20)
//   );

//   // Professional quotes for research-oriented dashboard
//   const quotes = [
//     "The human voice is the most powerful instrument of communication.",
//     "Speech recognition and synthesis are at the forefront of human-computer interaction.",
//     "Voice data is the next frontier in AI-driven research.",
//     "Transforming spoken language into actionable data empowers scientific discovery.",
//     "Effective speech interfaces bridge humans and machines in research innovation.",
//   ];

//   // Rotate quotes
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFade(false);
//       setTimeout(() => {
//         setQuoteIndex((prev) => (prev + 1) % quotes.length);
//         setFade(true);
//       }, 500);
//     }, 7000); // slower rotation for professional feel

//     return () => clearInterval(interval);
//   }, []);

//   // Animate waveform
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setWaveHeights(
//         Array.from({ length: 20 }, () => Math.random() * 60 + 20)
//       );
//     }, 300);
//     return () => clearInterval(interval);
//   }, []);

//   const handleTextToSpeech = async () => {
//     if (!textInput.trim()) return alert("Enter some text!");
//     try {
//       const response = await fetch("http://localhost:5000/tts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: textInput }),
//       });
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "output.mp3";
//       a.click();
//     } catch (err) {
//       console.error(err);
//       alert("TTS failed");
//     }
//   };

//   const handleSpeechToText = async () => {
//     if (!audioFile) return alert("Upload an audio file first!");
//     const formData = new FormData();
//     formData.append("file", audioFile);

//     try {
//       const response = await fetch("http://localhost:5000/stt", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();
//       setResultText(data.text || data.error);

//       if (data.text) {
//         const blob = new Blob([data.text], { type: "text/plain" });
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = "recognized_text.txt";
//         a.click();
//       }
//     } catch (err) {
//       console.error(err);
//       alert("STT failed");
//     }
//   };

//   const handleLogout = () => alert("Logged out successfully!");

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 overflow-hidden">
//       {/* Left Sidebar */}
//       <aside className="w-1/4 bg-white bg-opacity-10 backdrop-blur-md p-6 flex flex-col items-center justify-start space-y-8 relative">
//         {/* Tips Section */}
//         <div className="w-full bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-4 text-white shadow-lg">
//           <h3 className="flex items-center mb-2 font-semibold text-lg">
//             <LightBulbIcon className="w-5 h-5 mr-2" />
//             Quick Tips
//           </h3>
//           <ul className="text-sm space-y-1 list-disc list-inside">
//             <li>Upload MP3/WAV files for STT</li>
//             <li>Click Convert to download audio/text</li>
//             <li>Switch tabs for TTS/STT</li>
//             <li>Use clear speech for accurate recognition</li>
//           </ul>
//         </div>

//         {/* Reactive waveform */}
//         <div className="w-full flex items-end justify-center space-x-1 mt-8 relative">
//           {waveHeights.map((height, i) => (
//             <div
//               key={i}
//               className="w-1 rounded-full transition-all duration-300"
//               style={{
//                 height: `${height}px`,
//                 background: `linear-gradient(180deg, #00f6ff, #a259ff)`,
//               }}
//             ></div>
//           ))}
//         </div>
//       </aside>

//       {/* Main Panel */}
//       <main className="flex-1 p-8 flex flex-col items-center justify-start relative">
//         {/* Logout button */}
//         <button
//           onClick={handleLogout}
//           className="absolute top-4 right-4 flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
//         >
//           <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
//           Logout
//         </button>

//         {/* Centered Header */}
//         <div className="w-full flex flex-col items-center mb-6 text-center">
//           <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-2">
//             Voicesnap
//           </h1>
//           <p
//             className={`text-gray-200 text-lg md:text-xl max-w-xl mb-2 italic transition-opacity duration-500 ${
//               fade ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             "{quotes[quoteIndex]}"
//           </p>
//           <p className="text-gray-300 text-lg md:text-xl max-w-xl">
//             Convert voice to text or text to voice instantly.
//           </p>
//         </div>

//         {/* Tabs */}
//         <div className="flex mb-8 space-x-4 justify-center w-full">
//           <button
//             onClick={() => setActiveTab("tts")}
//             className={`px-6 py-2 rounded-lg font-semibold transition ${
//               activeTab === "tts"
//                 ? "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white shadow-lg"
//                 : "bg-white bg-opacity-20 text-white"
//             }`}
//           >
//             Text to Speech
//           </button>
//           <button
//             onClick={() => setActiveTab("stt")}
//             className={`px-6 py-2 rounded-lg font-semibold transition ${
//               activeTab === "stt"
//                 ? "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white shadow-lg"
//                 : "bg-white bg-opacity-20 text-white"
//             }`}
//           >
//             Speech to Text
//           </button>
//         </div>

//         {/* Panels */}
//         {activeTab === "tts" && (
//           <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-md mb-8 hover:scale-105 hover:shadow-2xl transition-transform duration-300">
//             <h2 className="text-2xl font-semibold text-white mb-4 flex items-center justify-center">
//               <SpeakerWaveIcon className="w-6 h-6 mr-2" /> Text to Speech
//             </h2>
//             <textarea
//               className="w-full p-3 rounded-md mb-4"
//               rows={4}
//               placeholder="Enter text here..."
//               value={textInput}
//               onChange={(e) => setTextInput(e.target.value)}
//             ></textarea>
//             <button
//               onClick={handleTextToSpeech}
//               className="px-6 py-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow hover:animate-pulse transition w-full"
//             >
//               Convert to Audio
//             </button>
//           </div>
//         )}

//         {activeTab === "stt" && (
//           <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-md mb-8 hover:scale-105 hover:shadow-2xl transition-transform duration-300">
//             <h2 className="text-2xl font-semibold text-white mb-4 flex items-center justify-center">
//               <MicrophoneIcon className="w-6 h-6 mr-2" /> Speech to Text
//             </h2>
//             <input
//               type="file"
//               accept="audio/*"
//               className="w-full mb-4"
//               onChange={(e) => setAudioFile(e.target.files[0])}
//             />
//             <button
//               onClick={handleSpeechToText}
//               className="px-6 py-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow hover:animate-pulse transition w-full"
//             >
//               Convert & Download Text
//             </button>
//             {resultText && (
//               <p className="mt-4 p-3 bg-white bg-opacity-30 rounded text-gray-800 text-center">
//                 {resultText}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Footer */}
//         <footer className="mt-auto text-gray-400 text-sm text-center mb-4">
//           Made with ❤️ by Voicesnap |{" "}
//           <a href="#" className="underline">
//             GitHub
//           </a>
//         </footer>
//       </main>
//     </div>
//   );
// }

// export default App;





import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
