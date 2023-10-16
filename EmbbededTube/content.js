function applySettings(autoplay) {
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

function initObserver() {
  const observer = new MutationObserver(() => {
    applySettings(true);
  });

  observer.observe(document.querySelector('title'), { childList: true });
}

window.addEventListener("load", function() {
  applySettings(true);
  initObserver();
});





