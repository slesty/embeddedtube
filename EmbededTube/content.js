
  const videoId = window.location.search.match(/v=([^&]+)/)[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const embedPlayer = document.createElement("iframe");
  embedPlayer.src = embedUrl;
  embedPlayer.width = "1250";
  embedPlayer.height = "725";
  embedPlayer.frameBorder = "0";
  embedPlayer.allowFullscreen = true;

  const existingPlayer = document.querySelector("div#player");
  if (existingPlayer) {
    existingPlayer.replaceWith(embedPlayer);
  }