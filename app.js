const API_KEY = "719ebf6b9cmsh47e22e9c9ff678ap177be1jsna051965c605e";
              const API_HOST = "youtube-mp3-download1.p.rapidapi.com";
              

const form = document.querySelector('form');
const output = document.getElementById('output');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const urlInput = document.getElementById('video-url');
  const videoId = extractVideoId(urlInput.value);
  if (!videoId) {
    output.innerHTML = 'Invalid YouTube video URL.';
    return;
  }
  
  const options = {
    hostname: API_HOST,
    path: `/dl?id=${videoId}`,
    method: 'GET',
    headers: {
      'X-Rapidapi-Key': API_KEY,
      'X-Rapidapi-Host': API_HOST,
      'Host': API_HOST
    }
  };

  output.innerHTML = 'Converting video...';

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.link) {
        const link = document.createElement('a');
        link.href = response.link;
        link.download = 'download.mp3';
        document.body.appendChild(link);
        link.click();
        output.innerHTML = 'Download started.';
      } else {
        output.innerHTML = 'Failed to convert video.';
      }
    } else if (xhr.readyState === 4) {
      output.innerHTML = 'Failed to convert video.';
    }
  };
  xhr.open(options.method, `https://${API_HOST}${options.path}`);
  xhr.setRequestHeader('X-Rapidapi-Key', API_KEY);
  xhr.setRequestHeader('X-Rapidapi-Host', API_HOST);
  xhr.setRequestHeader('Host', API_HOST);
  xhr.send();
});

function extractVideoId(url) {
  const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regex);
  return match ? match[2] : null;
}
