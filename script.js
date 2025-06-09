function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector(".theme-icon");
  if (!themeIcon) {
    console.error("Theme icon not found");
    return;
  }
  body.classList.toggle("dark-mode");
  const isDarkMode = body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  themeIcon.classList.toggle("fa-moon", !isDarkMode);
  themeIcon.classList.toggle("fa-sun", isDarkMode);
}

function toggleSidebar() {
  const sidebar = document.querySelector("#sidebar");
  if (!sidebar) {
    console.error("Sidebar not found");
    return;
  }
  sidebar.classList.toggle("active");
  console.log(
    "Sidebar toggled:",
    sidebar.classList.contains("active") ? "visible" : "collapsed"
  );
}

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

function filterByCategory() {
  const selectedCategory = document
    .querySelector('input[name="category"]:checked')
    .id.replace("cat-", "")
    .toLowerCase();
  const videoCards = document.querySelectorAll(".video-card");

  videoCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    if (selectedCategory === "all" || title.includes(selectedCategory)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

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
    poster: "images/symphony.jpg",
    stats: "1.8M Views • 5 hours",
  },
  {
    id: 4,
    title: "(Nigeria is blessed) The crypto system began in Nigeria",
    channel: "Emmanuel Akponah",
    src: "videos/Nigeria crypto system.mp4",
    poster: "images/symphony.jpg",
    stats: "989k Views • 4 days",
  },
  {
    id: 5,
    title: "Now is the time",
    channel: "Pascal Sigauke",
    src: "videos/now is the time.mp4",
    poster: "images/symphony.jpg",
    stats: "586k Views • 2 hours",
  },
  {
    id: 6,
    title: "Grow with Emma",
    channel: "Emmanuel Akponah",
    src: "videos/grow with Emma.mp4",
    poster: "images/symphony.jpg",
    stats: "287k Views • 7 days",
  },
  {
    id: 7,
    title: "Ada Ehi - Congratulations",
    channel: "Albert Sigax",
    src: "videos/Ada song.mp4",
    poster: "images/symphony.jpg",
    stats: "501k Views • 2 days",
  },
  {
    id: 8,
    title: "Cryptocurrency Prophecy",
    channel: "@JP",
    src: "videos/cryptocurrency prophecy.mp4",
    poster: "images/symphony.jpg",
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
    channel: "Front-End Bootcamp",
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
    channel: "Front-End Bootcamp",
    src: "videos/motivation.mp4",
    poster: "images/motivation.webp",
    stats: "",
  },
];

function pauseAllVideos() {
  document.querySelectorAll("video").forEach((video) => {
    video.pause();
    video.currentTime = 0;
  });
}

function handleVideoClick(e) {
  e.preventDefault();
  const video = e.target;
  pauseAllVideos();
  const videoCard = video.closest(".video-card");
  const videoId = videoCard.getAttribute("data-video-id");
  const videoData = videos.find((v) => v.id == videoId);

  const largeVideo = document.querySelector("#large-video");
  const largeVideoSource = document.querySelector("#large-video-source");
  largeVideoSource.src = videoData.src;
  largeVideo.poster = videoData.poster || "images/symphony.jpg";
  largeVideo.loop = false;
  largeVideo.load();
  largeVideo.play().catch((error) => {
    console.error("Auto-play failed:", error);
  });
  document.querySelector("#video-title").textContent = videoData.title;
  document.querySelector("#video-channel").textContent = videoData.channel;
  document.querySelector("#video-stats").textContent = videoData.stats || "";

  const relatedList = document.querySelector("#related-video-list");
  relatedList.innerHTML = "";
  document.querySelectorAll(".video-grid .video-card").forEach((card) => {
    if (card.getAttribute("data-video-id") !== videoId) {
      const clonedCard = card.cloneNode(true);
      const clonedVideo = clonedCard.querySelector(".videos");
      clonedVideo.removeAttribute("controls");
      clonedVideo.removeAttribute("autoplay");
      clonedVideo.pause();
      clonedVideo.loop = false;
      clonedVideo.addEventListener("click", handleVideoClick);
      relatedList.appendChild(clonedCard);
    }
  });

  document.querySelector(".video-player-section").style.display = "flex";
  document.querySelector(".video-grid").classList.add("hidden");
  document.querySelector(".category-container").classList.add("hidden");

  const sidebar = document.querySelector("#sidebar");
  if (sidebar) {
    sidebar.classList.remove("active");
  }
}

function showGridView() {
  document.querySelector(".video-player-section").style.display = "none";
  document.querySelector(".video-grid").classList.remove("hidden");
  document.querySelector(".category-container").classList.remove("hidden");
  pauseAllVideos();
  search();
}

window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  const themeIcon = document.querySelector(".theme-icon");
  if (!themeIcon) {
    console.error("Theme icon not found during initialization");
  } else {
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      document.body.classList.remove("dark-mode");
      themeIcon.classList.add("fa-moon");
      themeIcon.classList.remove("fa-sun");
    }
  }

  const sidebar = document.querySelector("#sidebar");
  if (sidebar && window.innerWidth <= 768) {
    sidebar.classList.remove("active"); // Ensure sidebar is collapsed on mobile
  }

  document.querySelectorAll(".videos").forEach((video) => {
    video.addEventListener("click", handleVideoClick);
    video.loop = false;
    video.controls = true;
  });

  const menuToggleBtn = document.querySelector("#menuToggle");
  if (menuToggleBtn) {
    menuToggleBtn.addEventListener("click", toggleSidebar);
  } else {
    console.error("Menu toggle button not found");
  }

  const themeToggleBtn = document.querySelector("#themeToggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  } else {
    console.error("Theme toggle button not found");
  }

  document.querySelectorAll('input[name="category"]').forEach((input) => {
    input.addEventListener("change", filterByCategory);
  });
};
