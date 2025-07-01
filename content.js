// content.js

(function () {
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;

  let title = document.title;
  let url = window.location.href;

  // Custom parsing if needed
  if (hostname.includes('leetcode.com')) {
    title = document.querySelector('h1')?.innerText || title;
  }

  if (hostname.includes('geeksforgeeks.org')) {
    title = document.querySelector('h1.entry-title')?.innerText || title;
  }

  // Expose data globally
  window.__DSA_PROBLEM__ = { title, url };

  // Only inject on LeetCode or GFG problem pages
  const isLeetCodeProblem =
    hostname.includes('leetcode.com') && pathname.startsWith('/problems/') && !pathname.includes('/submissions/');
  const isGfgProblem =
    hostname.includes('geeksforgeeks.org') && !pathname.includes('/tag/') && !pathname.includes('/category/');

  if (!(isLeetCodeProblem || isGfgProblem)) return;

  // Inject CSS
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = chrome.runtime.getURL('src/styles/InjectedWidget.css');
  document.head.appendChild(style);

  // Inject container
  const container = document.createElement('div');
  container.id = 'dsa-injected-widget-root';
  document.body.appendChild(container);

  // Inject React widget
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('src/injectReactWidget.js');
  script.type = 'module';
  document.body.appendChild(script);
})();
