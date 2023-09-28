document.getElementById('convert').addEventListener('click', function() {
    chrome.tabs.executeScript({
      file: 'content.js'
    });
  });

