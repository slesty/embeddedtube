let previousEmbedPlayer = null;
let previousURL = window.location.href;

function applySettings(autoplay) {
  let playerToReplace = document.querySelector("div#player");

  if (!playerToReplace && !previousEmbedPlayer) {
    playerToReplace = document.createElement('div');
    playerToReplace.id = 'player';
    document.body.appendChild(playerToReplace);
  } else if (previousEmbedPlayer) {
    playerToReplace = previousEmbedPlayer;
  }

  const width = playerToReplace.clientWidth || "640";
  const height = playerToReplace.clientHeight || "360";

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
  if (currentURL !== previousURL) {
    const videoIdMatch = currentURL.match(/v=([^&]+)/);
    const previousVideoIdMatch = previousURL.match(/v=([^&]+)/);

    if (videoIdMatch && !previousVideoIdMatch) {
      setTimeout(() => {
        applySettings(true);
      }, 200);
    } 
    else if (videoIdMatch && previousVideoIdMatch) {
      setTimeout(() => {
        applySettings(true);
      }, 500); 
    }
    previousURL = currentURL;
  }
}, 1000);

window.addEventListener("load", function() {
  applySettings(true);
});











