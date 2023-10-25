let previousEmbedPlayer = null;
let previousURL = window.location.href;

function applySettings(autoplay) {
  let playerToReplace = document.querySelector("div#player");

  if (!playerToReplace && previousEmbedPlayer) {
    playerToReplace = previousEmbedPlayer;
  }

  if (!playerToReplace) {
    return;
  }

  const width = playerToReplace.clientWidth;
  const height = playerToReplace.clientHeight;

  const videoId = window.location.search.match(/v=([^&]+)/);
  if (!videoId) {
    return;
  }
  const videoIdValue = videoId[1];
  
  const autoplayParam = autoplay ? "&autoplay=1" : "";
  const embedUrl = `https://www.youtube.com/embed/${videoIdValue}?rel=0${autoplayParam}`;

  const embedPlayer = document.createElement("iframe");
  embedPlayer.src = embedUrl;
  embedPlayer.width = width;
  embedPlayer.height = height;
  embedPlayer.frameBorder = "0";
  embedPlayer.allowFullscreen = true;

  playerToReplace.replaceWith(embedPlayer);
  previousEmbedPlayer = embedPlayer;
}

setInterval(() => {
  const currentURL = window.location.href;
  if (currentURL !== previousURL && /v=([^&]+)/.test(currentURL)) {
    setTimeout(() => {
      applySettings(true);
    }, 500); 
    previousURL = currentURL;
  }
}, 1000); // Check every second

window.addEventListener("load", function() {
  applySettings(true);
});









