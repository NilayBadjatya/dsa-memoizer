import { useEffect, useState } from "react";
import AddProblemButton from "./components/AddProblemButton";
import ProblemItem from "./components/ProblemItem";

function App() {
  const [problems, setProblems] = useState([]);
  const [isValidProblemPage, setIsValidProblemPage] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(["problems"], (result) => {
      setProblems(result.problems || []);
    });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url || "";

      const isLeetCodeProblem =
        url.startsWith("https://leetcode.com/problems/") &&
        !url.includes("/submissions/");

      const isGfgProblem =
        url.startsWith("https://www.geeksforgeeks.org/") &&
        !url.includes("/tag/") &&
        !url.includes("/category/");

      setIsValidProblemPage(isLeetCodeProblem || isGfgProblem);
    });
  }, []);

  const handleDelete = (urlToDelete) => {
    chrome.storage.local.get(["problems"], (res) => {
      const existing = res.problems || [];
      const updated = existing.filter((p) => p.url !== urlToDelete);

      chrome.storage.local.set({ problems: updated }, () => {
        setProblems(updated);
      });
    });
  };

  return (
    <div className="w-[380px] font-sans bg-gradient-to-br from-slate-50 to-blue-50 min-h-[500px] rounded-2xl overflow-hidden shadow-2xl">
      {/* Header with Glassmorphism Effect */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-sm"></div>
        <div className="relative p-6 text-white">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm">
              {/* <span className="text-xl">📘</span> */}
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">DSA Memoizer</h2>
              <p className="text-indigo-100 text-sm font-medium">
                Track your problem-solving journey
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content with Elegant Spacing */}
      <div className="p-6 space-y-6">
        {/* Save Button Section */}
        <div className="space-y-3">
          {isValidProblemPage ? (
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <AddProblemButton onProblemAdded={setProblems} />
            </div>
          ) : (
            <div className="relative bg-gradient-to-r from-amber-50 to-orange-100 border border-amber-200 rounded-2xl p-5 shadow-lg flex items-center gap-4 overflow-hidden animate-fade-in">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-200/70 shadow-md animate-bounce-slow mr-2">
                {/* <span className="text-3xl" role="img" aria-label="alert">⚠️</span> */}
              </div>
              <div>
                <p className="font-extrabold text-lg text-amber-900 tracking-tight font-sans mb-1 drop-shadow-sm">
                  Visit a problem page
                </p>
                <p className="text-amber-700 text-sm font-medium font-sans opacity-90">
                  Navigate to <span className="font-semibold">LeetCode</span> or <span className="font-semibold">GFG</span> to save problems
                </p>
              </div>
              <style>{`
                @keyframes bounce-slow {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-8px); }
                }
                .animate-bounce-slow {
                  animation: bounce-slow 2s infinite;
                }
                @keyframes fade-in {
                  from { opacity: 0; transform: translateY(10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                  animation: fade-in 0.7s ease;
                }
              `}</style>
            </div>
          )}
        </div>

        {/* Problems List Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                <span className="text-white text-sm">📚</span>
              </div>
              Saved Problems
            </h3>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {problems.length}
            </div>
          </div>
          
          {problems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-gray-400 text-2xl">📝</span>
              </div>
              <h4 className="text-gray-600 font-semibold mb-2">No problems saved yet</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Start solving problems to build your collection! 
                <br />
                Your journey begins here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <ul className="list-none p-0 space-y-3">
                {problems.map((prob, index) => (
                  <li 
                    key={index} 
                    className="w-full transform transition-all duration-300 hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProblemItem
                      title={prob.title}
                      url={prob.url}
                      onDelete={handleDelete}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-white/50 backdrop-blur-sm p-4">
        <p className="text-center text-gray-500 text-xs font-medium">
          Made with ❤️ for DSA enthusiasts
        </p>
      </div>
    </div>
  );
}

export default App;
