// import React, { useState, useEffect } from "react";
// import {
//   MicrophoneIcon,
//   SpeakerWaveIcon,
//   ArrowRightOnRectangleIcon,
//   LightBulbIcon,
// } from "@heroicons/react/24/outline";

// function Dashboard() {
//   const [textInput, setTextInput] = useState("");
//   const [audioFile, setAudioFile] = useState(null);
//   const [resultText, setResultText] = useState("");
//   const [activeTab, setActiveTab] = useState("tts");
//   const [quoteIndex, setQuoteIndex] = useState(0);
//   const [fade, setFade] = useState(true);
//   const [waveHeights, setWaveHeights] = useState(
//     Array.from({ length: 20 }, () => Math.random() * 60 + 20)
//   );

//   const quotes = [
//     "The human voice is the most powerful instrument of communication.",
//     "Speech recognition and synthesis are at the forefront of human-computer interaction.",
//     "Voice data is the next frontier in AI-driven research.",
//     "Transforming spoken language into actionable data empowers scientific discovery.",
//     "Effective speech interfaces bridge humans and machines in research innovation.",
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFade(false);
//       setTimeout(() => {
//         setQuoteIndex((prev) => (prev + 1) % quotes.length);
//         setFade(true);
//       }, 500);
//     }, 7000);
//     return () => clearInterval(interval);
//   }, []);

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
//       const response = await fetch("http://localhost:8080/api/audio/tts", {
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
//       const response = await fetch("http://localhost:8080/api/audio/att", {
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
//       {/* Sidebar */}
//       <aside className="w-1/4 bg-white bg-opacity-10 backdrop-blur-md p-6 flex flex-col items-center justify-start space-y-8 relative">
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

//         {/* Waveform */}
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

//       {/* Main */}
//       <main className="flex-1 p-8 flex flex-col items-center justify-start relative">
//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           className="absolute top-4 right-4 flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
//         >
//           <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
//           Logout
//         </button>

//         {/* Header */}
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
//           <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-md mb-8">
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
//               className="px-6 py-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow transition w-full"
//             >
//               Convert to Audio
//             </button>
//           </div>
//         )}

//         {activeTab === "stt" && (
//           <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-md mb-8">
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
//               className="px-6 py-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow transition w-full"
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

// export default Dashboard;



// import React, { useState, useEffect } from "react";
// import {
//   MicrophoneIcon,
//   SpeakerWaveIcon,
//   ArrowRightOnRectangleIcon,
//   LightBulbIcon,
// } from "@heroicons/react/24/outline";

// function Dashboard() {
//   const [textInput, setTextInput] = useState("");
//   const [audioFile, setAudioFile] = useState(null);
//   const [resultText, setResultText] = useState("");
//   const [activeTab, setActiveTab] = useState("tts");
//   const [quoteIndex, setQuoteIndex] = useState(0);
//   const [fade, setFade] = useState(true);
//   const [waveHeights, setWaveHeights] = useState(
//     Array.from({ length: 20 }, () => Math.random() * 60 + 20)
//   );

//   const [ttsAudioUrl, setTtsAudioUrl] = useState(null); // store audio file
//   const [sttText, setSttText] = useState(null); // store text result

//   const quotes = [
//     "The human voice is the most powerful instrument of communication.",
//     "Speech recognition and synthesis are at the forefront of human-computer interaction.",
//     "Voice data is the next frontier in AI-driven research.",
//     "Transforming spoken language into actionable data empowers scientific discovery.",
//     "Effective speech interfaces bridge humans and machines in research innovation.",
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFade(false);
//       setTimeout(() => {
//         setQuoteIndex((prev) => (prev + 1) % quotes.length);
//         setFade(true);
//       }, 500);
//     }, 7000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setWaveHeights(
//         Array.from({ length: 20 }, () => Math.random() * 60 + 20)
//       );
//     }, 300);
//     return () => clearInterval(interval);
//   }, []);

//   // ✅ Convert text to speech (Flask)
//   const handleTextToSpeech = async () => {
//     if (!textInput.trim()) return alert("Enter some text!");
//     try {
//       const response = await fetch("http://localhost:5000/tts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: textInput }),
//       });
//       if (!response.ok) throw new Error("TTS request failed");

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       setTtsAudioUrl(url); // store audio url
//     } catch (err) {
//       console.error(err);
//       alert("TTS failed");
//     }
//   };

//   // ✅ Convert speech to text (Flask)
//   const handleSpeechToText = async () => {
//     if (!audioFile) return alert("Upload an audio file first!");
//     const formData = new FormData();
//     formData.append("file", audioFile);

//     try {
//       const response = await fetch("http://localhost:5000/att", {
//         method: "POST",
//         body: formData,
//       });
//       if (!response.ok) throw new Error("STT request failed");

