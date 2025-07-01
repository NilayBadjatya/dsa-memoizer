export default {
  manifest_version: 3,
  name: 'DSA Memoizer',
  version: '1.0',
  description: 'Save & track DSA problems from LeetCode and GFG',
  action: {
    default_popup: 'index.html',
    default_icon: 'icon.png',
  },
  permissions: ['storage', 'activeTab', 'scripting'],
  host_permissions: ['https://leetcode.com/*', 'https://www.geeksforgeeks.org/*'],
  background: {
    service_worker: 'background.js',
  },
  content_scripts: [
    {
      matches: ['https://leetcode.com/*', 'https://www.geeksforgeeks.org/*'],
      js: ['content.js'],
    },
  ],
};
