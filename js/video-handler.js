// ==========================================
// YOUTUBE VIDEO HANDLER - FIXED PLAYBACK
// ==========================================

let youtubeAPIReady = false;
const youtubePlayers = new Map();

// YouTube API Callback
function onYouTubeIframeAPIReady() {
  youtubeAPIReady = true;
  initializeYouTubePlayers();
}

// Initialize all YouTube players on page
function initYouTubeVideos() {
  // Load YouTube API if not already loaded
  if (!window.YT) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  } else if (window.YT && window.YT.Player) {
    onYouTubeIframeAPIReady();
  }
}

function initializeYouTubePlayers() {
  // Find all video containers
  const videoContainers = document.querySelectorAll(".video-container");

  videoContainers.forEach((container, index) => {
    // Skip if already initialized
    if (container.dataset.initialized === "true") return;

    // Get video ID from data attribute or find iframe
    let videoId = container.dataset.videoId;
    let iframe = container.querySelector("iframe");

    if (iframe && !videoId) {
      // Extract video ID from iframe src
      const src = iframe.src;
      const match = src.match(
        /(?:youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]+)/,
      );
      if (match) {
        videoId = match[1];
      }
    }

    if (!videoId) {
      // Default video ID for our story
      videoId = "7XmZUcGAlCU?si=G6QVuBZ6H2iMRcgX"; // Replace with your actual video ID
    }

    // Remove existing iframe
    if (iframe) {
      iframe.remove();
    }

    // Create player div
    const playerDiv = document.createElement("div");
    playerDiv.id = `youtube-player-${index}`;
    container.appendChild(playerDiv);

    // Initialize YouTube Player
    try {
      const player = new YT.Player(playerDiv.id, {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          showinfo: 0,
          iv_load_policy: 3,
          fs: 1,
          cc_load_policy: 0,
          theme: "light",
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: onPlayerError,
        },
      });

      youtubePlayers.set(playerDiv.id, player);
      container.dataset.initialized = "true";
    } catch (error) {
      console.error("Failed to initialize YouTube player:", error);
      // Fallback to iframe
      createFallbackIframe(container, videoId);
    }
  });
}

function onPlayerReady(event) {
  console.log("YouTube player ready:", event.target.getVideoData().title);

  // Add custom controls if needed
  const player = event.target;
  const container = player.getIframe().closest(".video-container");

  if (container) {
    // Add loading indicator
    const loadingIndicator = document.createElement("div");
    loadingIndicator.className = "video-loading";
    loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    container.appendChild(loadingIndicator);

    // Remove loading indicator when video is ready
    setTimeout(() => {
      loadingIndicator.style.opacity = "0";
      setTimeout(() => loadingIndicator.remove(), 300);
    }, 500);
  }
}

function onPlayerStateChange(event) {
  const states = {
    "-1": "unstarted",
    0: "ended",
    1: "playing",
    2: "paused",
    3: "buffering",
    5: "video cued",
  };

  console.log("Player state changed:", states[event.data]);

  // Add custom behavior based on state
  if (event.data === YT.PlayerState.PLAYING) {
    // Video started playing
    event.target.getIframe().style.opacity = "1";
  }
}

function onPlayerError(event) {
  console.error("YouTube player error:", event.data);

  // Try to reload with a different video or show error message
  const player = event.target;
  const container = player.getIframe().closest(".video-container");

  if (container) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "video-error";
    errorDiv.innerHTML = `
      <i class="fas fa-exclamation-triangle"></i>
      <p>Unable to load video</p>
      <button onclick="retryVideo('${player.getVideoData().video_id}')">
        <i class="fas fa-redo"></i> Retry
      </button>
    `;
    container.appendChild(errorDiv);
  }
}

function createFallbackIframe(container, videoId) {
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.loading = "lazy";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.borderRadius = "12px";

  container.innerHTML = "";
  container.appendChild(iframe);
  container.dataset.initialized = "true";
}

function retryVideo(videoId) {
  // Find and remove error message
  const errorDiv = document.querySelector(".video-error");
  if (errorDiv) {
    errorDiv.remove();
  }

  // Reinitialize players
  initializeYouTubePlayers();
}

// Pause all videos when page is not visible
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    youtubePlayers.forEach((player) => {
      if (player && player.pauseVideo) {
        player.pauseVideo();
      }
    });
  }
});

// Make functions available globally
window.initYouTubeVideos = initYouTubeVideos;
window.retryVideo = retryVideo;

// Auto-initialize if DOM is already loaded
if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  setTimeout(initYouTubeVideos, 1000);
}
