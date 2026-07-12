function extractVideoId(input) {
  if (!input) return null;
  var m = input.match(/^([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  m = input.match(/(youtube\.com\/embed\/|youtu\.be\/|\/v\/|v=)([a-zA-Z0-9_-]{11})/);
  return m ? m[2] : null;
}

function embedYouTubeVideo(container) {
  if (container.dataset.initialized === "true") return;
  var videoId = extractVideoId(container.dataset.videoId) || "7XmZUcGAlCU";
  var iframe = document.createElement("iframe");
  iframe.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1&enablejsapi=0";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.setAttribute("webkit-playsinline", "");
  iframe.setAttribute("playsinline", "");
  iframe.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;border:none;border-radius:inherit;";
  container.innerHTML = "";
  container.style.backgroundImage = "none";
  container.appendChild(iframe);
  container.dataset.initialized = "true";
}

function initVideoPlayers() {
  var containers = document.querySelectorAll(".video-container:not([data-initialized])");
  containers.forEach(function (container) {
    var videoId = extractVideoId(container.dataset.videoId) || "7XmZUcGAlCU";
    var posterUrl = "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg";
    container.style.backgroundImage = "url(" + posterUrl + ")";
    container.style.backgroundSize = "cover";
    container.style.backgroundPosition = "center";
    container.style.backgroundRepeat = "no-repeat";
  });
}

document.addEventListener("click", function (e) {
  var btn = e.target.closest(".play-button");
  if (!btn) return;
  var container = btn.closest(".video-container");
  if (!container) return;
  embedYouTubeVideo(container);
});

if (document.readyState !== "loading") {
  initVideoPlayers();
} else {
  document.addEventListener("DOMContentLoaded", initVideoPlayers);
}
