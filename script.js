function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const theme = document.body.classList.contains("dark-mode")
    ? "dark"
    : "light";
  localStorage.setItem("theme", theme);
}

// Sidebar Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
});


// Load saved theme and add event listeners

window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Add click event listeners to grid videos
  document.querySelectorAll(".videos").forEach((video) => {
    video.addEventListener("click", handleVideoClick);
    video.loop = false; // Prevent auto-repeat
    video.controls = true; // Keep controls for user interaction
  });
};

function search() {
  const searchInput = document.getElementById("find");
  const searchTerm = searchInput.value.toLowerCase();
  const videoCards = document.querySelectorAll(".video-card");

  videoCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const creator = card.querySelector("p").textContent.toLowerCase();

    if (title.includes(searchTerm) || creator.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Sample video data (based on your HTML)
const videos = [
  {
    id: 1,
    title: "It's like a Symphony",
    channel: "John Okeke",
    src: "videos/like synphony.mp4",
    poster: "images/symphony.jpg",
    stats: "258k Views • 2 days",
  },
  {
    id: 2,
    title: "Strong Motivation",
    channel: "Godfrey Ifechukwu",
    src: "videos/motivation.mp4",
    poster: "images/motivation.webp",
    stats: "1.3M Views • 3 days",
  },
  {
    id: 3,
    title: "Nebulos News",
    channel: "Pascal Sigauke",
    src: "videos/nebulos news update.mp4",
    poster: "",
    stats: "1.8M Views • 5 hours",
  },
  {
    id: 4,
    title: "(Nigeria is blessed) The crypto system began in Nigeria",
    channel: "Emmanuel Akponah",
    src: "videos/Nigeria crypto system.mp4",
    poster: "",
    stats: "989k Views • 4 days",
  },
  {
    id: 5,
    title: "Now is the time",
    channel: "Pascal Sigauke",
    src: "videos/now is the time.mp4",
    poster: "",
    stats: "586k Views • 2 hours",
  },
  {
    id: 6,
    title: "Grow with Emma",
    channel: "Emmanuel Akponah",
    src: "videos/grow with Emma.mp4",
    poster: "",
    stats: "287k Views • 7 days",
  },
  {
    id: 7,
    title: "Ada Ehi - Congratulations",
    channel: "Albert Sigax",
    src: "videos/Ada song.mp4",
    poster: "",
    stats: "501k Views • 2 days",
  },
  {
    id: 8,
    title: "Cryptocurrency Prophecy",
    channel: "@JP",
    src: "videos/cryptocurrency prophecy.mp4",
    poster: "",
    stats: "3M Views • 2 days",
  },
  {
    id: 9,
    title: "It's like a Symphony",
    channel: "Front-End Bootcamp",
    src: "videos/like synphony.mp4",
    poster: "images/symphony.jpg",
    stats: "",
  },
  {
    id: 10,
    title: "Strong Motivation",
    channel: "Front-End Bootcampt",
    src: "videos/motivation.mp4",
    poster: "images/motivation.webp",
    stats: "",
  },
  {
    id: 11,
    title: "It's like a Symphony",
    channel: "Front-End Bootcamp",
    src: "videos/like synphony.mp4",
    poster: "images/symphony.jpg",
    stats: "",
  },
  {
    id: 12,
    title: "Strong Motivation",
    channel: "Front-End Bootcampt",
    src: "videos/motivation.mp4",
    poster: "images/motivation.webp",
    stats: "",
  },
];

// Pause all videos
function pauseAllVideos() {
  document.querySelectorAll("video").forEach((video) => {
    video.pause();
    video.currentTime = 0; // Reset to start
  });
}

// Handle video click event in grid
function handleVideoClick(e) {
  e.preventDefault(); // Prevent default video playback
  const video = e.target;
  pauseAllVideos(); // Pause all videos
  const videoCard = video.closest(".video-card");
  const videoId = videoCard.getAttribute("data-video-id");
  const videoData = videos.find((v) => v.id == videoId);

  // Update large video player
  const largeVideo = document.querySelector("#large-video");
  const largeVideoSource = document.querySelector("#large-video-source");
  largeVideoSource.src = videoData.src;
  largeVideo.poster = videoData.poster || "";
  largeVideo.loop = false; // Prevent auto-repeat
  largeVideo.load();
  largeVideo.play().catch((error) => {
    console.error("Auto-play failed:", error); // Handle auto-play restrictions
  });
  document.querySelector("#video-title").textContent = videoData.title;
  document.querySelector("#video-channel").textContent = videoData.channel;
  document.querySelector("#video-stats").textContent = videoData.stats || "";

  // Populate related videos (all videos except the selected one)
  const relatedList = document.querySelector("#related-video-list");
  relatedList.innerHTML = "";
  document.querySelectorAll(".video-grid .video-card").forEach((card) => {
    if (card.getAttribute("data-video-id") !== videoId) {
      const clonedCard = card.cloneNode(true);
      const clonedVideo = clonedCard.querySelector(".videos");
      clonedVideo.removeAttribute("controls"); // Disable controls to prevent playback
      clonedVideo.removeAttribute("autoplay");
      clonedVideo.pause();
      clonedVideo.loop = false; // Prevent auto-repeat
      // Remove any click event listeners
      clonedVideo.replaceWith(clonedVideo.cloneNode(true)); // Clone without event listeners
      relatedList.appendChild(clonedCard);
    }
  });

  // Show player section, hide grid and scroll menu
  document.querySelector(".video-player-section").style.display = "flex";
  document.querySelector(".video-grid").classList.add("hidden");
  document.querySelector(".scroll-menu").classList.add("hidden");
}

// Handle clicks on related videos
document.addEventListener("click", (e) => {
  const relatedCard = e.target.closest(".video-card");
  if (relatedCard && relatedCard.parentElement.id === "related-video-list") {
    pauseAllVideos(); // Pause all videos
    const videoId = relatedCard.getAttribute("data-video-id");
    const videoData = videos.find((v) => v.id == videoId);

    // Update large video player
    const largeVideo = document.querySelector("#large-video");
    const largeVideoSource = document.querySelector("#large-video-source");
    largeVideoSource.src = videoData.src;
    largeVideo.poster = videoData.poster || "";
    largeVideo.loop = false; // Prevent auto-repeat
    largeVideo.load();
    largeVideo.play().catch((error) => {
      console.error("Auto-play failed:", error); // Handle auto-play restrictions
    });
    document.querySelector("#video-title").textContent = videoData.title;
    document.querySelector("#video-channel").textContent = videoData.channel;
    document.querySelector("#video-stats").textContent = videoData.stats || "";

    // Update related videos
    const relatedList = document.querySelector("#related-video-list");
    relatedList.innerHTML = "";
    document.querySelectorAll(".video-grid .video-card").forEach((card) => {
      if (card.getAttribute("data-video-id") !== videoId) {
        const clonedCard = card.cloneNode(true);
        const clonedVideo = clonedCard.querySelector(".videos");
        clonedVideo.removeAttribute("controls"); // Disable controls to prevent playback
        clonedVideo.removeAttribute("autoplay");
        clonedVideo.pause();
        clonedVideo.loop = false; // Prevent auto-repeat
        // Remove any click event listeners
        clonedVideo.replaceWith(clonedVideo.cloneNode(true)); // Clone without event listeners
        relatedList.appendChild(clonedCard);
      }
    });
  }
});

// Return to grid view
function showGridView() {
  document.querySelector(".video-player-section").style.display = "none";
  document.querySelector(".video-grid").classList.remove("hidden");
  document.querySelector(".scroll-menu").classList.remove("hidden");
  pauseAllVideos(); // Pause all videos
  search(); // Reapply search filter
}
