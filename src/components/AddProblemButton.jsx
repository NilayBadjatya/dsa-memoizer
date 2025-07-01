import React from "react";
import "../styles/AddProblemButton.css";

export default function AddProblemButton({ onProblemAdded }) {
  const handleAddProblem = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => {
          const hostname = window.location.hostname;
          let title = document.title;
          const url = window.location.href;

          if (hostname.includes("leetcode.com")) {
            title = document.querySelector("h1")?.innerText || title;
          }

          if (hostname.includes("geeksforgeeks.org")) {
            title = document.querySelector("h1.entry-title")?.innerText || title;
          }

          return { title, url };
        },
      },
      (results) => {
        const data = results?.[0]?.result;
        if (data?.title && data?.url) {
          chrome.storage.local.get(["problems"], (res) => {
            const existing = res.problems || [];
            if (!existing.some((p) => p.url === data.url)) {
              const updated = [...existing, data];
              chrome.storage.local.set({ problems: updated }, () => {
                onProblemAdded(updated); // Update parent
              });
            } else {
              alert("Problem already saved!");
            }
          });
        } else {
          alert("Not a valid problem page.");
        }
      }
    );
  };

  return (
    <button
      onClick={handleAddProblem}
      className="save-problem-btn"
    >
      <div className="btn-content">
        <div className="btn-icon">
          <span>➕</span>
        </div>
        <span className="btn-text">Save Current Problem</span>
      </div>
    </button>
  );
}
