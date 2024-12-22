import React, { useState,useEffect } from 'react';
import InputForm from './InputForm';
import Result from './Result';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [result, setResult] = useState(null);


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-8 font-roboto">
      
  <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
    
    {/* Dark Mode Toggle Button */}
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="absolute mt-[45px] p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle dark mode"
    >
      <i
        className={`fas ${darkMode ? "fa-sun" : "fa-moon"} text-gray-800 dark:text-gray-200`}
      ></i>
    </button>

    {/* Heading */}
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8 sm:mb-12 tracking-tight leading-tight">
      Personal Health & Nutrition Calculator
    </h1>
      <InputForm setResult={setResult} />
      {result && <Result result={result} />}
    </div>
    <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