//       const data = await response.json();
//       setResultText(data.text || data.error);
//       setSttText(data.text || null);
//     } catch (err) {
//       console.error(err);
//       alert("STT failed");
//     }
//   };

//   // ✅ Manual download for TTS
//   const downloadTtsAudio = () => {
//     if (!ttsAudioUrl) return;
//     const a = document.createElement("a");
//     a.href = ttsAudioUrl;
//     a.download = "output.mp3";
//     a.click();
//   };

//   // ✅ Manual download for STT
//   const downloadSttText = () => {
//     if (!sttText) return;
//     const blob = new Blob([sttText], { type: "text/plain" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "recognized_text.txt";
//     a.click();
//   };

//   const handleLogout = () => alert("Logged out successfully!");

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 overflow-hidden">
//       {/* Sidebar */}
//       <aside className="w-1/4 bg-white bg-opacity-10 backdrop-blur-md p-6 flex flex-col items-center justify-start space-y-8 relative">
//         <div className="w-full bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-4 text-white shadow-lg">
//           <h3 className="flex items-center mb-2 font-semibold text-lg">
//             <LightBulbIcon className="w-5 h-5 mr-2" />
//             Quick Tips
//           </h3>
//           <ul className="text-sm space-y-1 list-disc list-inside">
//             <li>Upload MP3/WAV files for STT</li>
//             <li>Click Convert first, then Download</li>
//             <li>Switch tabs for TTS/STT</li>
//             <li>Use clear speech for accurate recognition</li>
//           </ul>
//         </div>

//         {/* Waveform */}
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

//       {/* Main */}
//       <main className="flex-1 p-8 flex flex-col items-center justify-start relative">
//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           className="absolute top-4 right-4 flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
//         >
//           <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
//           Logout
//         </button>

//         {/* Header */}
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
//           <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-md mb-8">
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
//             <div className="flex space-x-4">
//               <button
//                 onClick={handleTextToSpeech}
//                 className="flex-1 px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow transition"
//               >
//                 Convert
//               </button>
//               {ttsAudioUrl && (
//                 <button
//                   onClick={downloadTtsAudio}
//                   className="flex-1 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow transition"
//                 >
//                   Download
//                 </button>
//               )}
//             </div>
//             {ttsAudioUrl && (
//               <audio
//                 controls
//                 src={ttsAudioUrl}
//                 className="mt-4 w-full rounded"
//               ></audio>
//             )}
//           </div>
//         )}

//         {activeTab === "stt" && (
//           <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-md mb-8">
//             <h2 className="text-2xl font-semibold text-white mb-4 flex items-center justify-center">
//               <MicrophoneIcon className="w-6 h-6 mr-2" /> Speech to Text
//             </h2>
//             <input
//               type="file"
//               accept="audio/*"
//               className="w-full mb-4"
//               onChange={(e) => setAudioFile(e.target.files[0])}
//             />
//             <div className="flex space-x-4">
//               <button
//                 onClick={handleSpeechToText}
//                 className="flex-1 px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow transition"
//               >
//                 Convert
//               </button>
//               {sttText && (
//                 <button
//                   onClick={downloadSttText}
//                   className="flex-1 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow transition"
//                 >
//                   Download
//                 </button>
//               )}
//             </div>
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

// export default Dashboard;



