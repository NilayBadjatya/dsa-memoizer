import React from "react";
import "../styles/ProblemItem.css";

export default function ProblemItem({ title, url, onDelete }) {
  const getPlatformBadge = (url) => {
    if (url.includes("leetcode.com")) {
      return <span className="badge leetcode">LeetCode</span>;
    } else if (url.includes("geeksforgeeks.org")) {
      return <span className="badge gfg">GFG</span>;
    }
    return null;
  };

  return (
    <li className="problem-item">
      <div className="problem-details">
        {getPlatformBadge(url)}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="problem-link"
          title={title}
        >
          {title}
        </a>
      </div>
      <button
        onClick={() => onDelete(url)}
        className="remove-button"
        title="Remove this problem"
      >
        ✖
      </button>
    </li>
  );
}
