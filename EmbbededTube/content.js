// Function to apply settings to the embedded player
function applySettings(autoplay) {
  // Get the dimensions of the original player
  const existingPlayer = document.querySelector("div#player");
  if (!existingPlayer) {
    return;
  }

  const width = existingPlayer.clientWidth;
  const height = existingPlayer.clientHeight;

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

  existingPlayer.replaceWith(embedPlayer);
}

function stopEmbeddedVideo() {
  const embedPlayer = document.querySelector("iframe");
  if (embedPlayer) {
    const embedPlayerWindow = embedPlayer.contentWindow;
    embedPlayerWindow.video.pause();
  }
}

window.addEventListener("load", function() {
  applySettings(true);
});

document.addEventListener("click", function(event) {
  const youtubeLogo = event.target.closest("#ytd-logo, #yt-icon, #yt-icon-button");
  if (youtubeLogo) {
    console.log("YouTube logo clicked");
    stopEmbeddedVideo();
  }
});