import React, { useState, useEffect } from "react";
import {
  MicrophoneIcon,
  SpeakerWaveIcon,
  ArrowRightOnRectangleIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

function Dashboard() {
  const [textInput, setTextInput] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [resultText, setResultText] = useState("");
  const [activeTab, setActiveTab] = useState("tts");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [waveHeights, setWaveHeights] = useState(
    Array.from({ length: 20 }, () => Math.random() * 60 + 20)
  );

  const [ttsAudioUrl, setTtsAudioUrl] = useState(null);
  const [sttText, setSttText] = useState(null);

  const quotes = [
    "The human voice is the most powerful instrument of communication.",
    "Speech recognition and synthesis are at the forefront of human-computer interaction.",
    "Voice data is the next frontier in AI-driven research.",
    "Transforming spoken language into actionable data empowers scientific discovery.",
    "Effective speech interfaces bridge humans and machines in research innovation.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setFade(true);
      }, 500);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveHeights(
        Array.from({ length: 20 }, () => Math.random() * 60 + 20)
      );
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // ✅ Convert text to speech (Flask)
  const handleTextToSpeech = async () => {
    if (!textInput.trim()) return alert("Enter some text!");
    try {
      const response = await fetch("http://localhost:5000/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textInput }),
      });
      if (!response.ok) throw new Error("TTS request failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setTtsAudioUrl(url);
    } catch (err) {
      console.error(err);
      alert("TTS failed");
    }
  };

  // ✅ Convert speech to text (Flask)
  const handleSpeechToText = async () => {
    if (!audioFile) return alert("Upload an audio file first!");
    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      const response = await fetch("http://localhost:5000/att", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("STT request failed");

      const data = await response.json();
      setResultText(data.text || data.error);
      setSttText(data.text || null);
    } catch (err) {
      console.error(err);
      alert("STT failed");
    }
  };

  // ✅ Manual download for TTS
  const downloadTtsAudio = () => {
    if (!ttsAudioUrl) return;
    const a = document.createElement("a");
    a.href = ttsAudioUrl;
    a.download = "output.mp3";
    a.click();
  };

  // ✅ Manual download for STT
  const downloadSttText = () => {
    if (!sttText) return;
    const blob = new Blob([sttText], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recognized_text.txt";
    a.click();
  };

  const handleLogout = () => alert("Logged out successfully!");

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white bg-opacity-10 backdrop-blur-md p-6 flex flex-col items-center justify-start space-y-8 relative">
        <div className="w-full bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-4 text-white shadow-lg">
          <h3 className="flex items-center mb-2 font-semibold text-lg">
            <LightBulbIcon className="w-5 h-5 mr-2" />
            Quick Tips
          </h3>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Upload MP3/WAV files for STT</li>
            <li>Click Convert first, then Download</li>
            <li>Switch tabs for TTS/STT</li>
            <li>Use clear speech for accurate recognition</li>
          </ul>
        </div>

        {/* Waveform */}
        <div className="w-full flex items-end justify-center space-x-1 mt-8 relative">
          {waveHeights.map((height, i) => (
            <div
              key={i}
              className="w-1 rounded-full transition-all duration-300"
              style={{
                height: `${height}px`,
                background: `linear-gradient(180deg, #00f6ff, #a259ff)`,
              }}
            ></div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 flex flex-col items-center justify-start relative">
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
          Logout
        </button>

        {/* Header */}
        <div className="w-full flex flex-col items-center mb-6 text-center">
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-2">
            Voicesnap
          </h1>
          <p
            className={`text-gray-200 text-lg md:text-xl max-w-xl mb-2 italic transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            "{quotes[quoteIndex]}"
          </p>
          <p className="text-gray-300 text-lg md:text-xl max-w-xl">
            Convert voice to text or text to voice instantly.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-8 space-x-4 justify-center w-full">
          <button
            onClick={() => setActiveTab("tts")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === "tts"
                ? "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white shadow-lg"
                : "bg-white bg-opacity-20 text-white"
            }`}
          >
            Text to Speech
          </button>
          <button
            onClick={() => setActiveTab("stt")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === "stt"
                ? "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white shadow-lg"
                : "bg-white bg-opacity-20 text-white"
            }`}
          >
            Speech to Text
          </button>
        </div>

        {/* Panels */}
        {activeTab === "tts" && (
          <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-md mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center justify-center">
              <SpeakerWaveIcon className="w-6 h-6 mr-2" /> Text to Speech
            </h2>
            <textarea
              className="w-full p-3 rounded-md mb-4"
              rows={4}
              placeholder="Enter text here..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            ></textarea>
            <div className="flex space-x-4">
              <button
                onClick={handleTextToSpeech}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow hover:scale-105 transition"
              >
                Convert
              </button>
              {ttsAudioUrl && (
                <button
                  onClick={downloadTtsAudio}
                  className="flex-1 px-6 py-3 border-2 border-transparent text-white font-semibold rounded-lg shadow 
                             bg-clip-padding bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 
                             hover:bg-gradient-to-r hover:from-cyan-400 hover:via-purple-500 hover:to-pink-500 hover:text-white transition"
                >
                  Download
                </button>
              )}
            </div>
            {ttsAudioUrl && (
              <audio
                controls
                src={ttsAudioUrl}
                className="mt-4 w-full rounded"
              ></audio>
            )}
          </div>
        )}

        {activeTab === "stt" && (
          <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-md mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center justify-center">
              <MicrophoneIcon className="w-6 h-6 mr-2" /> Speech to Text
            </h2>
            <input
              type="file"
              accept="audio/*"
              className="w-full mb-4"
              onChange={(e) => setAudioFile(e.target.files[0])}
            />
            <div className="flex space-x-4">
              <button
                onClick={handleSpeechToText}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow hover:scale-105 transition"
              >
                Convert
              </button>
              {sttText && (
                <button
                  onClick={downloadSttText}
                  className="flex-1 px-6 py-3 border-2 border-transparent text-white font-semibold rounded-lg shadow 
                             bg-clip-padding bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 
                             hover:bg-gradient-to-r hover:from-cyan-400 hover:via-purple-500 hover:to-pink-500 hover:text-white transition"
                >
                  Download
                </button>
              )}
            </div>
            {resultText && (
              <p className="mt-4 p-3 bg-white bg-opacity-30 rounded text-gray-800 text-center">
                {resultText}
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-auto text-gray-400 text-sm text-center mb-4">
          Made with ❤️ by Voicesnap |{" "}
          <a href="#" className="underline">
            GitHub
          </a>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
